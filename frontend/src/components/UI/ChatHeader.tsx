import { X } from "lucide-react";
import { useAuthStore } from "../../store/useAuthStore";
import { useChatStore } from "../../store/useChatStore";

export default function ChatHeader() {
	const { selectedUser, setSelectedUser } = useChatStore();
	const { onlineUsers } = useAuthStore();

	return (
		<div className="p-2.5 border-base-300 border-b">
			<div className="flex justify-between items-center">
				<div className="flex items-center gap-3">
					{/* Avatar */}
					<div className="avatar">
						<div className="relative rounded-full size-10">
							<img
								src={selectedUser?.profilePic || "/avatar.png"}
								alt={selectedUser?.fullName}
							/>
						</div>
					</div>

					{/* User Info */}
					<div>
						<h3 className="font-medium">{selectedUser?.fullName}</h3>
						{selectedUser && (
							<p className="text-sm text-base-content-70">
								{onlineUsers?.includes(selectedUser) ? "Online" : "Offline"}
							</p>
						)}
					</div>
				</div>
				<button
					type="button"
					className="cursor-pointer"
					onClick={() => setSelectedUser(null)}
				>
					<X />
				</button>
			</div>
		</div>
	);
}
