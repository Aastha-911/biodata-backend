import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

const authenticateAdmin = (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
      return res
        .status(401)
        .json({ success: false, message: "Access denied. No token provided." });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (decoded.role !== "admin") {
      return res
        .status(403)
        .json({ success: false, message: "Access denied. Admin only." });
    }

    req.admin = decoded;
    next();
  } catch (error) {
    console.error(error);
    res
      .status(401)
      .json({ success: false, message: "Invalid or expired token." });
  }
};

export { authenticateAdmin };
