import dotenv from "dotenv";
import express from "express";
import { connectDB } from "./lib/db.js";
import authRoutes from "./routes/auth.route.js";

const app = express();

dotenv.config();

const { PORT } = process.env;

app.use(express.json());

app.use("/api/auth", authRoutes);

app.listen(PORT, () => {
	connectDB();
	console.log(`Server is started at http://localhost:${PORT}`);
});
