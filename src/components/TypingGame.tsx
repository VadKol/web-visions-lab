import { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, RotateCcw, Trophy, Keyboard, Zap } from "lucide-react";
import { useTheme } from "@/contexts/ThemeContext";

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
  const inputRef = useRef<HTMLInputElement>(null);

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
    setTimeout(() => inputRef.current?.focus(), 100);
  }, [getRandomSnippet]);

  useEffect(() => {
    if (isOpen) {
      resetGame();
    }
  }, [isOpen, resetGame]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    
    if (!gameStarted && value.length > 0) {
      setGameStarted(true);
      setStartTime(Date.now());
    }

    // Count errors
    let errorCount = 0;
    for (let i = 0; i < value.length; i++) {
      if (value[i] !== currentSnippet[i]) {
        errorCount++;
      }
    }
    setErrors(errorCount);
    setUserInput(value);

    // Check if finished
    if (value === currentSnippet) {
      setEndTime(Date.now());
      setIsFinished(true);
    }
  };

  const calculateWPM = () => {
    if (!startTime || !endTime) return 0;
    const timeInMinutes = (endTime - startTime) / 60000;
    const words = currentSnippet.length / 5;
    return Math.round(words / timeInMinutes);
  };

  const calculateAccuracy = () => {
    if (userInput.length === 0) return 100;
    const correctChars = userInput.split("").filter((char, i) => char === currentSnippet[i]).length;
    return Math.round((correctChars / userInput.length) * 100);
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
        className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm p-4"
        onClick={(e) => e.target === e.currentTarget && onClose()}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          className={`w-full max-w-2xl p-6 relative ${
            isPony
              ? "bg-card rounded-2xl border-2 border-primary/20"
              : "bg-card cyber-border"
          }`}
        >
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2">
              <Keyboard size={20} className="text-primary" />
              <h2 className="font-mono text-sm tracking-wider text-foreground">
                {isPony ? "⌨️ Typing Challenge" : "> TYPING_TEST.EXE"}
              </h2>
            </div>
            <button
              onClick={onClose}
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              <X size={20} />
            </button>
          </div>

          {/* Stats Bar */}
          <div className="grid grid-cols-3 gap-4 mb-6">
            <div className={`p-3 text-center ${isPony ? "bg-primary/10 rounded-xl" : "cyber-border-sm bg-background/50"}`}>
              <p className="font-mono text-[10px] text-muted-foreground mb-1">WPM</p>
              <p className="font-mono text-xl text-primary">{isFinished ? calculateWPM() : "--"}</p>
            </div>
            <div className={`p-3 text-center ${isPony ? "bg-secondary/10 rounded-xl" : "cyber-border-sm bg-background/50"}`}>
              <p className="font-mono text-[10px] text-muted-foreground mb-1">ACCURACY</p>
              <p className="font-mono text-xl text-secondary">{calculateAccuracy()}%</p>
            </div>
            <div className={`p-3 text-center ${isPony ? "bg-destructive/10 rounded-xl" : "cyber-border-sm bg-background/50"}`}>
              <p className="font-mono text-[10px] text-muted-foreground mb-1">ERRORS</p>
              <p className="font-mono text-xl text-destructive">{errors}</p>
            </div>
          </div>

          {/* Text Display */}
          <div className={`p-4 mb-4 font-mono text-lg leading-relaxed break-all ${
            isPony ? "bg-background/50 rounded-xl border border-primary/10" : "cyber-border-sm bg-background/30"
          }`}>
            {renderText()}
          </div>

          {/* Input */}
          <input
            ref={inputRef}
            type="text"
            value={userInput}
            onChange={handleInputChange}
            disabled={isFinished}
            placeholder={isPony ? "Start typing..." : "> START TYPING..."}
            className={`w-full p-4 font-mono text-sm bg-transparent border-2 outline-none transition-all ${
              isPony
                ? "border-primary/20 rounded-xl focus:border-primary/50 placeholder:text-muted-foreground/40"
                : "border-primary/20 focus:border-primary/50 placeholder:text-muted-foreground/40"
            }`}
            autoComplete="off"
            spellCheck={false}
          />

          {/* Finished State */}
          {isFinished && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-6 text-center"
            >
              <div className="flex items-center justify-center gap-2 mb-4">
                <Trophy className="text-primary" size={24} />
                <span className="font-mono text-lg text-primary">
                  {isPony ? "Great job! 🎉" : "MISSION_COMPLETE"}
                </span>
              </div>
              <div className="flex items-center justify-center gap-2 text-muted-foreground">
                <Zap size={16} />
                <span className="font-mono text-sm">
                  {calculateWPM()} WPM with {calculateAccuracy()}% accuracy
                </span>
              </div>
            </motion.div>
          )}

          {/* Reset Button */}
          <button
            onClick={resetGame}
            className={`mt-6 w-full flex items-center justify-center gap-2 font-mono text-xs tracking-wider px-4 py-3 transition-all ${
              isPony
                ? "bg-primary/10 text-primary rounded-xl hover:bg-primary/20"
                : "cyber-border bg-primary/10 text-primary hover:bg-primary/20"
            }`}
          >
            <RotateCcw size={14} />
            {isPony ? "Try Again" : "RESTART"}
          </button>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default TypingGame;
