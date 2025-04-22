import express from "express";
import cors from "cors";
import path from "path";
import "dotenv/config";
import connectDB from "./config/db.js";
import userRoutes from "./routes/auth.routes.js";
import bioDataRoutes from "./routes/biodataDetails.routes.js";
import templateRoutes from "./routes/template.routes.js";
import contactRoutes from "./routes/contact.routes.js";

import { fileURLToPath } from "url";
import { dirname } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();

// Connect to DB
connectDB();

// Enable CORS globally
app.use(cors({
    origin: ["http://localhost:5173", "https://wwww.marriagebiodataonline.com"],
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    credentials: true
}));

// Add headers for static file requests
app.use("/uploads", (req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*"); // or replace with specific origin
    res.setHeader("Access-Control-Allow-Methods", "GET, OPTIONS");
    next();
}, express.static(path.join(__dirname, "uploads")));

// Middleware
app.use(express.json({ limit: "50mb" }));

// Routes
app.get("/", (req, res) => res.send("API is working"));
app.use("/api/users", userRoutes);
app.use("/api/biodata", bioDataRoutes);
app.use("/api/templates", templateRoutes);
app.use("/api/contact", contactRoutes);

// Server start
const PORT = process.env.PORT || 6000;
app.listen(PORT, () => console.log("Server is started on PORT " + PORT));
