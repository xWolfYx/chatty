import { Users } from "lucide-react";

export default function SidebarSkeleton() {
	const skeletonContacts = Array.from({ length: 8 }).fill(null);

	return (
		<aside className="flex flex-col border-base-300 border-r w-20 lg:w-72 h-full transition-all duration-200">
			{/* Header */}
			<div className="p-5 border-base-300 border-b w-full">
				<div className="flex items-center gap-2">
					<Users size={24} />
					<span className="hidden lg:block font-medium">Contacts</span>
				</div>

				{/* Skeleton Contacts */}
				<div className="py-3 w-full overflow-y-auto">
					{skeletonContacts.map((_, i) => (
						<div key={i} className="flex items-center gap-3 p-3 w-full">
							{/* Avatar Skeleton */}
							<div className="relative mx-auto lg:mx-0">
								<div className="rounded-full size-12 skeleton" />
							</div>
							{/* User Info Skeleton (only visible on larger screens) */}
							<div className="hidden lg:block flex-1 min-w-0 text-left">
								<div className="mb-2 w-32 h-4 skeleton" />
								<div className="w-16 h-3 skeleton" />
							</div>
						</div>
					))}
				</div>
			</div>
		</aside>
	);
}
