import type { Socket } from "socket.io-client";

export type User = {
	_id: string;
	email: string;
	fullName: string;
	password: string;
	profilePic: string;
	createdAt: string;
	updatedAt: string;
};

type Message = {
	_id?: string;
	senderId?: string;
	receiverId?: string;
	text: string;
	image: string | null;
};

export type AuthState = {
	authUser: User | null;
	isSigningUp: boolean;
	isLoggingIn: boolean;
	isUpdatingProfile: boolean;
	isCheckingAuth: boolean;
	onlineUsers: User[] | null;
	socket: Socket | null;
	connectSocket: () => void;
	disconnectSocket: () => void;
	checkAuth: () => Promise<void>;
	signUp: (data: SignUpData) => Promise<void>;
	logout: () => Promise<void>;
	login: (data: LoginData) => Promise<void>;
	updateProfile: (data: { profilePic: string }) => Promise<void>;
};

// !TODO: Create Message Type

export type ChatState = {
	messages: Message[];
	users: User[];
	selectedUser: User | null;
	isUsersLoading: boolean;
	isMessagesLoading: boolean;
	getUsers: () => Promise<void>;
	getMessages: (userId: string) => Promise<void>;
	sendMessage: (data: Message) => Promise<void>;
	setSelectedUser: (selectedUser: User | null) => Promise<void>;
};

export const themes = [
	"light",
	"dark",
	"cupcake",
	"bumblebee",
	"emerald",
	"corporate",
	"synthwave",
	"retro",
	"cyberpunk",
	"valentine",
	"halloween",
	"garden",
	"forest",
	"aqua",
	"lofi",
	"pastel",
	"fantasy",
	"wireframe",
	"black",
	"luxury",
	"dracula",
	"cmyk",
	"autumn",
	"business",
	"acid",
	"lemonade",
	"night",
	"coffee",
	"winter",
	"dim",
	"nord",
	"sunset",
	"caramellatte",
	"abyss",
	"silk",
] as const;

export type Theme = (typeof themes)[number];

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
