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
						className={`group flex flex-col items-center
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
					</button>
				))}
			</div>
		</div>
	);
}
