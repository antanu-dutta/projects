import User from "../models/user.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";

// function for creating new user
export const createUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // 1. Validate fields
    if (!name || !email || !password) {
      return res
        .status(400)
        .json({ success: false, message: "All fields are required" });
    }

    // 2. Check if user already exists
    const isAlreadyUser = await User.findOne({ email });
    if (isAlreadyUser) {
      return res
        .status(409) // 409 = Conflict (resource already exists)
        .json({ success: false, message: "User already exists" });
    }

    // 3. Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // 4. Create user
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    // 5. Send success response
    return res.status(201).json({
      success: true,
      message: "User created successfully",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    console.error("Error while creating user:", error);

    // 6. Send error response
    return res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};

// function for logging in a user
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // 1. Validate required fields
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Email and Password are required",
      });
    }

    // 2. Find user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    // 3. Compare the provided password with hashed password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: "Invalid credentials",
      });
    }

    // 4. Create JWT token
    const token = jwt.sign(
      { id: user._id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    // 5. Set HTTP-Only cookie for security
    res.cookie("token", token);

    // 6. Send success response
    return res.status(200).json({
      success: true,
      message: "Login successful",
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
      },
      token,
    });
  } catch (error) {
    console.error("Login Error:", error);

    // 7. Server error response
    return res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};

// function for fetching a user by ID
export const getUser = async (req, res) => {
  try {
    const { id } = req.user;

    // 1. Validate ID
    if (!id) {
      return res.status(400).json({
        success: false,
        message: "User ID is required",
      });
    }

    // 2. Check ObjectId format before querying DB
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid user ID format",
      });
    }

    // 3. Fetch user & exclude password
    const user = await User.findById(id).select("-password");

    // 4. If no user found
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    // 5. Success response
    return res.status(200).json({
      success: true,
      message: "User fetched successfully",
      user,
    });
  } catch (error) {
    console.error("Get User Error:", error);

    // 6. Return server error
    return res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};

// function for updating a user
export const updateUser = async (req, res) => {
  try {
    const { id } = req.params;

    // Only logged-in user can update his/her account
    if (!req.user || req.user.id !== id) {
      return res.status(403).json({
        success: false,
        message: "Forbidden: You cannot update this user",
      });
    }

    const { name, email, password } = req.body;

    // Prevent updating with empty body
    if (!name && !email && !password) {
      return res.status(400).json({
        success: false,
        message: "No valid fields to update",
      });
    }

    // Build update object
    const updateData = {};
    if (name) updateData.name = name;
    if (email) updateData.email = email;

    if (password) {
      // Hash password only if exists
      const saltRounds = 10;
      updateData.password = await bcrypt.hash(password, saltRounds);
    }

    // Update user in DB
    const updatedUser = await User.findByIdAndUpdate(id, updateData, {
      new: true,
      runValidators: true, // ensures email format, etc.
    }).select("-password");

    if (!updatedUser) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "User updated successfully",
      user: updatedUser,
    });
  } catch (error) {
    console.error("Update User Error:", error);

    if (error?.kind === "ObjectId") {
      return res.status(400).json({
        success: false,
        message: "Invalid user ID format",
      });
    }

    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

// function for deleting user
export const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;

    // Ensure user is logged in and can delete only themselves
    if (!req.user || req.user.id !== id) {
      return res.status(403).json({
        success: false,
        message: "Forbidden: You cannot delete this user",
      });
    }

    // Delete user
    const deletedUser = await User.findByIdAndDelete(id);

    if (!deletedUser) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    // Clear auth cookie after delete
    res.clearCookie("token", {
      httpOnly: true,
      secure: true,
      sameSite: "none",
    });

    return res.status(200).json({
      success: true,
      message: "User account deleted successfully. Logged out.",
    });
  } catch (error) {
    console.error("Delete User Error:", error);

    if (error?.kind === "ObjectId") {
      return res.status(400).json({
        success: false,
        message: "Invalid user ID format",
      });
    }

    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

// function for getting me
// Function to get the currently logged-in user
export const getMe = async (req, res) => {
  try {
    // req.user is set by your authentication middleware after JWT verification
    const userId = req.user?.id;

    if (!userId) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized: No user found",
      });
    }

    // Fetch user data without password
    const user = await User.findById(userId).select("-password");
    console.log(user);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    // Successful response
    return res.status(200).json({
      success: true,
      message: "User fetched successfully",
      user,
    });
  } catch (error) {
    console.error("GetMe Error:", error);

    // Invalid MongoDB ID
    if (error.kind === "ObjectId") {
      return res.status(400).json({
        success: false,
        message: "Invalid user ID format",
      });
    }

    // Server error
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};
