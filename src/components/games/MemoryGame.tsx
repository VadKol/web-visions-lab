import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, RotateCcw, Trophy, Clock, BarChart3 } from "lucide-react";
import { useTheme } from "@/contexts/ThemeContext";
import { Button } from "@/components/ui/button";
import { getGameStats, updateGameStats, GameStats, formatTime } from "@/lib/gameStats";

interface MemoryGameProps {
  isOpen: boolean;
  onClose: () => void;
}

const ICONS = ["⚛️", "🔷", "🟢", "🔶", "💜", "🔴", "⬛", "🔵"];

interface Card {
  id: number;
  icon: string;
  isFlipped: boolean;
  isMatched: boolean;
}

const MemoryGame = ({ isOpen, onClose }: MemoryGameProps) => {
  const { isPony } = useTheme();
  const [cards, setCards] = useState<Card[]>([]);
  const [flippedCards, setFlippedCards] = useState<number[]>([]);
  const [moves, setMoves] = useState(0);
  const [matches, setMatches] = useState(0);
  const [gameWon, setGameWon] = useState(false);
  const [timer, setTimer] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [stats, setStats] = useState<GameStats | null>(null);
  const [showStats, setShowStats] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setStats(getGameStats("memory"));
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const initGame = useCallback(() => {
    const shuffled = [...ICONS, ...ICONS]
      .sort(() => Math.random() - 0.5)
      .map((icon, i) => ({
        id: i,
        icon,
        isFlipped: false,
        isMatched: false,
      }));
    setCards(shuffled);
    setFlippedCards([]);
    setMoves(0);
    setMatches(0);
    setGameWon(false);
    setTimer(0);
    setIsPlaying(true);
    setShowStats(false);
  }, []);

  useEffect(() => {
    if (isPlaying && !gameWon) {
      const interval = setInterval(() => setTimer(t => t + 1), 1000);
      return () => clearInterval(interval);
    }
  }, [isPlaying, gameWon]);

  useEffect(() => {
    if (matches === ICONS.length && matches > 0) {
      setGameWon(true);
      setIsPlaying(false);
      const updated = updateGameStats("memory", {
        gamesPlayed: 1,
        bestTime: timer,
        totalTime: timer,
        bestScore: moves,
        totalScore: moves,
        wins: 1,
      });
      setStats(updated);
    }
  }, [matches, timer, moves]);

  const handleCardClick = (id: number) => {
    if (!isPlaying || flippedCards.length >= 2) return;
    
    const card = cards.find(c => c.id === id);
    if (!card || card.isFlipped || card.isMatched) return;

    const newCards = cards.map(c => c.id === id ? { ...c, isFlipped: true } : c);
    setCards(newCards);
    setFlippedCards([...flippedCards, id]);
  };

  useEffect(() => {
    if (flippedCards.length === 2) {
      setMoves(m => m + 1);
      const [first, second] = flippedCards;
      const firstCard = cards.find(c => c.id === first);
      const secondCard = cards.find(c => c.id === second);

      if (firstCard && secondCard && firstCard.icon === secondCard.icon) {
        setTimeout(() => {
          setCards(cards.map(c => 
            c.id === first || c.id === second ? { ...c, isMatched: true } : c
          ));
          setMatches(m => m + 1);
          setFlippedCards([]);
        }, 300);
      } else {
        setTimeout(() => {
          setCards(cards.map(c => 
            c.id === first || c.id === second ? { ...c, isFlipped: false } : c
          ));
          setFlippedCards([]);
        }, 800);
      }
    }
  }, [flippedCards, cards]);

  const formatTimeDisplay = (s: number) => `${Math.floor(s / 60)}:${(s % 60).toString().padStart(2, "0")}`;

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center bg-background/95 backdrop-blur-sm p-4 overflow-hidden"
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          className={`relative w-full max-w-sm ${isPony ? "bg-card rounded-3xl border-2 border-primary/30" : "cyber-border bg-card"} p-4`}
        >
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-xl font-bold text-primary">
              {isPony ? "🃏 Memory" : "MEMORY.EXE"}
            </h2>
            <div className="flex items-center gap-2">
              <button
                onClick={initGame}
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
              <button onClick={onClose} className="text-muted-foreground hover:text-foreground">
                <X size={20} />
              </button>
            </div>
          </div>

          {showStats && stats ? (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              className={`mb-3 p-3 ${isPony ? "bg-primary/5 rounded-xl" : "cyber-border-sm bg-background/30"}`}
            >
              <div className="grid grid-cols-4 gap-2 text-center">
                <div>
                  <p className="text-lg font-bold text-primary">{stats.gamesPlayed}</p>
                  <p className="text-[9px] text-muted-foreground">Games</p>
                </div>
                <div>
                  <p className="text-lg font-bold text-secondary">{stats.wins || 0}</p>
                  <p className="text-[9px] text-muted-foreground">Wins</p>
                </div>
                <div>
                  <p className="text-lg font-bold text-foreground">
                    {stats.bestTime ? formatTime(stats.bestTime) : "-"}
                  </p>
                  <p className="text-[9px] text-muted-foreground">Best</p>
                </div>
                <div>
                  <p className="text-lg font-bold text-foreground">
                    {stats.gamesPlayed ? Math.round((stats.totalTime || 0) / stats.gamesPlayed) : 0}s
                  </p>
                  <p className="text-[9px] text-muted-foreground">Avg</p>
                </div>
              </div>
            </motion.div>
          ) : null}

          <div className="flex justify-center gap-4 font-mono text-xs mb-3">
            <span className="flex items-center gap-1">
              <Clock size={12} className="text-primary" />
              <span className="text-foreground">{formatTimeDisplay(timer)}</span>
            </span>
            <span className="text-foreground">Moves: <span className="text-primary font-bold">{moves}</span></span>
          </div>

          {!isPlaying && !gameWon ? (
            <div className="flex flex-col items-center py-8">
              <Button onClick={initGame} size="sm">Start Game</Button>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-4 gap-2 mb-3">
                {cards.map((card) => (
                  <motion.button
                    key={card.id}
                    onClick={() => handleCardClick(card.id)}
                    className={`aspect-square text-xl flex items-center justify-center transition-all ${
                      isPony 
                        ? "rounded-lg border-2" 
                        : "cyber-border-sm"
                    } ${
                      card.isFlipped || card.isMatched
                        ? isPony ? "bg-primary/20 border-primary/50" : "bg-primary/20"
                        : isPony ? "bg-muted border-muted-foreground/20 hover:border-primary/30" : "bg-card hover:bg-primary/10"
                    } ${card.isMatched ? "opacity-60" : ""}`}
                    whileHover={{ scale: card.isFlipped || card.isMatched ? 1 : 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <motion.span
                      initial={false}
                      animate={{ 
                        rotateY: card.isFlipped || card.isMatched ? 0 : 180,
                        opacity: card.isFlipped || card.isMatched ? 1 : 0 
                      }}
                      transition={{ duration: 0.3 }}
                    >
                      {card.icon}
                    </motion.span>
                  </motion.button>
                ))}
              </div>

              {gameWon && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-center py-3"
                >
                  <Trophy className="w-8 h-8 text-secondary mx-auto mb-1" />
                  <p className="text-lg font-bold text-foreground">You Won!</p>
                  <p className="text-xs text-muted-foreground mb-3">{formatTimeDisplay(timer)} | {moves} moves</p>
                  <Button onClick={initGame} size="sm" className="gap-2">
                    <RotateCcw size={14} /> Again
                  </Button>
                </motion.div>
              )}
            </>
          )}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default MemoryGame;