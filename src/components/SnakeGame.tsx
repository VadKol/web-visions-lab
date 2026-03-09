import { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, RotateCcw, Trophy } from "lucide-react";
import { useTheme } from "@/contexts/ThemeContext";
import { Button } from "@/components/ui/button";

interface SnakeGameProps {
  isOpen: boolean;
  onClose: () => void;
}

type Direction = "UP" | "DOWN" | "LEFT" | "RIGHT";
type Position = { x: number; y: number };

const GRID_SIZE = 20;
const CELL_SIZE = 20;
const INITIAL_SPEED = 150;

const SnakeGame = ({ isOpen, onClose }: SnakeGameProps) => {
  const { isPony } = useTheme();
  const [snake, setSnake] = useState<Position[]>([{ x: 10, y: 10 }]);
  const [food, setFood] = useState<Position>({ x: 15, y: 10 });
  const [direction, setDirection] = useState<Direction>("RIGHT");
  const [gameOver, setGameOver] = useState(false);
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const gameLoopRef = useRef<NodeJS.Timeout | null>(null);
  const directionRef = useRef<Direction>("RIGHT");

  useEffect(() => {
    const saved = localStorage.getItem("snake-highscore");
    if (saved) setHighScore(parseInt(saved));
  }, []);

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
    setSnake([{ x: 10, y: 10 }]);
    setFood({ x: 15, y: 10 });
    setDirection("RIGHT");
    directionRef.current = "RIGHT";
    setGameOver(false);
    setScore(0);
    setIsPlaying(true);
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

      // Wall collision
      if (head.x < 0 || head.x >= GRID_SIZE || head.y < 0 || head.y >= GRID_SIZE) {
        setGameOver(true);
        setIsPlaying(false);
        return prevSnake;
      }

      // Self collision
      if (prevSnake.some(seg => seg.x === head.x && seg.y === head.y)) {
        setGameOver(true);
        setIsPlaying(false);
        return prevSnake;
      }

      const newSnake = [head, ...prevSnake];

      // Food collision
      if (head.x === food.x && head.y === food.y) {
        setScore(s => {
          const newScore = s + 10;
          if (newScore > highScore) {
            setHighScore(newScore);
            localStorage.setItem("snake-highscore", newScore.toString());
          }
          return newScore;
        });
        setFood(generateFood(newSnake));
      } else {
        newSnake.pop();
      }

      return newSnake;
    });
  }, [food, generateFood, highScore]);

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
          className={`relative w-full max-w-lg ${isPony ? "bg-card rounded-3xl border-2 border-primary/30" : "cyber-border bg-card"} p-6`}
        >
          <button onClick={onClose} className="absolute top-4 right-4 text-muted-foreground hover:text-foreground">
            <X size={24} />
          </button>

          <div className="text-center mb-4">
            <h2 className="text-2xl font-bold text-primary mb-2">
              {isPony ? "🐍 Snake" : "SNAKE.EXE"}
            </h2>
            <div className="flex justify-center gap-6 font-mono text-sm">
              <span className="text-foreground">Score: <span className="text-primary">{score}</span></span>
              <span className="text-muted-foreground">Best: <span className="text-secondary">{highScore}</span></span>
            </div>
          </div>

          <div 
            className={`relative mx-auto ${isPony ? "rounded-xl" : ""} overflow-hidden border-2 border-primary/30`}
            style={{ width: GRID_SIZE * CELL_SIZE, height: GRID_SIZE * CELL_SIZE, background: isPony ? "hsl(var(--muted))" : "#0a0a0a" }}
          >
            {/* Grid */}
            {!isPony && (
              <div className="absolute inset-0 opacity-10" style={{
                backgroundImage: `linear-gradient(hsl(var(--primary)/0.3) 1px, transparent 1px),
                                  linear-gradient(90deg, hsl(var(--primary)/0.3) 1px, transparent 1px)`,
                backgroundSize: `${CELL_SIZE}px ${CELL_SIZE}px`
              }} />
            )}
            
            {/* Snake */}
            {snake.map((segment, i) => (
              <div
                key={i}
                className={`absolute transition-all duration-75 ${
                  i === 0 
                    ? isPony ? "bg-primary rounded-lg" : "bg-primary" 
                    : isPony ? "bg-primary/70 rounded-md" : "bg-primary/80"
                }`}
                style={{
                  left: segment.x * CELL_SIZE + 1,
                  top: segment.y * CELL_SIZE + 1,
                  width: CELL_SIZE - 2,
                  height: CELL_SIZE - 2,
                  boxShadow: i === 0 ? "0 0 10px hsl(var(--primary))" : undefined
                }}
              />
            ))}

            {/* Food */}
            <div
              className={`absolute ${isPony ? "bg-secondary rounded-full" : "bg-secondary"}`}
              style={{
                left: food.x * CELL_SIZE + 2,
                top: food.y * CELL_SIZE + 2,
                width: CELL_SIZE - 4,
                height: CELL_SIZE - 4,
                boxShadow: "0 0 15px hsl(var(--secondary))"
              }}
            />

            {/* Game Over / Start overlay */}
            {(!isPlaying || gameOver) && (
              <div className="absolute inset-0 bg-background/80 flex flex-col items-center justify-center">
                {gameOver && (
                  <div className="text-center mb-4">
                    <Trophy className="w-12 h-12 text-secondary mx-auto mb-2" />
                    <p className="text-xl font-bold text-foreground">Game Over!</p>
                    <p className="text-muted-foreground">Score: {score}</p>
                  </div>
                )}
                <Button onClick={resetGame} className="gap-2">
                  <RotateCcw size={16} />
                  {gameOver ? "Play Again" : "Start Game"}
                </Button>
              </div>
            )}
          </div>

          <p className="text-center text-muted-foreground text-xs mt-4 font-mono">
            {isPony ? "Use arrow keys or WASD to move 🎮" : "CONTROLS: WASD / ARROWS"}
          </p>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default SnakeGame;