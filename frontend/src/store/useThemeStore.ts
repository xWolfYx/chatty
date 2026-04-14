import { create } from "zustand";
import { type Theme, type ThemeState, themes } from "../lib/types";

const isTheme = (value: string): value is Theme =>
	(themes as readonly string[]).includes(value as Theme);

const storedTheme = localStorage.getItem("chatty-theme");

const initialTheme: Theme =
	storedTheme && isTheme(storedTheme) ? storedTheme : "light";

export const useThemeStore = create<ThemeState>((set) => ({
	theme: initialTheme,

	setTheme: (theme) => {
		localStorage.setItem("chatty-theme", theme);
		set({ theme });
	},
}));
