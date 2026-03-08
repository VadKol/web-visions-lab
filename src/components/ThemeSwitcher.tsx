import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Palette } from "lucide-react";
import { useTheme, themes } from "@/contexts/ThemeContext";

const PONY_PROMPT_KEY = "vk-pony-prompted";

const ThemeSwitcher = () => {
  const { theme, setTheme, isPony } = useTheme();
  const [open, setOpen] = useState(false);
  const [showPonyPrompt, setShowPonyPrompt] = useState(false);

  // Show pony prompt after 90s on first visit
  useEffect(() => {
    try {
      if (localStorage.getItem(PONY_PROMPT_KEY)) return;
    } catch {}

    const timer = setTimeout(() => {
      try {
        if (!localStorage.getItem(PONY_PROMPT_KEY)) {
          setShowPonyPrompt(true);
        }
      } catch {
        setShowPonyPrompt(true);
      }
    }, 90000);

    return () => clearTimeout(timer);
  }, []);

  const dismissPony = () => {
    setShowPonyPrompt(false);
    try { localStorage.setItem(PONY_PROMPT_KEY, "1"); } catch {}
  };

  const activatePony = () => {
    setTheme("pony");
    dismissPony();
  };

  return (
    <>
      {/* Theme switcher button - top right */}
      <div className="fixed top-4 right-4 z-50">
        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ opacity: 0, y: -10, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.9 }}
              transition={{ duration: 0.2 }}
              className="absolute top-14 right-0 cyber-border bg-card/95 backdrop-blur-xl p-3 min-w-[180px]"
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
          className="w-10 h-10 cyber-border-sm bg-card/80 backdrop-blur-sm text-primary flex items-center justify-center hover:bg-primary/10 transition-colors box-glow"
          aria-label="Change theme"
        >
          <Palette size={16} />
        </motion.button>
      </div>

      {/* Pony Mode prompt modal */}
      <AnimatePresence>
        {showPonyPrompt && !isPony && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] flex items-center justify-center bg-black/40 backdrop-blur-sm"
            onClick={dismissPony}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.85, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.85, y: 20 }}
              transition={{ type: "spring", stiffness: 400, damping: 25 }}
              onClick={(e) => e.stopPropagation()}
              className="cyber-border bg-card/95 backdrop-blur-xl p-6 max-w-sm mx-4 text-center"
            >
              <p className="text-4xl mb-3">🦄</p>
              <h3 className="font-display text-lg text-foreground tracking-wider mb-2">
                Psst... Wanna see something magical?
              </h3>
              <p className="text-muted-foreground text-sm font-body mb-5 leading-relaxed">
                Activate <span className="text-pink-400 font-semibold">Pony Mode</span> for a
                sparkly, pastel-powered experience ✨
              </p>
              <div className="flex gap-3 justify-center">
                <button
                  onClick={dismissPony}
                  className="font-mono text-xs tracking-wider px-5 py-2 text-muted-foreground hover:text-foreground transition-colors"
                >
                  Maybe later
                </button>
                <button
                  onClick={activatePony}
                  className="font-mono text-xs tracking-wider px-5 py-2 bg-gradient-to-r from-pink-500 to-purple-500 text-white rounded-full hover:opacity-90 transition-opacity"
                >
                  🦄 Yes please!
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default ThemeSwitcher;
