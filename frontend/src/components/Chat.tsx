import { useEffect } from "react";
import { formatMessageTime } from "../lib/utils";
import { useAuthStore } from "../store/useAuthStore";
import { useChatStore } from "../store/useChatStore";
import ChatHeader from "./UI/ChatHeader";
import MessageInput from "./UI/MessageInput";
import MessageSkeleton from "./UI/MessageSkeleton";

export default function Chat() {
	const { selectedUser, getMessages, isMessagesLoading, messages } =
		useChatStore();
	const { authUser } = useAuthStore();

	useEffect(() => {
		if (!selectedUser) return;

		getMessages(selectedUser._id);
	}, [getMessages, selectedUser]);

	return isMessagesLoading ? (
		<div className="flex flex-col flex-1 overflow-auto">
			<ChatHeader />
			<MessageSkeleton />
			<MessageInput />
		</div>
	) : (
		<div className="flex flex-col flex-1 overflow-auto">
			<ChatHeader />
			<div className="flex-1 space-y-4 p-4 overflow-auto">
				{messages.map((message) => {
					const isMyMessage =
						message.senderId === authUser?._id
							? authUser?.profilePic
							: selectedUser?.profilePic;

					return (
						<div
							key={message._id}
							className={`chat ${message.senderId === authUser?._id ? "chat-end" : "chat-start"}`}
						>
							<div className="avatar chat-image">
								<div className="border rounded-full size-10">
									<img
										src={isMyMessage || "/avatar.png"}
										alt={isMyMessage}
										className="chat-image"
									/>
								</div>
							</div>
							<div className="mb-1 chat-header">
								<time className="opacity-50 ml-1 text-xs">
									{formatMessageTime(message.createdAt)}
								</time>
							</div>
							<div className="flex flex-col chat-bubble">
								{message.image && (
									<img
										src={message.image}
										alt={message.image}
										className="mb-2 rounded-md sm:max-w-50"
									/>
								)}
								{message.text && <p>{message.text}</p>}
							</div>
						</div>
					);
				})}
			</div>
			<MessageInput />
		</div>
	);
}
