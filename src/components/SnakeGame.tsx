import { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, RotateCcw, Trophy, BarChart3 } from "lucide-react";
import { useTheme } from "@/contexts/ThemeContext";
import { Button } from "@/components/ui/button";
import { getGameStats, updateGameStats, GameStats } from "@/lib/gameStats";

interface SnakeGameProps {
  isOpen: boolean;
  onClose: () => void;
}

type Direction = "UP" | "DOWN" | "LEFT" | "RIGHT";
type Position = { x: number; y: number };

const GRID_SIZE = 15;
const CELL_SIZE = 18;
const INITIAL_SPEED = 150;

const SnakeGame = ({ isOpen, onClose }: SnakeGameProps) => {
  const { isPony } = useTheme();
  const [snake, setSnake] = useState<Position[]>([{ x: 7, y: 7 }]);
  const [food, setFood] = useState<Position>({ x: 11, y: 7 });
  const [direction, setDirection] = useState<Direction>("RIGHT");
  const [gameOver, setGameOver] = useState(false);
  const [score, setScore] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [stats, setStats] = useState<GameStats | null>(null);
  const [showStats, setShowStats] = useState(false);
  const gameLoopRef = useRef<NodeJS.Timeout | null>(null);
  const directionRef = useRef<Direction>("RIGHT");

  useEffect(() => {
    if (isOpen) {
      setStats(getGameStats("snake"));
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const generateFood = useCallback((snakeBody: Position[]): Position => {
    let newFood: Position;
    do {
      newFood = {
        x: Math.floor(Math.random() * GRID_SIZE),
        y: Math.floor(Math.random() * GRID_SIZE),
      };
    } while (snakeBody.some(seg => seg.x === newFood.x && seg.y === newFood.y));
    return newFood;
  }, []);

  const resetGame = useCallback(() => {
    setSnake([{ x: 7, y: 7 }]);
    setFood({ x: 11, y: 7 });
    setDirection("RIGHT");
    directionRef.current = "RIGHT";
    setGameOver(false);
    setScore(0);
    setIsPlaying(true);
    setShowStats(false);
  }, []);

  const endGame = useCallback((finalScore: number) => {
    setGameOver(true);
    setIsPlaying(false);
    const updated = updateGameStats("snake", {
      gamesPlayed: 1,
      bestScore: finalScore,
      totalScore: finalScore,
      losses: 1,
    });
    setStats(updated);
  }, []);

  const gameLoop = useCallback(() => {
    setSnake(prevSnake => {
      const head = { ...prevSnake[0] };
      const dir = directionRef.current;

      switch (dir) {
        case "UP": head.y -= 1; break;
        case "DOWN": head.y += 1; break;
        case "LEFT": head.x -= 1; break;
        case "RIGHT": head.x += 1; break;
      }

      if (head.x < 0 || head.x >= GRID_SIZE || head.y < 0 || head.y >= GRID_SIZE) {
        endGame(score);
        return prevSnake;
      }

      if (prevSnake.some(seg => seg.x === head.x && seg.y === head.y)) {
        endGame(score);
        return prevSnake;
      }

      const newSnake = [head, ...prevSnake];

      if (head.x === food.x && head.y === food.y) {
        setScore(s => s + 10);
        setFood(generateFood(newSnake));
      } else {
        newSnake.pop();
      }

      return newSnake;
    });
  }, [food, generateFood, score, endGame]);

  useEffect(() => {
    if (isPlaying && !gameOver) {
      gameLoopRef.current = setInterval(gameLoop, INITIAL_SPEED - Math.min(score, 100));
    }
    return () => {
      if (gameLoopRef.current) clearInterval(gameLoopRef.current);
    };
  }, [isPlaying, gameOver, gameLoop, score]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;
      
      const key = e.key;
      
      if (["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight", "w", "a", "s", "d", " "].includes(key)) {
        e.preventDefault();
      }
      
      const currentDir = directionRef.current;

      if ((key === "ArrowUp" || key === "w") && currentDir !== "DOWN") {
        directionRef.current = "UP";
        setDirection("UP");
      } else if ((key === "ArrowDown" || key === "s") && currentDir !== "UP") {
        directionRef.current = "DOWN";
        setDirection("DOWN");
      } else if ((key === "ArrowLeft" || key === "a") && currentDir !== "RIGHT") {
        directionRef.current = "LEFT";
        setDirection("LEFT");
      } else if ((key === "ArrowRight" || key === "d") && currentDir !== "LEFT") {
        directionRef.current = "RIGHT";
        setDirection("RIGHT");
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen]);

  // Touch/swipe gesture handling
  const touchStartRef = useRef<{ x: number; y: number } | null>(null);

  const handleTouchStart = (e: React.TouchEvent) => {
    const touch = e.touches[0];
    touchStartRef.current = { x: touch.clientX, y: touch.clientY };
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (!touchStartRef.current || !isPlaying || gameOver) return;
    
    const touch = e.changedTouches[0];
    const deltaX = touch.clientX - touchStartRef.current.x;
    const deltaY = touch.clientY - touchStartRef.current.y;
    const minSwipe = 30;
    
    const currentDir = directionRef.current;
    
    if (Math.abs(deltaX) > Math.abs(deltaY)) {
      // Horizontal swipe
      if (deltaX > minSwipe && currentDir !== "LEFT") {
        directionRef.current = "RIGHT";
        setDirection("RIGHT");
      } else if (deltaX < -minSwipe && currentDir !== "RIGHT") {
        directionRef.current = "LEFT";
        setDirection("LEFT");
      }
    } else {
      // Vertical swipe
      if (deltaY > minSwipe && currentDir !== "UP") {
        directionRef.current = "DOWN";
        setDirection("DOWN");
      } else if (deltaY < -minSwipe && currentDir !== "DOWN") {
        directionRef.current = "UP";
        setDirection("UP");
      }
    }
    
    touchStartRef.current = null;
  };

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
              {isPony ? "🐍 Snake" : "SNAKE.EXE"}
            </h2>
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
                  <p className="text-lg font-bold text-secondary">{stats.bestScore}</p>
                  <p className="text-[9px] text-muted-foreground">Best</p>
                </div>
                <div>
                  <p className="text-lg font-bold text-foreground">
                    {stats.gamesPlayed ? Math.round(stats.totalScore / stats.gamesPlayed) : 0}
                  </p>
                  <p className="text-[9px] text-muted-foreground">Avg</p>
                </div>
                <div>
                  <p className="text-lg font-bold text-foreground">{stats.totalScore}</p>
                  <p className="text-[9px] text-muted-foreground">Total</p>
                </div>
              </div>
            </motion.div>
          ) : null}

          <div className="flex justify-center gap-4 font-mono text-xs mb-3">
            <span className="text-foreground">Score: <span className="text-primary font-bold">{score}</span></span>
            <span className="text-muted-foreground">Best: <span className="text-secondary">{stats?.bestScore || 0}</span></span>
          </div>

          <div 
            className={`relative mx-auto ${isPony ? "rounded-lg" : ""} overflow-hidden border-2 border-primary/30`}
            style={{ width: GRID_SIZE * CELL_SIZE, height: GRID_SIZE * CELL_SIZE, background: isPony ? "hsl(var(--muted))" : "#0a0a0a" }}
          >
            {!isPony && (
              <div className="absolute inset-0 opacity-10" style={{
                backgroundImage: `linear-gradient(hsl(var(--primary)/0.3) 1px, transparent 1px),
                                  linear-gradient(90deg, hsl(var(--primary)/0.3) 1px, transparent 1px)`,
                backgroundSize: `${CELL_SIZE}px ${CELL_SIZE}px`
              }} />
            )}
            
            {snake.map((segment, i) => (
              <div
                key={i}
                className={`absolute transition-all duration-75 ${
                  i === 0 
                    ? isPony ? "bg-primary rounded-md" : "bg-primary" 
                    : isPony ? "bg-primary/70 rounded-sm" : "bg-primary/80"
                }`}
                style={{
                  left: segment.x * CELL_SIZE + 1,
                  top: segment.y * CELL_SIZE + 1,
                  width: CELL_SIZE - 2,
                  height: CELL_SIZE - 2,
                  boxShadow: i === 0 ? "0 0 8px hsl(var(--primary))" : undefined
                }}
              />
            ))}

            <div
              className={`absolute ${isPony ? "bg-secondary rounded-full" : "bg-secondary"}`}
              style={{
                left: food.x * CELL_SIZE + 2,
                top: food.y * CELL_SIZE + 2,
                width: CELL_SIZE - 4,
                height: CELL_SIZE - 4,
                boxShadow: "0 0 10px hsl(var(--secondary))"
              }}
            />

            {(!isPlaying || gameOver) && (
              <div className="absolute inset-0 bg-background/80 flex flex-col items-center justify-center">
                {gameOver && (
                  <div className="text-center mb-3">
                    <Trophy className="w-8 h-8 text-secondary mx-auto mb-1" />
                    <p className="text-lg font-bold text-foreground">Game Over!</p>
                    <p className="text-sm text-muted-foreground">Score: {score}</p>
                  </div>
                )}
                <Button onClick={resetGame} size="sm" className="gap-2">
                  <RotateCcw size={14} />
                  {gameOver ? "Play Again" : "Start"}
                </Button>
              </div>
            )}
          </div>

          <p className="text-center text-muted-foreground text-[10px] mt-3 font-mono">
            {isPony ? "Arrow keys or WASD 🎮" : "WASD / ARROWS"}
          </p>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default SnakeGame;