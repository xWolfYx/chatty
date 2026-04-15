import { Camera, Mail, User } from "lucide-react";
import { useState } from "react";
import { useAuthStore } from "../store/useAuthStore";
import clsx from "clsx";

export default function ProfilePage() {
	const { authUser, isUpdatingProfile, updateProfile } = useAuthStore();
	const [selectedImg, setSelectedImg] = useState<string | null>(null);

	async function handleImageUpload(e: React.ChangeEvent<HTMLInputElement>) {
		const file = e.target.files?.[0];
		if (!file) return;

		const reader = new FileReader();

		reader.readAsDataURL(file);
		reader.onload = async () => {
			const base64Image = reader.result;

			if (typeof base64Image !== "string") return;

			await updateProfile({ profilePic: base64Image });
			setSelectedImg(base64Image);
		};
	}

	return (
		<div className="pt-20 h-screen">
			<div className="mx-auto px-4 py-8 max-w-2xl">
				<div className="space-y-8 bg-base-300 p-6 rounded-xl">
					<div className="text-center">
						<h1 className="font-semibold text-2xl">Profile</h1>
						<p className="mt-2">Your profile information</p>
					</div>

					{/* Avatar upload section */}

					<div className="flex flex-col items-center gap-4">
						<div className="relative">
							<img
								src={selectedImg || authUser?.profilePic || "/avatar.png"}
								alt="Profile"
								className="border-4 rounded-full size-32 object-cover"
							/>
							<label
								htmlFor="avatar-upload"
								className={clsx(
									"right-0 bottom-0 absolute bg-base-content p-2 rounded-full hover:scale-105 transition-all duration-200 cursor-pointer",
									{ "animate-pulse pointer-events-none": isUpdatingProfile },
								)}
							>
								<Camera className="size-5 text-base-200" />
								<input
									type="file"
									id="avatar-upload"
									className="hidden"
									accept="image/*"
									onChange={handleImageUpload}
									disabled={isUpdatingProfile}
								/>
							</label>
						</div>
						<p className="text-zinc-400 text-sm">
							{isUpdatingProfile
								? "Uploading..."
								: "Click the camera icon to update your photo"}
						</p>
					</div>

					{/* User info */}

					<div className="space-y-6">
						<div className="space-y-1.5">
							<div className="flex items-center gap-2 text-zinc-400 text-sm capitalize">
								<User className="size-4" />
								Full name
							</div>
							<p className="bg-base-200 px-4 py-2.5 border border-zinc-400 rounded-lg">
								{authUser?.fullName}
							</p>
						</div>

						<div className="space-y-1.5">
							<div className="flex items-center gap-2 text-zinc-400 text-sm capitalize">
								<Mail className="size-4" />
								Email address
							</div>
							<p className="bg-base-200 px-4 py-2.5 border border-zinc-400 rounded-lg">
								{authUser?.email}
							</p>
						</div>

						<div className="bg-base-300 mt-6 p-6 rounded-xl">
							<h2 className="mb-4 font-medium text-lg capitalize">
								Account information
							</h2>
							<div className="space-y-3 text-sm">
								<div className="flex justify-between items-center py-2 border-zinc-700 border-b">
									<span className="capitalize">Member since</span>
									<span>{authUser?.createdAt?.split("T")[0]}</span>
								</div>
								<div className="flex justify-between items-center py-2">
									<span className="capitalize">Account status</span>
									<span className="text-green-500">Active</span>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
