import { Eye, EyeOff, Loader2, Lock, Mail, MessageSquare } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import AuthImagePattern from "../components/AuthImagePattern";
import { useAuthStore } from "../store/useAuthStore";

export default function LoginPage() {
	const [showPassword, setShowPassword] = useState(false);
	const [formData, setFormData] = useState({
		email: "",
		password: "",
	});

	const { isLoggingIn, login } = useAuthStore();

	const handleSubmit = (e: React.SubmitEvent) => {
		e.preventDefault();

		login(formData);
	};

	return (
		<div className="grid lg:grid-cols-2 min-h-screen">
			<div className="flex flex-col justify-center items-center p-6 sm:p-12">
				<div className="space-y-8 w-full max-w-md">
					<div className="mb-8 text-center">
						<div className="group flex flex-col items-center gap-2">
							<div className="flex justify-center items-center bg-primary/10 group-hover:bg-primary/20 rounded-xl size-12 transition-colors">
								<MessageSquare className="size-6 text-primary" />
							</div>
							<h1 className="mt-2 font-bold text-2xl">Create Account</h1>
							<p className="text-base-content/60">
								Get started with your free account
							</p>
						</div>
					</div>
					<form onSubmit={handleSubmit} className="space-y-6">
						<div className="form-control">
							<label htmlFor="email" className="label">
								<span className="font-medium label-text">Email</span>
							</label>
							<div className="relative">
								<div className="left-0 absolute inset-y-0 flex items-center pl-3 pointer-events-none">
									<Mail className="z-10 size-5 text-base-content/40" />
								</div>
								<input
									type="text"
									id="email"
									className="pl-10 w-full input input-bordered"
									placeholder="John Doe"
									value={formData.email}
									onChange={(e) =>
										setFormData({ ...formData, email: e.target.value })
									}
								/>
							</div>
						</div>
						<div className="form-control">
							<label htmlFor="" className="label">
								<span className="">Password</span>
							</label>
							<div className="relative">
								<div className="left-0 absolute inset-y-0 flex items-center pl-3 pointer-events-none">
									<Lock className="z-10 size-5 text-base-content/40" />
								</div>
								<input
									type={showPassword ? "text" : "password"}
									className="pl-10 w-full input input-bordered"
									placeholder="••••••••"
									value={formData.password}
									onChange={(e) =>
										setFormData({ ...formData, password: e.target.value })
									}
								/>
								<button
									type="button"
									className="right-0 absolute inset-y-0 flex items-center pr-3 cursor-pointer"
									onClick={() => setShowPassword(!showPassword)}
								>
									{showPassword ? (
										<EyeOff className="size-5 text-base-content/40" />
									) : (
										<Eye className="size-5 text-base-content/40" />
									)}
								</button>
							</div>
						</div>
						<button
							type="submit"
							className="w-full btn btn-primary"
							disabled={isLoggingIn}
						>
							{isLoggingIn ? (
								<Loader2 className="size-5 animate-spin" />
							) : (
								"Sign in"
							)}
						</button>
					</form>
					<div className="text-center">
						<p>
							Don't have an account?{" "}
							<Link to="/signup" className="link link-primary">
								Create account
							</Link>
						</p>
					</div>
				</div>
			</div>
			<AuthImagePattern
				title="Join our community"
				subtitle="Connect with friends, share moments and stay in touch with your loved ones."
			/>
		</div>
	);
}
