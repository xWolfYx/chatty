import mongoose from "mongoose";

export const connectDB = async () => {
	try {
		if (!process.env.MONGO_URI) {
			console.error(
				"CRITICAL ERROR: MONGO_URI is not defined in environment variables.",
			);
			process.exit(1);
		}

		const conn = await mongoose.connect(process.env.MONGO_URI);
		console.log(`MongoDB connected successfully ${conn.connection.host}`);
	} catch (error) {
		console.log(`MongoDB connection error: ${error.message}`);
		process.exit(1);
	}
};
