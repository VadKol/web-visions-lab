import { useState, useRef, useCallback } from "react";
import { motion } from "framer-motion";

interface PixelTextProps {
  children: string;
  className?: string;
}

const PixelText = ({ children, className = "" }: PixelTextProps) => {
  const [hovered, setHovered] = useState(false);
  const [chars, setChars] = useState<{ char: string; dx: number; dy: number; rot: number }[]>([]);
  const ref = useRef<HTMLSpanElement>(null);

  const scatter = useCallback(() => {
    setChars(
      children.split("").map((char) => ({
        char,
        dx: (Math.random() - 0.5) * 60,
        dy: (Math.random() - 0.5) * 40,
        rot: (Math.random() - 0.5) * 90,
      }))
    );
    setHovered(true);
  }, [children]);

  const gather = useCallback(() => {
    setHovered(false);
  }, []);

  return (
    <span
      ref={ref}
      className={`inline-flex cursor-default ${className}`}
      onMouseEnter={scatter}
      onMouseLeave={gather}
    >
      {children.split("").map((char, i) => (
        <motion.span
          key={i}
          animate={
            hovered && chars[i]
              ? {
                  x: chars[i].dx,
                  y: chars[i].dy,
                  rotate: chars[i].rot,
                  opacity: 0.4,
                }
              : { x: 0, y: 0, rotate: 0, opacity: 1 }
          }
          transition={{
            type: "spring",
            stiffness: hovered ? 200 : 400,
            damping: hovered ? 15 : 25,
            delay: hovered ? i * 0.015 : i * 0.01,
          }}
          className="inline-block"
          style={{ whiteSpace: "pre" }}
        >
          {char === " " ? "\u00A0" : char}
        </motion.span>
      ))}
    </span>
  );
};

export default PixelText;
