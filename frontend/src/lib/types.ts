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
};

type SignUpData = {
	fullName: string;
	email: string;
	password: string;
};
