import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

const createToken = (role, email) => {
  return jwt.sign({ role, email }, process.env.JWT_SECRET, { expiresIn: "1h" });
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log(req.body);
    if (
      email === process.env.ADMIN_EMAIL &&
      password === process.env.ADMIN_PASSWORD
    ) {
      const token = createToken("admin", email);
      return res.json({
        success: true,
        token,
        role: "admin",
        name: process.env.ADMIN_Name,
        message: "Logged in successfully.",
      });
    }
    return res.json({ success: false, message: "Invalid admin credentials" });
  } catch (error) {
    console.error(error);
    res.json({ success: false, message: error.message });
  }
};

const authenticated = async (req, res) => {
  try {
    const userId = req.user;
    if (!userId) {
      return res.status(200).json({ message: "Invalid User", success: false });
    }
    return res.status(200).json({ message: "user verified ", success: true });
  } catch (error) {
    res.status(500).json({ error: error.message, success: false });
  }
};

export { loginUser, authenticated };
