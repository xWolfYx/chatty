export type User = {
	_id: string;
	email: string;
	fullName: string;
	password: string;
	profilePic: string;
	createdAt: string;
	updatedAt: string;
};

export type AuthState = {
	authUser: User | null;
	isSigningUp: boolean;
	isLoggingIn: boolean;
	isUpdatingProfile: boolean;
	isCheckingAuth: boolean;
	checkAuth: () => Promise<void>;
	signUp: (data: SignUpData) => Promise<void>;
	logout: () => Promise<void>;
	login: (data: LoginData) => Promise<void>;
	updateProfile: (data: { profilePic: string }) => Promise<void>;
};

export type Theme =
	| "light"
	| "dark"
	| "cupcake"
	| "bumblebee"
	| "emerald"
	| "corporate"
	| "synthwave"
	| "retro"
	| "cyberpunk"
	| "valentine"
	| "halloween"
	| "garden"
	| "forest"
	| "aqua"
	| "lofi"
	| "pastel"
	| "fantasy"
	| "wireframe"
	| "black"
	| "luxury"
	| "dracula"
	| "cmyk"
	| "autumn"
	| "business"
	| "acid"
	| "lemonade"
	| "night"
	| "coffee"
	| "winter"
	| "dim"
	| "nord"
	| "sunset"
	| "caramellatte"
	| "abyss"
	| "silk";

export type ThemeState = {
	theme: Theme;
	setTheme: (theme: Theme) => void;
};

type SignUpData = {
	fullName: string;
	email: string;
	password: string;
};

type LoginData = {
	email: string;
	password: string;
};
