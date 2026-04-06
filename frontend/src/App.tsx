import { Loader2 } from "lucide-react";
import { useEffect } from "react";
import { Toaster } from "react-hot-toast";
import { Navigate, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import ProfilePage from "./pages/ProfilePage";
import SettingsPage from "./pages/SettingsPage";
import SignupPage from "./pages/SignupPage";
import { useAuthStore } from "./store/useAuthStore";

export default function App() {
	const { authUser, checkAuth, isCheckingAuth } = useAuthStore();

	useEffect(() => {
		checkAuth();
	}, [checkAuth]);

	if (isCheckingAuth && !authUser)
		return (
			<div className="flex justify-center items-center h-screen">
				<Loader2 className="size-10 animate-spin" />
			</div>
		);

	return (
		<div>
			<Navbar />
			<Routes>
				<Route
					path="/"
					element={authUser ? <HomePage /> : <Navigate to={"/login"} />}
				/>
				<Route
					path="/signup"
					element={!authUser ? <SignupPage /> : <Navigate to={"/"} />}
				/>
				<Route
					path="/login"
					element={!authUser ? <LoginPage /> : <Navigate to={"/"} />}
				/>
				<Route
					path="/profile"
					element={authUser ? <ProfilePage /> : <Navigate to={"/login"} />}
				/>
				<Route path="/settings" element={<SettingsPage />} />
			</Routes>
			<Toaster position="bottom-right" reverseOrder={true} />
		</div>
	);
}
