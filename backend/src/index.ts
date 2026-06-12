import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import { connectDB } from "./lib/db.js";
import { app, server } from "./lib/socket.js";
import authRoutes from "./routes/auth.route.js";
import messageRoutes from "./routes/message.route.js";

dotenv.config();

// Middleware

app.use(express.json({ limit: "5mb" }));
app.use(express.urlencoded({ limit: "5mb", extended: true }));
app.use(cookieParser());
app.use(cors({ origin: "http://localhost:5173", credentials: true }));

// Routes

app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);

// Server

const { PORT } = process.env;

server.listen(PORT, () => {
	connectDB();
	console.log(`Server is started at http://localhost:${PORT}`);
});
