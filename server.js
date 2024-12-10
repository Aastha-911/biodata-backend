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
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
connectDB();
app.use(express.json({ linit: "50mb" }));
app.use(cors());
app.get("/", (req, res) => res.send("Api is working"));
app.use("/api/users", userRoutes);
app.use("/api/biodata", bioDataRoutes);
app.use("/api/templates", templateRoutes);
app.use("/api/contact", contactRoutes);

const PORT = process.env.PORT || 6000;
app.listen(PORT, () => console.log("Server is started on PORT " + PORT));
