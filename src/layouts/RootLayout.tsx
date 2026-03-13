// src/app/RootLayout.tsx
import { ReactNode } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ScrollProgressBar from "@/components/ScrollProgressBar";
import ScrollToTop from "@/components/ScrollToTop";
import CursorTrail from "@/components/CursorTrail";
import ThemeSwitcher from "@/components/ThemeSwitcher";
import KonamiEasterEgg from "@/components/KonamiEasterEgg";
import CommandPalette from "@/components/CommandPalette";
import { useTheme } from "@/contexts/ThemeContext";

export const RootLayout = ({ children }: { children: ReactNode }) => {
  const { theme } = useTheme();

  return (
    <>
      <CursorTrail key={theme} />
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:px-4 focus:py-2 focus:bg-primary focus:text-primary-foreground focus:font-mono focus:text-sm focus:tracking-wider"
      >
        Skip to content
      </a>
      <ScrollProgressBar />
      <Navbar />
      <main id="main-content">{children}</main>
      <ScrollToTop />
      <KonamiEasterEgg />
      <CommandPalette />
      <ThemeSwitcher />
      <Footer />
    </>
  );
};