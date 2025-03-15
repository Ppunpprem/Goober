import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import authRoutes from "./routes/authRoutes.js"; // Use import here
import binRoutes from "./routes/binRoutes.js"; // Use import here
import commentRoutes from "./routes/commentRoutes.js"; // Use import here
import badgeRoutes from "./routes/badgeRoutes.js";


import cors from "cors";
import path from "path";
import multer from "multer";
import { fileURLToPath } from "url";

dotenv.config();

const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.json());
app.use(cors());


app.use("/public", express.static(path.join(__dirname, "public")));

app.use("/api/auth", authRoutes);
app.use("/api/bin", binRoutes);
app.use("/api/comment", commentRoutes);
app.use("/api/badge", badgeRoutes);

// MongoDB Connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log("Error:  ", err));

app.use(cors({ origin: "http://localhost:5173", credentials: true }));

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
