import { useEffect, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

const KONAMI = ["ArrowUp", "ArrowUp", "ArrowDown", "ArrowDown", "ArrowLeft", "ArrowRight", "ArrowLeft", "ArrowRight", "b", "a"];

const KonamiEasterEgg = () => {
  const [triggered, setTriggered] = useState(false);
  const [progress, setProgress] = useState<string[]>([]);

  const handleKey = useCallback(
    (e: KeyboardEvent) => {
      if (triggered) return;
      const next = [...progress, e.key];
      const slice = next.slice(-KONAMI.length);

      if (slice.length === KONAMI.length && slice.every((k, i) => k === KONAMI[i])) {
        setTriggered(true);
        setProgress([]);
        setTimeout(() => setTriggered(false), 6000);
      } else {
        setProgress(slice);
      }
    },
    [progress, triggered]
  );

  useEffect(() => {
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [handleKey]);

  return (
    <AnimatePresence>
      {triggered && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="fixed inset-0 z-[200] pointer-events-none overflow-hidden"
        >
          {/* Matrix rain columns */}
          {Array.from({ length: 40 }).map((_, i) => (
            <MatrixColumn key={i} index={i} />
          ))}

          {/* Center message */}
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ delay: 0.3, type: "spring", stiffness: 300 }}
            className="absolute inset-0 flex items-center justify-center"
          >
            <div className="bg-background/80 backdrop-blur-xl border border-primary/40 px-8 py-5 text-center">
              <p className="font-mono text-primary text-xl tracking-widest text-glow mb-1">
                ACCESS GRANTED
              </p>
              <p className="font-mono text-secondary text-xs tracking-wider">
                // you found the secret 🎮
              </p>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

const chars = "アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン0123456789ABCDEF";

const MatrixColumn = ({ index }: { index: number }) => {
  const left = `${(index / 40) * 100}%`;
  const delay = Math.random() * 2;
  const duration = 2 + Math.random() * 3;
  const text = Array.from({ length: 25 }, () => chars[Math.floor(Math.random() * chars.length)]).join("\n");

  return (
    <motion.pre
      initial={{ y: "-100%" }}
      animate={{ y: "120vh" }}
      transition={{ delay, duration, ease: "linear", repeat: 1 }}
      className="absolute top-0 font-mono text-xs text-primary/70 leading-5 whitespace-pre"
      style={{ left }}
    >
      {text}
    </motion.pre>
  );
};

export default KonamiEasterEgg;
