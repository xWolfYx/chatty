import clsx from "clsx";
import { Users } from "lucide-react";
import { useEffect } from "react";
import { useAuthStore } from "../store/useAuthStore";
import { useChatStore } from "../store/useChatStore";
import SidebarSkeleton from "./UI/SidebarSkeleton";

export default function Sidebar() {
	const { onlineUsers } = useAuthStore();
	const { getUsers, users, selectedUser, setSelectedUser, isUsersLoading } =
		useChatStore();

	useEffect(() => {
		getUsers();
	}, [getUsers]);

	if (isUsersLoading) return <SidebarSkeleton />;

	return (
		<aside className="flex flex-col border-base-300 border-r w-20 lg:w-72 h-full transition-all duration-200">
			<div className="p-5 border-base-300 border-b w-full">
				<div className="flex items-center gap-2">
					<Users size={24} />
					<span className="hidden lg:block font-medium">Contacts</span>
				</div>

				{/* TODO: Online Filter Toggle */}
			</div>
			<div className="py-3 w-full overflow-y-auto">
				{users?.map((u) => (
					<button
						type="button"
						key={u._id}
						onClick={() => setSelectedUser(u)}
						className={clsx(
							"flex items-center gap-3 hover:bg-base-300 p-3 w-full transition-colors",
							{
								"bg-base-300 ring-1 ring-base-300": selectedUser?._id === u._id,
							},
						)}
					>
						<div className="relative mx-auto lg:mx-0">
							<img
								src={u.profilePic || "/avatar.png"}
								alt={u.fullName}
								className="rounded-full size-12 object-cover"
							/>
							{onlineUsers.includes(u._id) && (
								<span className="right-0 bottom-0 absolute bg-green-500 rounded-full ring-2 ring-zinc-900 size-3"></span>
							)}
						</div>

						{/* User Info (only visible on larger screens) */}
						<div className="hidden lg:block min-w-0 text-left">
							<div className="font-medium truncate">{u.fullName}</div>
							<div className="text-zinc-400 text-sm">
								{onlineUsers.includes(u._id) ? "Online" : "Offline"}
							</div>
						</div>
					</button>
				))}
			</div>
		</aside>
	);
}
