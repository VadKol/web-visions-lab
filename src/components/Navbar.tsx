import { useState, useEffect } from "react";
import { motion } from "framer-motion";

const navLinks = [
  { label: "Про мене", href: "#about" },
  { label: "Навички", href: "#skills" },
  { label: "Проєкти", href: "#projects" },
  { label: "Контакти", href: "#contact" },
];

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  return (
    <motion.nav
      initial={{ y: -80 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-background/80 backdrop-blur-xl border-b border-border" : ""
      }`}
    >
      <div className="container mx-auto flex items-center justify-between py-4 px-6">
        <a href="#" className="font-mono text-lg font-bold text-primary">
          &lt;dev /&gt;
        </a>
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link, i) => (
            <motion.a
              key={link.href}
              href={link.href}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * i + 0.3 }}
              className="font-mono text-sm text-muted-foreground hover:text-primary transition-colors"
            >
              <span className="text-primary mr-1">0{i + 1}.</span>
              {link.label}
            </motion.a>
          ))}
        </div>
        <a
          href="#contact"
          className="hidden md:inline-flex font-mono text-sm border border-primary text-primary px-4 py-2 rounded hover:bg-primary/10 transition-colors"
        >
          Зв'язатися
        </a>
      </div>
    </motion.nav>
  );
};

export default Navbar;
