import { Image, X } from "lucide-react";
import { useRef, useState } from "react";
import { useChatStore } from "../../store/useChatStore";

export default function MessageInput() {
	const [text, setText] = useState("");
	const [imagePreview, setImagePreview] = useState(null);
	const fileInputRef = useRef(null);
	const { sendMessage } = useChatStore();

	// const handleImageChange = (e) => {};
	// const removeImage = (e) => {};
	// const handleSendMessage = async(e) => {};

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
							type="button" /* onClick={removeImage} */
							className="-top-1.5 -right-1.5 absolute flex justify-center items-center bg-base-300 rounded-full size-5"
						>
							<X />
						</button>
					</div>
				</div>
			)}
			<form /* onSubmit={handleSendMessage} */
				className="flex items-center gap-2"
			>
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
						// onChange={handleImageChange}
					/>
					<button
						type="button"
						onClick={() => fileInputRef.current?.click()}
						className={`hidden sm:flex btn btn-circle ${imagePreview ? "text-emerald-500" : "text-zinc-400"}`}
					>
						<Image size={20} />
					</button>
				</div>
			</form>
		</div>
	);
}
