import axios from "axios";
import { Image, Send, X } from "lucide-react";
import { useRef, useState } from "react";
import toast from "react-hot-toast";
import { useChatStore } from "../../store/useChatStore";

export default function MessageInput() {
	const [text, setText] = useState("");
	const [imagePreview, setImagePreview] = useState<string | null>(null);
	const fileInputRef = useRef<HTMLInputElement | null>(null);
	const { sendMessage } = useChatStore();

	async function handleImageChange(e: React.ChangeEvent<HTMLInputElement>) {
		const file = e.target.files?.[0];
		if (!file?.type.startsWith("image/")) {
			toast.error("Please select an image file");
			return;
		}

		const reader = new FileReader();

		reader.readAsDataURL(file);
		reader.onload = async () => {
			const base64Image = reader.result;

			if (typeof base64Image !== "string") return;
			setImagePreview(base64Image);
		};
	}

	const removeImage = () => {
		setImagePreview(null);
		if (fileInputRef.current) fileInputRef.current.value = "";
	};

	const handleSendMessage = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		if (!text.trim() && !imagePreview) return;

		try {
			await sendMessage({
				text: text.trim(),
				image: imagePreview,
			});

			// Clear form
			setText("");
			removeImage();
		} catch (error) {
			if (axios.isAxiosError(error)) toast.error(error.response?.data?.message);
			else toast.error("Couldn't send a message");
		}
	};

	return (
		<div className="p-4 w-full">
			{imagePreview && (
				<div className="flex items-center gap-2 mb-3">
					<div className="relative">
						<img
							src={imagePreview}
							alt="Preview"
							className="border border-zinc-700 rounded-lg size-20 object-cover"
						/>
						<button
							type="button"
							onClick={removeImage}
							className="-top-1.5 -right-1.5 absolute flex justify-center items-center bg-base-300 rounded-full size-5"
						>
							<X />
						</button>
					</div>
				</div>
			)}
			<form onSubmit={handleSendMessage} className="flex items-center gap-2">
				<div className="flex flex-1 gap-2">
					<input
						type="text"
						className="rounded-lg w-full input input-sm sm:input-md"
						placeholder="Type a message..."
						value={text}
						onChange={(e) => setText(e.target.value)}
					/>
					<input
						type="file"
						accept="image/*"
						className="hidden"
						ref={fileInputRef}
						onChange={handleImageChange}
					/>
					<button
						type="button"
						onClick={() => fileInputRef.current?.click()}
						className={`hidden sm:flex btn btn-circle ${imagePreview ? "text-emerald-500" : "text-zinc-400"}`}
					>
						<Image size={20} />
					</button>
				</div>
				<button
					type="submit"
					className="h-10 min-h-0 btn btn-primary"
					disabled={!text.trim() && !imagePreview}
				>
					<Send size={22} />
				</button>
			</form>
		</div>
	);
}
