import bcrypt from "bcryptjs";
import { generateToken } from "../lib/utils.js";
import User from "../models/user.model.js";

const signup = async (req, res) => {
	const { email, fullName, password, profilePic } = req.body;

	try {
		if (!email || !fullName)
			res.status(400).json({ message: "All fields must be filled" });

		if (password.length < 6)
			return res
				.status(400)
				.json({ message: "Password must be at least 6 characters" });
		const user = await User.findOne({ email });

		if (user)
			return res
				.status(400)
				.json({ message: "User with this email already exists" });

		const salt = await bcrypt.genSalt(10);
		const hashedPassword = await bcrypt.hash(password, salt);
		console.log(hashedPassword);

		const newUser = new User({
			fullName,
			email,
			password: hashedPassword,
			profilePic,
		});

		if (newUser) {
			generateToken(newUser._id, res);
			await newUser.save();
			res.status(201).json({
				_id: newUser._id,
				fullName: newUser.fullName,
				email: newUser.email,
				profilePic: newUser.profilePic,
			});
		} else {
			res.status(400).json("Invalid user data");
		}
	} catch (error) {
		console.log(`Error in signup controller: ${error.message}`);
		res.status(500).json({ message: "Internal server error" });
	}
};

const login = (req, res) => {
	res.end("Login route");
};

const logout = (req, res) => {
	res.end("Logout route");
};

export { login, logout, signup };
