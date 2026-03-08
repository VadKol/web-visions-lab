import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";

const navLinks = [
  { label: "HOME", href: "/" },
  { label: "ABOUT", href: "/about" },
  { label: "PROJECTS", href: "/projects" },
  { label: "CONTACT", href: "/contact" },
];

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [location]);

  return (
    <>
      <motion.nav
        initial={{ y: -80 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled ? "bg-background/90 backdrop-blur-xl border-b border-neon-cyan/20" : ""
        }`}
      >
        <div className="container mx-auto flex items-center justify-between py-4 px-6">
          <Link to="/" className="font-display text-sm font-bold text-primary text-glow-cyan tracking-widest">
            VK://DEV
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
                  className={`font-mono text-xs tracking-wider transition-colors group/link glitch-hover ${
                    location.pathname === link.href
                      ? "text-primary text-glow-cyan"
                      : "text-muted-foreground hover:text-primary"
                  }`}
                >
                  <span className="text-neon-magenta mr-1">[</span>
                  <kbd className="text-[9px] px-1 py-0.5 border border-neon-cyan/20 bg-neon-cyan/5 mr-1 opacity-0 group-hover/link:opacity-100 transition-opacity font-mono">{i + 1}</kbd>
                  {link.label}
                  <span className="text-neon-magenta ml-1">]</span>
                </Link>
              </motion.div>
            ))}
          </div>
          <Link
            to="/contact"
            className="hidden md:inline-flex font-mono text-xs tracking-wider cyber-border-sm bg-neon-cyan/5 text-primary px-5 py-2 hover:bg-neon-cyan/15 transition-colors box-glow-cyan"
          >
            JACK_IN →
          </Link>

          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden text-primary p-2"
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
            className="fixed inset-0 z-40 bg-background/98 backdrop-blur-xl flex flex-col items-center justify-center gap-10 md:hidden scanlines"
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
                    location.pathname === link.href ? "text-primary text-glow-cyan" : "text-foreground"
                  }`}
                >
                  <span className="text-neon-magenta mr-3 text-lg">{String(i + 1).padStart(2, '0')}</span>
                  {link.label}
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
