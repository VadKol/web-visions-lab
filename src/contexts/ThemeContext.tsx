import { createContext, useContext, useState, useEffect, ReactNode } from "react";

export type ThemeId = "cyan" | "green" | "orange" | "pony";

export interface ThemeOption {
  id: ThemeId;
  label: string;
  icon: string;
  color: string;
}

export const themes: ThemeOption[] = [
  { id: "cyan", label: "Neon Cyan", icon: "⚡", color: "#00e5ff" },
  { id: "green", label: "Matrix", icon: "🟢", color: "#22c55e" },
  { id: "orange", label: "Inferno", icon: "🔥", color: "#ff8c00" },
  { id: "pony", label: "Pony Mode", icon: "🦄", color: "#e879a8" },
];

interface ThemeContextType {
  theme: ThemeId;
  setTheme: (theme: ThemeId) => void;
  isPony: boolean;
}

const ThemeContext = createContext<ThemeContextType>({
  theme: "cyan",
  setTheme: () => {},
  isPony: false,
});

export const useTheme = () => useContext(ThemeContext);

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const [theme, setThemeState] = useState<ThemeId>(() => {
    try {
      return (localStorage.getItem("vk-theme") as ThemeId) || "cyan";
    } catch {
      return "cyan";
    }
  });

  const setTheme = (t: ThemeId) => {
    setThemeState(t);
    try { localStorage.setItem("vk-theme", t); } catch {}
  };

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    // Update favicon
    const faviconMap: Record<ThemeId, string> = {
      cyan: "/favicon-cyan.png",
      green: "/favicon-green.png",
      orange: "/favicon-orange.png",
      pony: "/favicon-pony.png",
    };
    const link = document.querySelector<HTMLLinkElement>("link[rel='icon']");
    if (link) {
      link.href = faviconMap[theme];
    }
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme, isPony: theme === "pony" }}>
      {children}
    </ThemeContext.Provider>
  );
};
