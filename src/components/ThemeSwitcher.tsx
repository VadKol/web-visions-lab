import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Palette } from "lucide-react";
import { useTheme, themes } from "@/contexts/ThemeContext";

const ThemeSwitcher = () => {
  const { theme, setTheme } = useTheme();
  const [open, setOpen] = useState(false);

  return (
    <div className="fixed bottom-6 left-6 z-50">
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.9 }}
            transition={{ duration: 0.2 }}
            className="absolute bottom-14 left-0 cyber-border bg-card/95 backdrop-blur-xl p-3 min-w-[180px]"
          >
            <p className="font-mono text-[10px] text-muted-foreground tracking-wider mb-2 px-1">
              {'>'} THEME.SELECT
            </p>
            {themes.map((t) => (
              <button
                key={t.id}
                onClick={() => {
                  setTheme(t.id);
                  setOpen(false);
                }}
                className={`w-full flex items-center gap-3 px-3 py-2 text-left transition-all font-mono text-xs tracking-wider ${
                  theme === t.id
                    ? "text-primary bg-primary/10"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                }`}
              >
                <span className="text-base">{t.icon}</span>
                <span>{t.label}</span>
                {theme === t.id && (
                  <span className="ml-auto w-2 h-2 rounded-full" style={{ background: t.color }} />
                )}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setOpen(!open)}
        className="w-12 h-12 cyber-border-sm bg-card text-primary flex items-center justify-center hover:bg-primary/10 transition-colors box-glow"
        aria-label="Change theme"
      >
        <Palette size={18} />
      </motion.button>
    </div>
  );
};

export default ThemeSwitcher;
