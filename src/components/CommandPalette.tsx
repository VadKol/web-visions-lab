import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Search, Home, User, FolderOpen, Mail, Palette, ArrowRight, Keyboard } from "lucide-react";
import { useTheme, themes, ThemeId } from "@/contexts/ThemeContext";
import TypingGame from "./TypingGame";

interface Command {
  id: string;
  label: string;
  sublabel?: string;
  icon: React.ReactNode;
  action: () => void;
  category: string;
}

const CommandPalette = () => {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [typingGameOpen, setTypingGameOpen] = useState(false);
  const navigate = useNavigate();
  const { setTheme, isPony } = useTheme();

  const commands: Command[] = [
    { id: "home", label: "Home", sublabel: "Go to homepage", icon: <Home size={16} />, action: () => navigate("/"), category: "Navigation" },
    { id: "about", label: "About", sublabel: "Learn more about me", icon: <User size={16} />, action: () => navigate("/about"), category: "Navigation" },
    { id: "projects", label: "Projects", sublabel: "View my work", icon: <FolderOpen size={16} />, action: () => navigate("/projects"), category: "Navigation" },
    { id: "contact", label: "Contact", sublabel: "Get in touch", icon: <Mail size={16} />, action: () => navigate("/contact"), category: "Navigation" },
    { id: "typing-game", label: isPony ? "⌨️ Typing Game" : "TYPING_TEST.EXE", sublabel: "Test your typing speed", icon: <Keyboard size={16} />, action: () => setTypingGameOpen(true), category: "Games" },
    ...themes.map((t) => ({
      id: `theme-${t.id}`,
      label: `${t.icon} ${t.label}`,
      sublabel: "Change theme",
      icon: <Palette size={16} />,
      action: () => setTheme(t.id as ThemeId),
      category: "Theme",
    })),
  ];

  const filtered = query
    ? commands.filter((c) => c.label.toLowerCase().includes(query.toLowerCase()) || c.sublabel?.toLowerCase().includes(query.toLowerCase()))
    : commands;

  const run = useCallback((cmd: Command) => {
    cmd.action();
    setOpen(false);
    setQuery("");
  }, []);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setOpen((v) => !v);
        setQuery("");
        setSelectedIndex(0);
      }
      if (e.key === "Escape") {
        setOpen(false);
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  useEffect(() => {
    if (!open) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "ArrowDown") {
        e.preventDefault();
        setSelectedIndex((i) => (i + 1) % filtered.length);
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        setSelectedIndex((i) => (i - 1 + filtered.length) % filtered.length);
      } else if (e.key === "Enter" && filtered[selectedIndex]) {
        e.preventDefault();
        run(filtered[selectedIndex]);
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [open, filtered, selectedIndex, run]);

  useEffect(() => setSelectedIndex(0), [query]);

  const grouped = filtered.reduce<Record<string, Command[]>>((acc, cmd) => {
    (acc[cmd.category] ??= []).push(cmd);
    return acc;
  }, {});

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] bg-background/60 backdrop-blur-sm flex items-start justify-center pt-[20vh]"
          onClick={() => setOpen(false)}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -10 }}
            transition={{ duration: 0.15 }}
            className="w-full max-w-lg mx-4 cyber-border bg-card/95 backdrop-blur-xl overflow-hidden shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center gap-3 px-4 py-3 border-b border-primary/20">
              <Search size={16} className="text-muted-foreground" />
              <input
                autoFocus
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Type a command..."
                className="flex-1 bg-transparent text-foreground font-mono text-sm outline-none placeholder:text-muted-foreground/50"
              />
              <kbd className="font-mono text-[10px] text-muted-foreground border border-primary/20 px-1.5 py-0.5 bg-primary/5">ESC</kbd>
            </div>

            <div className="max-h-[300px] overflow-y-auto p-2">
              {filtered.length === 0 && (
                <p className="text-center text-muted-foreground font-mono text-xs py-8 tracking-wider">No results found</p>
              )}
              {Object.entries(grouped).map(([category, cmds]) => (
                <div key={category}>
                  <p className="font-mono text-[10px] text-muted-foreground tracking-wider px-3 py-2">{category.toUpperCase()}</p>
                  {cmds.map((cmd) => {
                    const globalIdx = filtered.indexOf(cmd);
                    return (
                      <button
                        key={cmd.id}
                        onClick={() => run(cmd)}
                        onMouseEnter={() => setSelectedIndex(globalIdx)}
                        className={`w-full flex items-center gap-3 px-3 py-2.5 font-mono text-xs tracking-wider transition-colors ${
                          globalIdx === selectedIndex ? "bg-primary/15 text-primary" : "text-muted-foreground hover:text-foreground"
                        }`}
                      >
                        <span className="text-primary">{cmd.icon}</span>
                        <span className="flex-1 text-left">{cmd.label}</span>
                        {globalIdx === selectedIndex && <ArrowRight size={12} className="text-primary" />}
                      </button>
                    );
                  })}
                </div>
              ))}
            </div>

            <div className="border-t border-primary/20 px-4 py-2 flex items-center justify-between">
              <span className="font-mono text-[10px] text-muted-foreground tracking-wider">
                {filtered.length} commands
              </span>
              <div className="flex items-center gap-2">
                <kbd className="font-mono text-[10px] text-muted-foreground border border-primary/20 px-1.5 py-0.5 bg-primary/5">↑↓</kbd>
                <span className="font-mono text-[10px] text-muted-foreground">navigate</span>
                <kbd className="font-mono text-[10px] text-muted-foreground border border-primary/20 px-1.5 py-0.5 bg-primary/5">↵</kbd>
                <span className="font-mono text-[10px] text-muted-foreground">select</span>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
      <TypingGame isOpen={typingGameOpen} onClose={() => setTypingGameOpen(false)} />
    </AnimatePresence>
  );
};

export default CommandPalette;
