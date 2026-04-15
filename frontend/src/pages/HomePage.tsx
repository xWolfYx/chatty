import Chat from "../components/Chat";
import NoChatSelected from "../components/NoChatSelected";
import Sidebar from "../components/Sidebar";
import { useChatStore } from "../store/useChatStore";

export default function HomePage() {
	const { selectedUser } = useChatStore();

	return (
		<div className="bg-base-200 h-screen">
			<div className="flex justify-center items-center px-4 pt-20">
				<div className="bg-base-100 shadow-xl rounded-lg w-full max-w-6xl h-[calc(100vh-8rem)]">
					<div className="flex rounded-lg h-full overflow-hidden">
						<Sidebar />
						{!selectedUser ? <NoChatSelected /> : <Chat />}
					</div>
				</div>
			</div>
		</div>
	);
}
