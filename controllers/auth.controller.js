import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

const createToken = (role, email) => {
  return jwt.sign({ role, email }, process.env.JWT_SECRET, { expiresIn: "1h" });
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (
      email === process.env.ADMIN_EMAIL &&
      password === process.env.ADMIN_PASSWORD
    ) {
      const token = createToken("admin", email);
      return res.json({ success: true, token, role: "admin" });
    }
    return res.json({ success: false, message: "Invalid admin credentials" });
  } catch (error) {
    console.error(error);
    res.json({ success: false, message: error.message });
  }
};

export { loginUser };
