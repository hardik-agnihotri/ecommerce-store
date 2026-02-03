import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import authRoutes from "./routes/authRoutes.js";
import adminProductRoutes from "./routes/productRoutes.js";
dotenv.config();


const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/v1/",authRoutes);
app.use("/api/admin", adminProductRoutes);

export default app;