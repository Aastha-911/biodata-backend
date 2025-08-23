import express from "express";
import cors from "cors";
import path from "path";
import "dotenv/config";
import connectDB from "./config/db.js";
import userRoutes from "./routes/auth.routes.js";
import bioDataRoutes from "./routes/biodataDetails.routes.js";
import templateRoutes from "./routes/template.routes.js";
import contactRoutes from "./routes/contact.routes.js";
import orderRoutes from "./routes/order.route.js";
import { cloudinary } from "./utils/cloudinary.js";
import { fileURLToPath } from "url";
import { dirname } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();

// Connect to DB
connectDB();
cloudinary;

// ✅ Use cors package
const allowedOrigins = [
    "https://www.marriagebiodataonline.com",
    "https://marriagebiodataonline.com",
    "https://admin.marriagebiodataonline.com",
    "http://localhost:5173",
    "http://localhost:5174",
    "http://localhost:3000",
    "http://127.0.0.1:3000"
];

app.use(
    cors({
        origin: function (origin, callback) {
            if (!origin || allowedOrigins.includes(origin)) {
                callback(null, true);
            } else {
                callback(new Error("Not allowed by CORS"));
            }
        },
        credentials: true, // ✅ if you need cookies/auth headers
        methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    })
);

// Middleware
app.use(express.json({ limit: "50mb" }));

// Static files
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Routes
app.get("/", (req, res) => res.send("API is working"));
app.use("/api/users", userRoutes);
app.use("/api/biodata", bioDataRoutes);
app.use("/api/templates", templateRoutes);
app.use("/api/contact", contactRoutes);
app.use("/api/order", orderRoutes);

// Server start
const PORT = process.env.PORT || 6000;
app.listen(PORT, () => console.log("🚀 Server started on PORT " + PORT));
