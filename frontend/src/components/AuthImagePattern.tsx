import clsx from "clsx";

export default function AuthImagePattern({
	title,
	subtitle,
}: {
	title: string;
	subtitle: string;
}) {
	return (
		<div className="hidden lg:flex justify-center items-center bg-base-200 p-12">
			<div className="max-w-md text-center">
				<div className="gap-3 grid grid-cols-3 mb-8">
					{Array.from({ length: 9 }).map((_, i) => (
						<div
							key={i}
							className={clsx("bg-primary/10 rounded-2xl aspect-square", {
								"animate-pulse": i % 2 === 0,
							})}
						/>
					))}
				</div>
				<h2 className="mb-4 font-bold text-2xl">{title}</h2>
				<p className="text-base-content/60">{subtitle}</p>
			</div>
		</div>
	);
}
