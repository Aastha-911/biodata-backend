import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

const authenticateToken = (req, res, next) => {
  try {
    const token = req.headers.authorization;
    if (!token) {
      return res
        .status(401)
        .json({ success: false, message: "Token is required" });
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err) {
        return res
          .status(403)
          .json({ success: false, message: "You are not authenticated." });
      }

      req.user = decoded;
      if (req.user.role !== "admin") {
        return res
          .status(403)
          .json({ success: false, message: "Access denied!! Only admin" });
      }
      next();
    });
  } catch (error) {
    console.error("Authentication error:", error.message);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

export { authenticateToken };
