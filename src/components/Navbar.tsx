import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { useTheme } from "@/contexts/ThemeContext";

// Prefetch map for lazy-loaded routes
const routePrefetch: Record<string, () => Promise<unknown>> = {
  "/": () => import("@/pages/Home"),
  "/about": () => import("@/pages/About"),
  "/projects": () => import("@/pages/Projects"),
  "/contact": () => import("@/pages/Contact"),
  "/minigames": () => import("@/pages/Minigames"),
  "/blog": () => import("@/pages/Blog"),
};

const navLinks = [
  { label: "HOME", href: "/" },
  { label: "ABOUT", href: "/about" },
  { label: "PROJECTS", href: "/projects" },
  { label: "GAMES", href: "/minigames" },
  { label: "BLOG", href: "/blog" },
  { label: "CONTACT", href: "/contact" },
];

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();
  const { isPony } = useTheme();

  const prefetch = useCallback((href: string) => {
    routePrefetch[href]?.();
  }, []);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [location]);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  return (
    <>
      <motion.nav
        role="navigation"
        aria-label="Main navigation"
        initial={{ y: -80 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled ? "bg-background/90 backdrop-blur-xl border-b border-primary/20" : ""
        }`}
      >
        <div className="container mx-auto flex items-center justify-between py-4 px-6">
          <Link to="/" aria-label="Home — Vadym Kolomiiets" className={`font-display text-sm font-bold text-primary tracking-widest ${isPony ? "" : "text-glow"}`}>
            {isPony ? "✨ VK" : "VK://DEV"}
          </Link>
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link, i) => (
              <motion.div
                key={link.href}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * i + 0.3 }}
              >
                <Link
                  to={link.href}
                  onMouseEnter={() => prefetch(link.href)}
                  className={`font-mono text-xs tracking-wider transition-colors group/link ${isPony ? "" : "glitch-hover"} ${
                    location.pathname === link.href
                      ? `text-primary ${isPony ? "" : "text-glow"}`
                      : "text-muted-foreground hover:text-primary"
                  }`}
                >
                  <span className="text-secondary mr-1">[</span>
                  <kbd className="text-[9px] px-1 py-0.5 border border-primary/20 bg-primary/5 mr-1 opacity-0 group-hover/link:opacity-100 transition-opacity font-mono">{i + 1}</kbd>
                  {isPony ? link.label.charAt(0) + link.label.slice(1).toLowerCase() : link.label}
                  <span className="text-secondary ml-1">]</span>
                </Link>
              </motion.div>
            ))}
          </div>
          <Link
            to="/contact"
            className={`hidden md:inline-flex font-mono text-xs tracking-wider px-5 py-2 transition-colors ${isPony ? "bg-primary text-primary-foreground rounded-full hover:opacity-90" : "cyber-border-sm bg-primary/5 text-primary hover:bg-primary/15 box-glow"}`}
          >
            {isPony ? "Say Hi! 👋" : "JACK_IN →"}
          </Link>

          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden text-primary p-2"
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileOpen}
          >
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </motion.nav>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className={`fixed inset-0 z-40 bg-background/98 backdrop-blur-xl flex flex-col items-center justify-center gap-10 md:hidden ${isPony ? "" : "scanlines"}`}
          >
            {navLinks.map((link, i) => (
              <motion.div
                key={link.href}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.05 * i }}
              >
                <Link
                  to={link.href}
                  className={`font-display text-2xl tracking-widest ${
                    location.pathname === link.href ? `text-primary ${isPony ? "" : "text-glow"}` : "text-foreground"
                  }`}
                >
                  <span className="text-secondary mr-3 text-lg">{String(i + 1).padStart(2, '0')}</span>
                  {isPony ? link.label.charAt(0) + link.label.slice(1).toLowerCase() : link.label}
                </Link>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
