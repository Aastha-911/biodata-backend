import Contact from "../models/contact.model.js";

const createContact = async (req, res) => {
  try {
    const { name, email, mobile, message } = req.body;

    if (!name || !email || !mobile || !message) {
      return res
        .status(400)
        .json({ success: false, message: "All fields are required" });
    }

    const newContact = new Contact({ name, email, mobile, message });
    await newContact.save();

    res.status(201).json({
      success: true,
      message: "Thank you for your message. We will get back to you soon.",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: error.message });
  }
};

const getAllContacts = async (req, res) => {
  try {
    const contacts = await Contact.find().sort({ createdAt: -1 });
    res.status(200).json({ success: true, contacts, message: "All messages fetched successfully." });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: error.message });
  }
};

export { createContact, getAllContacts };
