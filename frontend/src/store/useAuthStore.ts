import axios from "axios";
import toast from "react-hot-toast";
import { io } from "socket.io-client";
import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import type { AuthState, User } from "../lib/types";

const BASE_URL = "http://localhost:5000";

const useAuthStore = create<AuthState>((set, get) => ({
	authUser: null,
	isSigningUp: false,
	isLoggingIn: false,
	isUpdatingProfile: false,
	isCheckingAuth: true,
	onlineUsers: [],
	socket: null,

	checkAuth: async () => {
		try {
			const res = await axiosInstance.get<User>("/auth/check");
			set({ authUser: res.data });
			get().connectSocket();
		} catch (error: unknown) {
			if (error instanceof Error) console.log(error.message);
			set({ authUser: null });
		} finally {
			set({ isCheckingAuth: false });
		}
	},

	signUp: async (data) => {
		set({ isSigningUp: true });

		try {
			const res = await axiosInstance.post("/auth/signup", data);
			set({ authUser: res.data });
			toast.success("Account created successfully");
			get().connectSocket();
		} catch (error) {
			if (axios.isAxiosError(error))
				toast.error(error.response?.data?.message || "Signup failed");
			else toast.error("Something went wrong");
		} finally {
			set({ isSigningUp: false });
		}
	},

	logout: async () => {
		try {
			await axiosInstance.post("/auth/logout");
			set({ authUser: null });
			toast.success("Logged out successfully");
		} catch (error) {
			if (axios.isAxiosError(error))
				toast.error(error.response?.data?.message || "Signout failed");
		}
	},

	login: async (data) => {
		set({ isLoggingIn: true });
		try {
			const res = await axiosInstance.post("/auth/login", data);
			set({ authUser: res.data });
			toast.success("Logged in successfully");
			get().connectSocket();
		} catch (error) {
			if (axios.isAxiosError(error))
				toast.error(error.response?.data?.message || "Login failed");
			else toast.error("Something went wrong");
		} finally {
			set({ isLoggingIn: false });
		}
	},

	updateProfile: async (data) => {
		set({ isUpdatingProfile: true });
		try {
			const res = await axiosInstance.patch("/auth/update-profile", data);
			set({ authUser: res.data });
			toast.success("Profile updated successfully");
		} catch (error) {
			if (axios.isAxiosError(error))
				toast.error(
					error.response?.data?.message || "Couldn't upload an image",
				);
			else toast.error("Something went wrong");
		} finally {
			set({ isUpdatingProfile: false });
		}
	},

	connectSocket: () => {
		const { authUser } = get();
		if (!authUser || get().socket?.connected) return;

		const socket = io(BASE_URL);
		socket.connect();
	},

	disconnectSocket: () => {},
}));

export { useAuthStore };
