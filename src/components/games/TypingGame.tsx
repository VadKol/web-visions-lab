import { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, RotateCcw, Trophy, Keyboard, Zap, BarChart3 } from "lucide-react";
import { useTheme } from "@/contexts/ThemeContext";
import { getGameStats, updateGameStats, GameStats } from "@/lib/gameStats";

const CODE_SNIPPETS = [
  "const dev = () => createAwesome();",
  "npm install --save-dev @types/magic",
  "git push origin main --force",
  "docker compose up -d --build",
  "SELECT * FROM users WHERE skill = 'pro';",
  "export default function App() { return <Magic />; }",
  "console.log('Hello, World!');",
  "const [state, setState] = useState(null);",
  "async function fetchData() { await api.get(); }",
  "interface Props { name: string; onClick: () => void; }",
];

interface TypingGameProps {
  isOpen: boolean;
  onClose: () => void;
}

const TypingGame = ({ isOpen, onClose }: TypingGameProps) => {
  const { isPony } = useTheme();
  const [currentSnippet, setCurrentSnippet] = useState("");
  const [userInput, setUserInput] = useState("");
  const [startTime, setStartTime] = useState<number | null>(null);
  const [endTime, setEndTime] = useState<number | null>(null);
  const [errors, setErrors] = useState(0);
  const [isFinished, setIsFinished] = useState(false);
  const [gameStarted, setGameStarted] = useState(false);
  const [stats, setStats] = useState<GameStats | null>(null);
  const [showStats, setShowStats] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setStats(getGameStats("typing"));
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const getRandomSnippet = useCallback(() => {
    return CODE_SNIPPETS[Math.floor(Math.random() * CODE_SNIPPETS.length)];
  }, []);

  const resetGame = useCallback(() => {
    setCurrentSnippet(getRandomSnippet());
    setUserInput("");
    setStartTime(null);
    setEndTime(null);
    setErrors(0);
    setIsFinished(false);
    setGameStarted(false);
    setShowStats(false);
    setTimeout(() => inputRef.current?.focus(), 100);
  }, [getRandomSnippet]);

  useEffect(() => {
    if (isOpen) {
      resetGame();
    }
  }, [isOpen, resetGame]);

  const calculateWPM = useCallback(() => {
    if (!startTime || !endTime) return 0;
    const timeInMinutes = (endTime - startTime) / 60000;
    const words = currentSnippet.length / 5;
    return Math.round(words / timeInMinutes);
  }, [startTime, endTime, currentSnippet]);

  const calculateAccuracy = useCallback(() => {
    if (userInput.length === 0) return 100;
    const correctChars = userInput.split("").filter((char, i) => char === currentSnippet[i]).length;
    return Math.round((correctChars / userInput.length) * 100);
  }, [userInput, currentSnippet]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    
    if (!gameStarted && value.length > 0) {
      setGameStarted(true);
      setStartTime(Date.now());
    }

    let errorCount = 0;
    for (let i = 0; i < value.length; i++) {
      if (value[i] !== currentSnippet[i]) {
        errorCount++;
      }
    }
    setErrors(errorCount);
    setUserInput(value);

    if (value === currentSnippet) {
      const now = Date.now();
      setEndTime(now);
      setIsFinished(true);
      
      const timeInMinutes = (now - (startTime || now)) / 60000;
      const words = currentSnippet.length / 5;
      const wpm = Math.round(words / timeInMinutes);
      
      const updated = updateGameStats("typing", {
        gamesPlayed: 1,
        bestScore: wpm,
        totalScore: wpm,
        wins: 1,
      });
      setStats(updated);
    }
  };

  const renderText = () => {
    return currentSnippet.split("").map((char, index) => {
      let className = "text-muted-foreground/40";
      if (index < userInput.length) {
        className = userInput[index] === char ? "text-primary" : "text-destructive bg-destructive/20";
      }
      if (index === userInput.length) {
        className += " border-l-2 border-primary animate-pulse";
      }
      return (
        <span key={index} className={className}>
          {char}
        </span>
      );
    });
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center bg-background/95 backdrop-blur-sm p-4 overflow-hidden"
        onClick={(e) => e.target === e.currentTarget && onClose()}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          className={`w-full max-w-lg p-4 relative ${
            isPony
              ? "bg-card rounded-2xl border-2 border-primary/20"
              : "bg-card cyber-border"
          }`}
        >
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Keyboard size={18} className="text-primary" />
              <h2 className="font-mono text-sm tracking-wider text-foreground">
                {isPony ? "⌨️ Typing" : "> TYPING.EXE"}
              </h2>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={resetGame}
                className="text-muted-foreground hover:text-primary transition-colors"
                title="Restart"
              >
                <RotateCcw size={18} />
              </button>
              <button
                onClick={() => setShowStats(!showStats)}
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                <BarChart3 size={18} />
              </button>
              <button
                onClick={onClose}
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                <X size={18} />
              </button>
            </div>
          </div>

          {showStats && stats ? (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              className={`mb-4 p-3 ${isPony ? "bg-primary/5 rounded-xl" : "cyber-border-sm bg-background/30"}`}
            >
              <div className="grid grid-cols-4 gap-2 text-center">
                <div>
                  <p className="text-lg font-bold text-primary">{stats.gamesPlayed}</p>
                  <p className="text-[9px] text-muted-foreground">Games</p>
                </div>
                <div>
                  <p className="text-lg font-bold text-secondary">{stats.bestScore}</p>
                  <p className="text-[9px] text-muted-foreground">Best WPM</p>
                </div>
                <div>
                  <p className="text-lg font-bold text-foreground">
                    {stats.gamesPlayed ? Math.round(stats.totalScore / stats.gamesPlayed) : 0}
                  </p>
                  <p className="text-[9px] text-muted-foreground">Avg WPM</p>
                </div>
                <div>
                  <p className="text-lg font-bold text-foreground">{stats.wins || 0}</p>
                  <p className="text-[9px] text-muted-foreground">Done</p>
                </div>
              </div>
            </motion.div>
          ) : null}

          <div className="grid grid-cols-3 gap-3 mb-4">
            <div className={`p-2 text-center ${isPony ? "bg-primary/10 rounded-lg" : "cyber-border-sm bg-background/50"}`}>
              <p className="font-mono text-[9px] text-muted-foreground mb-1">WPM</p>
              <p className="font-mono text-lg text-primary">{isFinished ? calculateWPM() : "--"}</p>
            </div>
            <div className={`p-2 text-center ${isPony ? "bg-secondary/10 rounded-lg" : "cyber-border-sm bg-background/50"}`}>
              <p className="font-mono text-[9px] text-muted-foreground mb-1">ACC</p>
              <p className="font-mono text-lg text-secondary">{calculateAccuracy()}%</p>
            </div>
            <div className={`p-2 text-center ${isPony ? "bg-destructive/10 rounded-lg" : "cyber-border-sm bg-background/50"}`}>
              <p className="font-mono text-[9px] text-muted-foreground mb-1">ERR</p>
              <p className="font-mono text-lg text-destructive">{errors}</p>
            </div>
          </div>

          <div className={`p-3 mb-3 font-mono text-sm leading-relaxed break-all ${
            isPony ? "bg-background/50 rounded-lg border border-primary/10" : "cyber-border-sm bg-background/30"
          }`}>
            {renderText()}
          </div>

          <input
            ref={inputRef}
            type="text"
            value={userInput}
            onChange={handleInputChange}
            disabled={isFinished}
            placeholder={isPony ? "Start typing..." : "> TYPE..."}
            className={`w-full p-3 font-mono text-sm bg-transparent border-2 outline-none transition-all ${
              isPony
                ? "border-primary/20 rounded-lg focus:border-primary/50 placeholder:text-muted-foreground/40"
                : "border-primary/20 focus:border-primary/50 placeholder:text-muted-foreground/40"
            }`}
            autoComplete="off"
            spellCheck={false}
          />

          {isFinished && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-4 text-center"
            >
              <div className="flex items-center justify-center gap-2 mb-2">
                <Trophy className="text-primary" size={20} />
                <span className="font-mono text-base text-primary">
                  {isPony ? "Great! 🎉" : "DONE"}
                </span>
              </div>
              <div className="flex items-center justify-center gap-2 text-muted-foreground">
                <Zap size={14} />
                <span className="font-mono text-xs">
                  {calculateWPM()} WPM | {calculateAccuracy()}%
                </span>
              </div>
            </motion.div>
          )}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default TypingGame;