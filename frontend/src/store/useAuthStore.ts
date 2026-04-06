import axios from "axios";
import toast from "react-hot-toast";
import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import type { AuthState, User } from "../lib/types";

const useAuthStore = create<AuthState>((set) => ({
	authUser: null,
	isSigningUp: false,
	isLoggingIn: false,
	isUpdatingProfile: false,
	isCheckingAuth: true,

	checkAuth: async () => {
		try {
			const res = await axiosInstance.get<User>("/auth/check");
			set({ authUser: res.data });
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
		} catch (error) {
			if (axios.isAxiosError(error))
				toast.error(error.response?.data?.message || "Signup failed");
			else toast.error("Something went wrong");
		} finally {
			set({ isSigningUp: false });
		}
	},
}));

export { useAuthStore };
