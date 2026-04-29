import axios from "axios";
import toast from "react-hot-toast";
import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import type { ChatState } from "../lib/types";
import { useAuthStore } from "./useAuthStore";

export const useChatStore = create<ChatState>((set, get) => ({
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
			set({ messages: res.data.messages });
		} catch (error) {
			if (axios.isAxiosError(error))
				toast.error(error.response?.data?.message || "Failed loading Messages");
			else toast.error("Something went wrong");
		} finally {
			set({ isMessagesLoading: false });
		}
	},

	sendMessage: async (data) => {
		const { selectedUser, messages } = get();

		try {
			const res = await axiosInstance.post(
				`/messages/send/${selectedUser?._id}`,
				data,
			);

			set((state) => ({ messages: [...state.messages, res.data] }));
		} catch (error) {
			if (axios.isAxiosError(error))
				toast.error(
					error.response?.data?.message || "Failed to send a message",
				);
			else {
				console.log(error);
				toast.error("Something went wrong");
			}
		}
	},

	subscribeToMessages: () => {
		const { selectedUser } = get();
		if (!selectedUser) return;
		const { socket } = useAuthStore.getState();

		socket.on("newMessage", (newMessage) => {
			if (newMessage.senderId !== selectedUser._id) return;
			set({ messages: [...get().messages, newMessage] });
		});
	},

	unsubscribeFromMessages: () => {
		const { socket } = useAuthStore.getState();
		socket.off("newMessage");
	},

	setSelectedUser: async (selectedUser) => set({ selectedUser }),
}));
