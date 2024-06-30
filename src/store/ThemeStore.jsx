import { create } from "zustand";
import { Dark, Light } from "../styles/themes";
export const useThemeStore = create((set) => ({
  theme: "dark",
  themeStyle: Dark,
  setTheme: () => {
    set((state) => ({ theme: state.theme === "light" ? "dark" : "light" }));
    set((state) => ({ themeStyle: state.theme === "light" ? Dark : Light }));
  },
}));
