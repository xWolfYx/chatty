import { useEffect } from "react";
import { useChatStore } from "../store/useChatStore";
import ChatHeader from "./UI/ChatHeader";
import MessageInput from "./UI/MessageInput";
import MessageSkeleton from "./UI/MessageSkeleton";

export default function Chat() {
	const { selectedUser, getMessages, isMessagesLoading, messages } =
		useChatStore();

	useEffect(() => {
		if (!selectedUser) return;

		getMessages(selectedUser._id);
	}, [getMessages, selectedUser]);

 	if (isMessagesLoading)
		return (
			<div className="flex flex-col flex-1 overflow-auto">
				<ChatHeader />
				<MessageSkeleton />
				<MessageInput />
			</div>
		);

	return (
		<div className="flex flex-col flex-1 overflow-auto">
			<ChatHeader />
			<p>messages...{/* {messages} */}</p>
			<MessageInput />
		</div>
	);
}
