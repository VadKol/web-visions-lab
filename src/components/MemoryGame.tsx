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
    setStats(getGameStats("memory"));
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
        className="fixed inset-0 z-50 flex items-center justify-center bg-background/90 backdrop-blur-sm p-4"
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          className={`relative w-full max-w-md ${isPony ? "bg-card rounded-3xl border-2 border-primary/30" : "cyber-border bg-card"} p-6`}
        >
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-bold text-primary">
              {isPony ? "🃏 Memory Cards" : "MEMORY.EXE"}
            </h2>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setShowStats(!showStats)}
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                <BarChart3 size={20} />
              </button>
              <button onClick={onClose} className="text-muted-foreground hover:text-foreground">
                <X size={24} />
              </button>
            </div>
          </div>

          {showStats && stats ? (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`mb-4 p-4 ${isPony ? "bg-primary/5 rounded-xl" : "cyber-border-sm bg-background/30"}`}
            >
              <h3 className="font-mono text-xs text-secondary mb-3">📊 YOUR STATS</h3>
              <div className="grid grid-cols-4 gap-3 text-center">
                <div>
                  <p className="text-xl font-bold text-primary">{stats.gamesPlayed}</p>
                  <p className="text-[10px] text-muted-foreground">Games</p>
                </div>
                <div>
                  <p className="text-xl font-bold text-secondary">{stats.wins || 0}</p>
                  <p className="text-[10px] text-muted-foreground">Wins</p>
                </div>
                <div>
                  <p className="text-xl font-bold text-foreground">
                    {stats.bestTime ? formatTime(stats.bestTime) : "-"}
                  </p>
                  <p className="text-[10px] text-muted-foreground">Best Time</p>
                </div>
                <div>
                  <p className="text-xl font-bold text-foreground">
                    {stats.gamesPlayed ? Math.round((stats.totalTime || 0) / stats.gamesPlayed) : 0}s
                  </p>
                  <p className="text-[10px] text-muted-foreground">Avg Time</p>
                </div>
              </div>
            </motion.div>
          ) : null}

          <div className="flex justify-center gap-4 font-mono text-sm mb-4">
            <span className="flex items-center gap-1">
              <Clock size={14} className="text-primary" />
              <span className="text-foreground">{formatTimeDisplay(timer)}</span>
            </span>
            <span className="text-foreground">Moves: <span className="text-primary">{moves}</span></span>
            {stats?.bestTime && <span className="text-muted-foreground">Best: {formatTimeDisplay(stats.bestTime)}</span>}
          </div>

          {!isPlaying && !gameWon ? (
            <div className="flex flex-col items-center py-12">
              <Button onClick={initGame} size="lg">Start Game</Button>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-4 gap-2 mb-4">
                {cards.map((card) => (
                  <motion.button
                    key={card.id}
                    onClick={() => handleCardClick(card.id)}
                    className={`aspect-square text-2xl flex items-center justify-center transition-all ${
                      isPony 
                        ? "rounded-xl border-2" 
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
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-center py-4"
                >
                  <Trophy className="w-12 h-12 text-secondary mx-auto mb-2" />
                  <p className="text-xl font-bold text-foreground mb-1">You Won!</p>
                  <p className="text-muted-foreground mb-4">Time: {formatTimeDisplay(timer)} | Moves: {moves}</p>
                  <Button onClick={initGame} className="gap-2">
                    <RotateCcw size={16} /> Play Again
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