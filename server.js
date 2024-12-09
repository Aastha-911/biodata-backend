import express from "express";
import cors from "cors";
import "dotenv/config";
import connectDB from "./config/db.js";
import userRoutes from "./routes/auth.routes.js";
import bioDataRoutes from "./routes/biodataDetails.routes.js"; 
import templateRoutes from "./routes/template.routes.js";
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
const app = express();
connectDB();
app.use(express.json({linit:"50mb"}));
app.use(cors());
app.get("/", (req, res)=> res.send("Api is working"));
app.use("/api/users", userRoutes);
app.use("/api/biodata", bioDataRoutes);
app.use("/api/templates", templateRoutes);

const PORT = process.env.PORT || 6000;
app.listen(PORT, () => console.log("Server is started on PORT "+ PORT));