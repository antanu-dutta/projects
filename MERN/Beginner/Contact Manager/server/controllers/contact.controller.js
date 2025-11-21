import Contact from "../models/contact.model.js";

// create new contact
export const createContact = async (req, res) => {
  try {
    const { name, contactNumber, email } = req.body;
    const user = req.user;

    if (!name || !contactNumber)
      return res.json({ success: false, message: "All fields are required" });

    const isAlreadyContact = await Contact.findOne({ contactNumber });
    if (isAlreadyContact)
      return res.json({ success: false, message: "Contact already exists" });

    const contact = await Contact.create({
      name,
      email: email ? email : null,
      userId: user.id,
      contactNumber,
    });
    if (contact)
      return res.json({
        success: true,
        message: "New contact created successfully",
      });
  } catch (error) {
    console.error("error while creating an contact", error);
  }
};

// get all contact
export const getAllContact = async (req, res) => {
  try {
    const user = req.user;
    const contacts = await Contact.find({ userId: user.id }).select("-userId");

    return res.json({
      success: true,
      contacts,
    });
  } catch (error) {
    console.error("error while getting all contact", error);
  }
};

// get contact by id
export const getContactById = async (req, res) => {
  try {
    const user = req.user;
    const { id } = req.params;

    const contact = await Contact.findOne({ userId: user.id, _id: id }).select(
      "-userId"
    );

    return res.json({
      success: true,
      contact,
    });
  } catch (error) {
    console.error("error while getting one contact", error);
  }
};

// update contact
export const updateContact = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email, contactNumber } = req.body;
    let updated = {};
    if (name) updated.name = name;
    if (contactNumber) updated.contactNumber = contactNumber;
    if (email) updated.email = email;

    const updatedContact = await Contact.findByIdAndUpdate(id, updated, {
      new: true,
    }).select("-userId");

    if (!updatedContact) {
      return res.status(404).json({
        success: false,
        message: "Contact not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Contact updated successfully",
      contact: updatedContact,
    });
  } catch (error) {
    console.error("error while updating a contact", error);
  }
};

// delete contact
export const deleteContact = async (req, res) => {
  try {
    const contactId = req.params.id; // Contact ID from URL
    const userId = req.user.id; // Logged-in user ID

    // Check if the contact exists and belongs to the user
    const contact = await Contact.findOne({ _id: contactId, userId });

    if (!contact) {
      return res.status(404).json({
        success: false,
        message: "Contact not found or unauthorized",
      });
    }

    // Delete the contact
    await Contact.findByIdAndDelete(contactId);

    return res.status(200).json({
      success: true,
      message: "Contact deleted successfully",
    });
  } catch (error) {
    console.error("Error while deleting contact:", error);

    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};
