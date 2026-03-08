import { useLocation, Link } from "react-router-dom";
import { useEffect, useState, useCallback, useRef } from "react";
import { motion } from "framer-motion";
import { useTheme } from "@/contexts/ThemeContext";

interface Bug {
  id: number;
  x: number;
  y: number;
  speed: number;
  dx: number;
  dy: number;
}

const NotFound = () => {
  const location = useLocation();
  const { isPony } = useTheme();
  const [bugs, setBugs] = useState<Bug[]>([]);
  const [score, setScore] = useState(0);
  const [gameStarted, setGameStarted] = useState(false);
  const frameRef = useRef<number>(0);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  const spawnBugs = useCallback(() => {
    const initial: Bug[] = Array.from({ length: 8 }, (_, i) => ({
      id: i,
      x: Math.random() * 80 + 10,
      y: Math.random() * 60 + 20,
      speed: 0.3 + Math.random() * 0.5,
      dx: (Math.random() - 0.5) * 2,
      dy: (Math.random() - 0.5) * 2,
    }));
    setBugs(initial);
    setScore(0);
    setGameStarted(true);
  }, []);

  useEffect(() => {
    if (!gameStarted || bugs.length === 0) return;

    const animate = () => {
      setBugs((prev) =>
        prev.map((bug) => {
          let nx = bug.x + bug.dx * bug.speed;
          let ny = bug.y + bug.dy * bug.speed;
          let ndx = bug.dx;
          let ndy = bug.dy;

          if (nx < 2 || nx > 95) ndx *= -1;
          if (ny < 5 || ny > 90) ndy *= -1;

          // Random direction change
          if (Math.random() < 0.02) {
            ndx = (Math.random() - 0.5) * 2;
            ndy = (Math.random() - 0.5) * 2;
          }

          return { ...bug, x: Math.max(2, Math.min(95, nx)), y: Math.max(5, Math.min(90, ny)), dx: ndx, dy: ndy };
        })
      );
      frameRef.current = requestAnimationFrame(animate);
    };

    frameRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frameRef.current);
  }, [gameStarted, bugs.length]);

  const squashBug = (id: number) => {
    setBugs((prev) => prev.filter((b) => b.id !== id));
    setScore((s) => s + 1);
  };

  const allSquashed = gameStarted && bugs.length === 0;

  return (
    <div
      ref={containerRef}
      className="relative flex min-h-screen flex-col items-center justify-center bg-background overflow-hidden select-none"
    >
      {!isPony && <div className="absolute inset-0 scanlines pointer-events-none opacity-20" />}

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center z-10 relative"
      >
        <p className="font-mono text-xs text-secondary tracking-wider mb-4">
          {isPony ? "🙈 Oopsie!" : "> ERROR_404.DETECTED"}
        </p>
        <h1 className={`text-8xl md:text-9xl font-bold mb-4 ${isPony ? "text-primary" : "text-primary text-glow"}`}>
          404
        </h1>

        {!gameStarted ? (
          <>
            <p className="text-muted-foreground font-body text-lg mb-8">
              {isPony ? "This page doesn't exist! 😿" : "Page not found in the system."}
            </p>
            <div className="flex flex-col items-center gap-4">
              <button
                onClick={spawnBugs}
                className={`inline-flex items-center gap-2 font-mono text-xs tracking-wider px-8 py-3 transition-all ${
                  isPony
                    ? "bg-primary text-primary-foreground rounded-full hover:opacity-90"
                    : "cyber-border bg-primary/15 text-primary hover:bg-primary/25 box-glow"
                }`}
              >
                {isPony ? "🐛 Catch bugs!" : "DESTROY_BUGS.EXE"}
              </button>
              <Link
                to="/"
                className="font-mono text-xs text-muted-foreground hover:text-primary transition-colors tracking-wider"
              >
                {isPony ? "← Go home" : "← RETURN_HOME"}
              </Link>
            </div>
          </>
        ) : allSquashed ? (
          <>
            <p className={`font-mono text-lg mb-2 ${isPony ? "text-secondary" : "text-secondary text-glow-secondary"}`}>
              {isPony ? "All bugs caught! 🎉" : "ALL_BUGS.TERMINATED"}
            </p>
            <p className="text-muted-foreground font-mono text-sm mb-6">
              Score: {score}/8
            </p>
            <div className="flex items-center justify-center gap-4">
              <button
                onClick={spawnBugs}
                className={`font-mono text-xs tracking-wider px-6 py-2 transition-all ${
                  isPony
                    ? "bg-primary/10 text-primary rounded-full border-2 border-primary/20"
                    : "cyber-border text-primary hover:bg-primary/10"
                }`}
              >
                {isPony ? "🔄 Again!" : "RESTART"}
              </button>
              <Link
                to="/"
                className={`font-mono text-xs tracking-wider px-6 py-2 transition-all ${
                  isPony
                    ? "bg-primary text-primary-foreground rounded-full"
                    : "cyber-border bg-primary/15 text-primary hover:bg-primary/25"
                }`}
              >
                {isPony ? "← Home" : "RETURN_HOME"}
              </Link>
            </div>
          </>
        ) : (
          <div className="flex items-center justify-center gap-6">
            <p className="font-mono text-xs text-muted-foreground tracking-wider">
              {isPony ? `🐛 ${bugs.length} bugs left` : `BUGS_REMAINING: ${bugs.length}`}
            </p>
            <p className={`font-mono text-xs tracking-wider ${isPony ? "text-secondary" : "text-secondary text-glow-secondary"}`}>
              {isPony ? `✨ Score: ${score}` : `SCORE: ${score}`}
            </p>
          </div>
        )}
      </motion.div>

      {/* Bugs */}
      {bugs.map((bug) => (
        <motion.button
          key={bug.id}
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="absolute text-2xl cursor-pointer hover:scale-125 transition-transform z-20"
          style={{ left: `${bug.x}%`, top: `${bug.y}%` }}
          onClick={() => squashBug(bug.id)}
          aria-label="Squash bug"
        >
          🐛
        </motion.button>
      ))}
    </div>
  );
};

export default NotFound;
