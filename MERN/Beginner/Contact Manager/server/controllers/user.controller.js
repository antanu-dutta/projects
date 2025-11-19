import User from "../models/user.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

// function for creating new user
export const createUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password)
      return res.json({ success: false, message: "All fields are required" });

    const isAlreadyUser = await User.findOne({ email });
    if (isAlreadyUser)
      return res.json({ success: false, message: "User already exists" });

    const hasedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({ name, email, password: hasedPassword });
    if (user)
      return res.json({ success: true, message: "User created successfully" });
  } catch (error) {
    console.error("error while creating an user", error);
  }
};

// function for logging user
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // 1. Check required fields
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Email and Password are required",
      });
    }

    // 2. Find user
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    // 3. Compare password
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

    // 5. Set cookie
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });

    // 6. Send response
    return res.status(200).json({
      success: true,
      message: "Login successful",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
      token,
    });
  } catch (error) {
    console.error("Login Error:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

// funtion for fetching user
export const getUser = async (req, res) => {
  try {
    const { id } = req.params;

    // Check if ID exists
    if (!id) {
      return res.status(400).json({
        success: false,
        message: "User ID is required",
      });
    }

    // Fetch user
    const user = await User.findById(id).select("-password");

    // If not found
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    // Success response
    return res.status(200).json({
      success: true,
      user,
    });
  } catch (error) {
    console.error("Get User Error:", error);

    // Handle invalid MongoDB ID format
    if (error.kind === "ObjectId") {
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

// function for updating user
export const updateUser = async (req, res) => {
  try {
    const { id } = req.params;

    // Only the logged-in user can update themselves
    if (req.user.id !== id) {
      return res.status(403).json({
        success: false,
        message: "Forbidden: You cannot update this user",
      });
    }

    const { name, email, password } = req.body;

    // Build update object
    const updateData = {};
    if (name) updateData.name = name;
    if (email) updateData.email = email;
    if (password) updateData.password = await bcrypt.hash(password, 10);

    const updatedUser = await User.findByIdAndUpdate(id, updateData, {
      new: true,
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

    if (error.kind === "ObjectId") {
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

    // Only logged-in user can delete themselves
    if (req.user.id !== id) {
      return res.status(403).json({
        success: false,
        message: "Forbidden: You cannot delete this user",
      });
    }

    const deletedUser = await User.findByIdAndDelete(id);

    if (!deletedUser) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    // Clear auth cookie on delete
    res.clearCookie("token");

    return res.status(200).json({
      success: true,
      message: "User deleted and logged out successfully",
    });
  } catch (error) {
    console.error("Delete User Error:", error);

    if (error.kind === "ObjectId") {
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
