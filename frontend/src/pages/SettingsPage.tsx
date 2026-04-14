import { Send } from "lucide-react";
import { DAISY_THEMES } from "../assets/constants/daisyuiThemes";
import { useThemeStore } from "../store/useThemeStore";

const PREVIEW_MESSAGES = [
	{ id: 1, content: "Hey! How's it going?", isSent: false },
	{
		id: 2,
		content: "I'm doing great! Just working on some new features.",
		isSent: true,
	},
];

export default function SettingsPage() {
	const { theme, setTheme } = useThemeStore();

	return (
		<div className="mx-auto px-4 pt-20 max-w-5xl h-screen container">
			<div className="space-y-6">
				<h2 className="font-semibold text-lg">Theme</h2>
				<p className="text-sm text-base-content/70">
					Choose a theme for your chat interface
				</p>
			</div>
			<div className="gap-2 grid grid-cols-4 sm:grid-cols-6 lg:grid-cols-7">
				{DAISY_THEMES.map((t) => (
					<button
						type="button"
						key={t}
						className={`group flex flex-col items-center cursor-pointer
							gap-1.5 p-2 rounded-lg transition-colors
							${theme === t ? "bg-base-200" : "hover:bg-base-200/50"}`}
						onClick={() => setTheme(t)}
					>
						<div
							className="relative rounded-md w-full h-8 overflow-hidden"
							data-theme={t}
						>
							<div className="absolute inset-0 gap-px grid grid-cols-4 p-1">
								<div className="bg-primary rounded" />
								<div className="bg-secondary rounded" />
								<div className="bg-accent rounded" />
								<div className="bg-neutral rounded" />
							</div>
						</div>
						<span className="w-full font-medium text-[11px] text-center truncate">
							{t.charAt(0).toUpperCase() + t.slice(1)}
						</span>
					</button>
				))}
			</div>
			<h3 className="mb-3 font-semibold text-lg">Preview</h3>
			<div className="bg-base-100 shadow-lg border border-base-300 rounded-xl overflow-hidden">
				<div className="bg-base-200 p-4">
					<div className="mx-auto max-w-lg">
						{/* Mock Chat UI */}
						<div className="bg-base-100 px-4 py-3 border-base-300 border-b">
							<div className="flex items-center gap-3">
								<div className="flex justify-center items-center bg-primary rounded-full size-8 font-medium text-primary-content">
									J
								</div>
								<div>
									<h3 className="font-medium text-sm">John Doe</h3>
									<p className="text-xs text-base-content/70">Online</p>
								</div>
							</div>
						</div>
						{/* Chat Messages */}

						<div className="space-y-4 bg-base-100 p-4 min-h-50 max-h-50 overflow-y-auto">
							{PREVIEW_MESSAGES.map((m) => (
								<div
									key={m.id}
									className={`flex ${m.isSent ? "justify-end" : "justify-start"}`}
								>
									<div
										className={`max-w-[80%] rounded-xl p-3 shadow-sm ${m.isSent ? "bg-primary text-primary-content" : "bg-base-200"}`}
									>
										<p className="text-sm">{m.content}</p>
										<p
											className={`text-[10px] mt-1.5 ${m.isSent ? "text-primary-content/70" : "text-base-content-70"}`}
										>
											12:00 PM
										</p>
									</div>
								</div>
							))}
						</div>

						{/* Chat Input */}
						<div className="bg-base-100 p-4 border-base-300 border-t">
							<div className="flex gap-2">
								<input
									type="text"
									className="flex-1 h-10 text-sm input"
									placeholder="Type a message..."
									value="This is a preview"
									readOnly
								/>
								<button type="button" className="h-10 min-h-0 btn btn-primary">
									<Send size={18} />
								</button>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
