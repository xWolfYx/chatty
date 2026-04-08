import { create } from "zustand";
import type { Theme, ThemeState } from "../lib/types";

const theme: Theme = "light";

export const useThemeStore = create<ThemeState>((set) => ({
	 localStorage.setItem("chatty-theme", theme),
	setTheme: (theme) => {
		localStorage.setItem("chatty-theme", theme);
		set(theme);
	},
}));
