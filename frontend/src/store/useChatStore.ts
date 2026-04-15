import axios from "axios";
import toast from "react-hot-toast";
import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import type { ChatState } from "../lib/types";

export const useChatStore = create<ChatState>((set) => ({
	messages: [],
	users: [],
	selectedUser: null,
	isUsersLoading: false,
	isMessagesLoading: false,

	getUsers: async () => {
		set({ isUsersLoading: true });
		try {
			const res = await axiosInstance.get("/messages/users");
			set({ users: res.data });
		} catch (error) {
			if (axios.isAxiosError(error))
				toast.error(error.response?.data?.message || "Failed loading users");
			else toast.error("Something went wrong");
		} finally {
			set({ isUsersLoading: false });
		}
	},

	getMessages: async (userId) => {
		set({ isMessagesLoading: true });
		try {
			const res = await axiosInstance.get(`/messages/${userId}`);
			set({ messages: res.data });
		} catch (error) {
			if (axios.isAxiosError(error))
				toast.error(error.response?.data?.message || "Failed loading Messages");
			else toast.error("Something went wrong");
		} finally {
			set({ isMessagesLoading: false });
		}
	},

	// !TODO: Optimize this one later
	setSelectedUser: async (selectedUser) => set({ selectedUser }),
}));
