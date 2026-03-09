import { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, RotateCcw, Trophy, Pause, Play } from "lucide-react";
import { useTheme } from "@/contexts/ThemeContext";
import { Button } from "@/components/ui/button";

interface TetrisGameProps {
  isOpen: boolean;
  onClose: () => void;
}

const BOARD_WIDTH = 10;
const BOARD_HEIGHT = 20;
const CELL_SIZE = 22;

const TETROMINOES = {
  I: { shape: [[1, 1, 1, 1]], color: "hsl(var(--primary))" },
  O: { shape: [[1, 1], [1, 1]], color: "hsl(var(--secondary))" },
  T: { shape: [[0, 1, 0], [1, 1, 1]], color: "hsl(280, 70%, 60%)" },
  S: { shape: [[0, 1, 1], [1, 1, 0]], color: "hsl(120, 70%, 50%)" },
  Z: { shape: [[1, 1, 0], [0, 1, 1]], color: "hsl(0, 70%, 60%)" },
  J: { shape: [[1, 0, 0], [1, 1, 1]], color: "hsl(220, 70%, 60%)" },
  L: { shape: [[0, 0, 1], [1, 1, 1]], color: "hsl(30, 90%, 55%)" },
};

type TetrominoKey = keyof typeof TETROMINOES;

interface Piece {
  shape: number[][];
  color: string;
  x: number;
  y: number;
}

