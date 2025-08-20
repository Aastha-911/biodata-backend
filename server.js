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
import { cloudinary } from "./utils/cloudinary.js"
import { fileURLToPath } from "url";
import { dirname } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();

// Connect to DB
connectDB();
cloudinary;

// Allowed origins
const allowedOrigins = [
    "http://localhost:5173",
    "http://localhost:3000",
    "https://www.marriagebiodataonline.com",
    "https://marriagebiodataonline.com",
    "https://admin.marriagebiodataonline.com",
    "http://192.168.0.102:3000"
];

app.use(cors({
    origin: (origin, callback) => {
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error("CORS not allowed for this origin: " + origin));
        }
    },
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    credentials: true
}));

// Explicit OPTIONS handling (important for some browsers)
app.options("*", cors());

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
app.listen(PORT, () => console.log("Server is started on PORT " + PORT));
