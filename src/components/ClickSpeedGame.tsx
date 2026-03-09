import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, RotateCcw, Trophy, MousePointer, BarChart3 } from "lucide-react";
import { useTheme } from "@/contexts/ThemeContext";
import { Button } from "@/components/ui/button";
import { getGameStats, updateGameStats, GameStats } from "@/lib/gameStats";

interface ClickSpeedGameProps {
  isOpen: boolean;
  onClose: () => void;
}

const GAME_DURATION = 10;

const ClickSpeedGame = ({ isOpen, onClose }: ClickSpeedGameProps) => {
  const { isPony } = useTheme();
  const [clicks, setClicks] = useState(0);
  const [timeLeft, setTimeLeft] = useState(GAME_DURATION);
  const [isPlaying, setIsPlaying] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [stats, setStats] = useState<GameStats | null>(null);
  const [showStats, setShowStats] = useState(false);
  const [ripples, setRipples] = useState<{ id: number; x: number; y: number }[]>([]);

  useEffect(() => {
    setStats(getGameStats("clickspeed"));
  }, [isOpen]);

  useEffect(() => {
    if (isPlaying && timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(t => t - 1), 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0 && isPlaying) {
      setIsPlaying(false);
      setGameOver(true);
      const updated = updateGameStats("clickspeed", {
        gamesPlayed: 1,
        bestScore: clicks,
        totalScore: clicks,
        wins: 1,
      });
      setStats(updated);
    }
  }, [isPlaying, timeLeft, clicks]);

  const handleClick = useCallback((e: React.MouseEvent<HTMLButtonElement>) => {
    if (!isPlaying) return;
    
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    setClicks(c => c + 1);
    setRipples(r => [...r, { id: Date.now(), x, y }]);
    
    setTimeout(() => {
      setRipples(r => r.slice(1));
    }, 500);
  }, [isPlaying]);

  const startGame = () => {
    setClicks(0);
    setTimeLeft(GAME_DURATION);
    setIsPlaying(true);
    setGameOver(false);
    setRipples([]);
    setShowStats(false);
  };

  const cps = gameOver ? (clicks / GAME_DURATION).toFixed(1) : (timeLeft < GAME_DURATION ? (clicks / (GAME_DURATION - timeLeft)).toFixed(1) : "0.0");

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
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-primary">
              {isPony ? "🎯 Click Speed" : "CLICK_SPEED.EXE"}
            </h2>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setShowStats(!showStats)}
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                <BarChart3 size={20} />
              </button>
              <button onClick={onClose} className="text-muted-foreground hover:text-foreground z-10">
                <X size={24} />
              </button>
            </div>
          </div>

          {showStats && stats ? (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`mb-6 p-4 ${isPony ? "bg-primary/5 rounded-xl" : "cyber-border-sm bg-background/30"}`}
            >
              <h3 className="font-mono text-xs text-secondary mb-3">📊 YOUR STATS</h3>
              <div className="grid grid-cols-4 gap-3 text-center">
                <div>
                  <p className="text-xl font-bold text-primary">{stats.gamesPlayed}</p>
                  <p className="text-[10px] text-muted-foreground">Games</p>
                </div>
                <div>
                  <p className="text-xl font-bold text-secondary">{stats.bestScore}</p>
                  <p className="text-[10px] text-muted-foreground">Best</p>
                </div>
                <div>
                  <p className="text-xl font-bold text-foreground">
                    {stats.gamesPlayed ? Math.round(stats.totalScore / stats.gamesPlayed) : 0}
                  </p>
                  <p className="text-[10px] text-muted-foreground">Avg</p>
                </div>
                <div>
                  <p className="text-xl font-bold text-foreground">
                    {(stats.bestScore / GAME_DURATION).toFixed(1)}
                  </p>
                  <p className="text-[10px] text-muted-foreground">Best CPS</p>
                </div>
              </div>
            </motion.div>
          ) : null}

          <div className="flex justify-center gap-8 mb-6 font-mono">
            <div className="text-center">
              <p className="text-xs text-muted-foreground mb-1">TIME</p>
              <p className={`text-3xl font-bold ${timeLeft <= 3 && isPlaying ? "text-destructive animate-pulse" : "text-foreground"}`}>
                {timeLeft}s
              </p>
            </div>
            <div className="text-center">
              <p className="text-xs text-muted-foreground mb-1">CLICKS</p>
              <p className="text-3xl font-bold text-primary">{clicks}</p>
            </div>
            <div className="text-center">
              <p className="text-xs text-muted-foreground mb-1">CPS</p>
              <p className="text-3xl font-bold text-secondary">{cps}</p>
            </div>
          </div>

          {!isPlaying && !gameOver ? (
            <div className="flex flex-col items-center py-8">
              <MousePointer size={48} className="text-primary mb-4" />
              <Button onClick={startGame} size="lg">Start Test</Button>
              {stats && stats.bestScore > 0 && (
                <p className="mt-4 text-muted-foreground text-sm font-mono">
                  Best: <span className="text-secondary">{stats.bestScore} clicks</span> ({(stats.bestScore / GAME_DURATION).toFixed(1)} CPS)
                </p>
              )}
            </div>
          ) : gameOver ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-8"
            >
              <Trophy className={`w-16 h-16 mx-auto mb-4 ${clicks >= (stats?.bestScore || 0) ? "text-secondary" : "text-muted-foreground"}`} />
              <p className="text-2xl font-bold text-foreground mb-2">
                {clicks} Clicks!
              </p>
              <p className="text-lg text-muted-foreground mb-1">
                {(clicks / GAME_DURATION).toFixed(1)} clicks per second
              </p>
              {clicks >= (stats?.bestScore || 0) && clicks > 0 && (
                <p className="text-secondary font-mono text-sm mb-4">🎉 New High Score!</p>
              )}
              <div className="flex justify-center gap-3 mt-6">
                <Button onClick={startGame} className="gap-2">
                  <RotateCcw size={16} /> Try Again
                </Button>
              </div>
            </motion.div>
          ) : (
            <button
              onClick={handleClick}
              className={`relative w-full h-48 overflow-hidden transition-all active:scale-[0.98] ${
                isPony
                  ? "bg-gradient-to-br from-primary/20 to-secondary/20 rounded-2xl border-2 border-primary/30 hover:border-primary/50"
                  : "cyber-border bg-primary/5 hover:bg-primary/10"
              }`}
            >
              {ripples.map(ripple => (
                <motion.div
                  key={ripple.id}
                  initial={{ scale: 0, opacity: 0.5 }}
                  animate={{ scale: 4, opacity: 0 }}
                  transition={{ duration: 0.5 }}
                  className="absolute w-16 h-16 rounded-full bg-primary/30 pointer-events-none"
                  style={{ left: ripple.x - 32, top: ripple.y - 32 }}
                />
              ))}
              <div className="flex flex-col items-center justify-center h-full">
                <MousePointer size={32} className="text-primary mb-2" />
                <p className="font-mono text-lg text-foreground">
                  {isPony ? "Click here!" : "CLICK_ZONE"}
                </p>
              </div>
            </button>
          )}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default ClickSpeedGame;