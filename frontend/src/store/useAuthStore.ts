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

	signUp: async (data) => {},
}));

export { useAuthStore };