const TetrisGame = ({ isOpen, onClose }: TetrisGameProps) => {
  const { isPony } = useTheme();
  const [board, setBoard] = useState<(string | null)[][]>([]);
  const [currentPiece, setCurrentPiece] = useState<Piece | null>(null);
  const [nextPiece, setNextPiece] = useState<TetrominoKey>("I");
  const [score, setScore] = useState(0);
  const [lines, setLines] = useState(0);
  const [level, setLevel] = useState(1);
  const [gameOver, setGameOver] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [highScore, setHighScore] = useState(0);
  const gameLoopRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const saved = localStorage.getItem("tetris-highscore");
    if (saved) setHighScore(parseInt(saved));
  }, []);

  const createEmptyBoard = () => Array(BOARD_HEIGHT).fill(null).map(() => Array(BOARD_WIDTH).fill(null));

  const getRandomPiece = (): TetrominoKey => {
    const keys = Object.keys(TETROMINOES) as TetrominoKey[];
    return keys[Math.floor(Math.random() * keys.length)];
  };

  const spawnPiece = useCallback((type: TetrominoKey): Piece => {
    const tetro = TETROMINOES[type];
    return {
      shape: tetro.shape,
      color: tetro.color,
      x: Math.floor(BOARD_WIDTH / 2) - Math.floor(tetro.shape[0].length / 2),
      y: 0,
    };
  }, []);

  const resetGame = useCallback(() => {
    setBoard(createEmptyBoard());
    const first = getRandomPiece();
    const next = getRandomPiece();
    setCurrentPiece(spawnPiece(first));
    setNextPiece(next);
    setScore(0);
    setLines(0);
    setLevel(1);
    setGameOver(false);
    setIsPaused(false);
    setIsPlaying(true);
  }, [spawnPiece]);

  const isValidMove = useCallback((piece: Piece, boardState: (string | null)[][]) => {
    for (let y = 0; y < piece.shape.length; y++) {
      for (let x = 0; x < piece.shape[y].length; x++) {
        if (piece.shape[y][x]) {
          const newX = piece.x + x;
          const newY = piece.y + y;
          if (newX < 0 || newX >= BOARD_WIDTH || newY >= BOARD_HEIGHT) return false;
          if (newY >= 0 && boardState[newY][newX]) return false;
        }
      }
    }
    return true;
  }, []);

  const rotatePiece = useCallback((piece: Piece): Piece => {
    const rotated = piece.shape[0].map((_, i) => piece.shape.map(row => row[i]).reverse());
    return { ...piece, shape: rotated };
  }, []);

  const placePiece = useCallback((piece: Piece, boardState: (string | null)[][]) => {
    const newBoard = boardState.map(row => [...row]);
    for (let y = 0; y < piece.shape.length; y++) {
      for (let x = 0; x < piece.shape[y].length; x++) {
        if (piece.shape[y][x]) {
          const boardY = piece.y + y;
          const boardX = piece.x + x;
          if (boardY >= 0) newBoard[boardY][boardX] = piece.color;
        }
      }
    }
    return newBoard;
  }, []);

  const clearLines = useCallback((boardState: (string | null)[][]) => {
    const newBoard = boardState.filter(row => row.some(cell => !cell));
    const cleared = BOARD_HEIGHT - newBoard.length;
    while (newBoard.length < BOARD_HEIGHT) {
      newBoard.unshift(Array(BOARD_WIDTH).fill(null));
    }
    return { board: newBoard, cleared };
  }, []);

  const gameLoop = useCallback(() => {
    if (!currentPiece || isPaused || gameOver) return;

    const movedPiece = { ...currentPiece, y: currentPiece.y + 1 };
    
    if (isValidMove(movedPiece, board)) {
      setCurrentPiece(movedPiece);
    } else {
      // Place piece
      const newBoard = placePiece(currentPiece, board);
      const { board: clearedBoard, cleared } = clearLines(newBoard);
      
      setBoard(clearedBoard);
      setLines(l => l + cleared);
      setScore(s => {
        const points = [0, 100, 300, 500, 800][cleared] * level;
        const newScore = s + points;
        if (newScore > highScore) {
          setHighScore(newScore);
          localStorage.setItem("tetris-highscore", newScore.toString());
        }
        return newScore;
      });
      setLevel(Math.floor(lines / 10) + 1);

      // Spawn next piece
      const newPiece = spawnPiece(nextPiece);
      if (!isValidMove(newPiece, clearedBoard)) {
        setGameOver(true);
        setIsPlaying(false);
      } else {
        setCurrentPiece(newPiece);
        setNextPiece(getRandomPiece());
      }
    }
  }, [currentPiece, board, isPaused, gameOver, isValidMove, placePiece, clearLines, nextPiece, spawnPiece, level, lines, highScore]);

  useEffect(() => {
    if (isPlaying && !isPaused && !gameOver) {
      gameLoopRef.current = setInterval(gameLoop, Math.max(100, 800 - (level - 1) * 80));
    }
    return () => {
      if (gameLoopRef.current) clearInterval(gameLoopRef.current);
    };
  }, [isPlaying, isPaused, gameOver, gameLoop, level]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen || !currentPiece || isPaused || gameOver) return;

      let newPiece = { ...currentPiece };

      switch (e.key) {
        case "ArrowLeft":
        case "a":
          newPiece.x -= 1;
          break;
        case "ArrowRight":
        case "d":
          newPiece.x += 1;
          break;
        case "ArrowDown":
        case "s":
          newPiece.y += 1;
          break;
        case "ArrowUp":
        case "w":
          newPiece = rotatePiece(currentPiece);
          break;
        case " ":
          // Hard drop
          while (isValidMove({ ...newPiece, y: newPiece.y + 1 }, board)) {
            newPiece.y += 1;
          }
          break;
        case "p":
          setIsPaused(p => !p);
          return;
        default:
          return;
      }

      if (isValidMove(newPiece, board)) {
        setCurrentPiece(newPiece);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, currentPiece, board, isPaused, gameOver, isValidMove, rotatePiece]);

  if (!isOpen) return null;

  const displayBoard = currentPiece ? placePiece(currentPiece, board) : board;

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
          className={`relative ${isPony ? "bg-card rounded-3xl border-2 border-primary/30" : "cyber-border bg-card"} p-6`}
        >
          <button onClick={onClose} className="absolute top-4 right-4 text-muted-foreground hover:text-foreground">
            <X size={24} />
          </button>

          <div className="text-center mb-4">
            <h2 className="text-2xl font-bold text-primary mb-2">
              {isPony ? "🧱 Tetris" : "TETRIS.EXE"}
            </h2>
          </div>

          <div className="flex gap-6">
            <div 
              className={`relative ${isPony ? "rounded-xl" : ""} overflow-hidden border-2 border-primary/30`}
              style={{ 
                width: BOARD_WIDTH * CELL_SIZE, 
                height: BOARD_HEIGHT * CELL_SIZE, 
                background: isPony ? "hsl(var(--muted))" : "#0a0a0a" 
              }}
            >
              {displayBoard.map((row, y) =>
                row.map((cell, x) => (
                  <div
                    key={`${y}-${x}`}
                    className={`absolute border border-background/20 ${isPony ? "rounded-sm" : ""}`}
                    style={{
                      left: x * CELL_SIZE,
                      top: y * CELL_SIZE,
                      width: CELL_SIZE,
                      height: CELL_SIZE,
                      backgroundColor: cell || "transparent",
                      boxShadow: cell ? `0 0 8px ${cell}` : undefined,
                    }}
                  />
                ))
              )}

              {(!isPlaying || gameOver || isPaused) && (
                <div className="absolute inset-0 bg-background/80 flex flex-col items-center justify-center">
                  {gameOver && (
                    <div className="text-center mb-4">
                      <Trophy className="w-10 h-10 text-secondary mx-auto mb-2" />
                      <p className="text-lg font-bold">Game Over!</p>
                    </div>
                  )}
                  {isPaused && <p className="text-lg font-bold mb-4">Paused</p>}
                  <Button onClick={gameOver || !isPlaying ? resetGame : () => setIsPaused(false)} size="sm">
                    {gameOver || !isPlaying ? "Start" : "Resume"}
                  </Button>
                </div>
              )}
            </div>

            <div className="flex flex-col gap-4 w-32">
              <div className={`p-3 ${isPony ? "bg-muted rounded-xl" : "cyber-border-sm bg-background/50"}`}>
                <p className="text-xs text-muted-foreground font-mono mb-1">SCORE</p>
                <p className="text-xl font-bold text-primary">{score}</p>
              </div>
              <div className={`p-3 ${isPony ? "bg-muted rounded-xl" : "cyber-border-sm bg-background/50"}`}>
                <p className="text-xs text-muted-foreground font-mono mb-1">LEVEL</p>
                <p className="text-xl font-bold text-foreground">{level}</p>
              </div>
              <div className={`p-3 ${isPony ? "bg-muted rounded-xl" : "cyber-border-sm bg-background/50"}`}>
                <p className="text-xs text-muted-foreground font-mono mb-1">LINES</p>
                <p className="text-xl font-bold text-foreground">{lines}</p>
              </div>
              <div className={`p-3 ${isPony ? "bg-muted rounded-xl" : "cyber-border-sm bg-background/50"}`}>
                <p className="text-xs text-muted-foreground font-mono mb-1">BEST</p>
                <p className="text-lg font-bold text-secondary">{highScore}</p>
              </div>
              
              {isPlaying && !gameOver && (
                <Button variant="outline" size="sm" onClick={() => setIsPaused(p => !p)} className="gap-2">
                  {isPaused ? <Play size={14} /> : <Pause size={14} />}
                  {isPaused ? "Resume" : "Pause"}
                </Button>
              )}
            </div>
          </div>

          <p className="text-center text-muted-foreground text-xs mt-4 font-mono">
            {isPony ? "← → ↓ Move | ↑ Rotate | Space Drop" : "WASD/ARROWS | SPACE=DROP | P=PAUSE"}
          </p>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default TetrisGame;