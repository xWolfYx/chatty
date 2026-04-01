import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import express from "express";
import { connectDB } from "./lib/db.js";
import authRoutes from "./routes/auth.route.js";
import messageRoutes from "./routes/message.route.js";

const app = express();

dotenv.config();

// Middleware

app.use(express.json());
app.use(cookieParser());

// Routes

app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);

// Server

const { PORT } = process.env;

app.listen(PORT, () => {
	connectDB();
	console.log(`Server is started at http://localhost:${PORT}`);
});
