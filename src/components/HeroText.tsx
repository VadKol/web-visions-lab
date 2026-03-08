import { useState, useCallback, useEffect } from "react";
import { motion } from "framer-motion";
import { useTheme, ThemeId } from "@/contexts/ThemeContext";

interface HeroTextProps {
  children: string;
  className?: string;
}

const matrixChars = "01アイウエオカキクケコサシスセソ";
const glitchChars = "!@#$%^&*()_+-=[]{}|;:',.<>?/~`░▒▓█▀▄▐▌";

const randomChar = (pool: string) => pool[Math.floor(Math.random() * pool.length)];

const HeroText = ({ children, className = "" }: HeroTextProps) => {
  const { theme } = useTheme();
  const [hovered, setHovered] = useState(false);
  const [scatter, setScatter] = useState<
    { dx: number; dy: number; rot: number; replacement: string; scale: number }[]
  >([]);
  const [displayChars, setDisplayChars] = useState<string[]>(Array.from(children));

  const onEnter = useCallback(() => {
    setScatter(
      Array.from(children).map(() => ({
        dx: (Math.random() - 0.5) * 80,
        dy: (Math.random() - 0.5) * 60,
        rot: (Math.random() - 0.5) * 120,
        replacement: randomChar(matrixChars),
        scale: 1.3 + Math.random() * 0.5,
      }))
    );
    setHovered(true);
  }, [children]);

  const onLeave = useCallback(() => {
    setHovered(false);
    setDisplayChars(Array.from(children));
  }, [children]);

  // Matrix/Glitch mode: cycle random characters while hovered
  useEffect(() => {
    if (!hovered) return;
    if (theme === "green") {
      const interval = setInterval(() => {
        setDisplayChars(
          Array.from(children).map((ch) =>
            ch === " " ? " " : Math.random() > 0.3 ? randomChar(matrixChars) : ch
          )
        );
      }, 80);
      return () => clearInterval(interval);
    }
    if (theme === "cyan") {
      // Glitch: rapid scramble then resolve back
      let step = 0;
      const chars = Array.from(children);
      const interval = setInterval(() => {
        step++;
        setDisplayChars(
          chars.map((ch, i) => {
            if (ch === " ") return " ";
            // Progressively resolve: earlier chars resolve first
            if (step > i * 2 + 8) return ch;
            return randomChar(glitchChars);
          })
        );
        if (step > chars.length * 2 + 10) {
          setDisplayChars(chars);
          clearInterval(interval);
        }
      }, 50);
      return () => clearInterval(interval);
    }
  }, [hovered, theme, children]);

  const getAnimation = (i: number) => {
    if (!hovered || !scatter[i]) {
      return { x: 0, y: 0, rotate: 0, opacity: 1, scale: 1 };
    }

    switch (theme) {
      case "cyan":
        // Glitch: horizontal shake
        return {
          x: scatter[i].dx * 0.25,
          y: scatter[i].dy * 0.1,
          rotate: scatter[i].rot * 0.07,
          opacity: 0.85,
          scale: 1,
        };
      case "green":
        // Matrix: fall down + fade
        return {
          x: scatter[i].dx * 0.12,
          y: 40 + i * 3,
          rotate: 0,
          opacity: 0,
          scale: 1,
        };
      case "orange":
        // Inferno: explosive scatter like an explosion
        return {
          x: scatter[i].dx * 1.5,
          y: scatter[i].dy * 1.8,
          rotate: scatter[i].rot * 2,
          opacity: 0,
          scale: scatter[i].scale * 1.4,
        };
      case "pony":
      default:
        // Pony: scatter playfully
        return {
          x: scatter[i].dx,
          y: scatter[i].dy,
          rotate: scatter[i].rot,
          opacity: 0.4,
          scale: 1,
        };
    }
  };

  const getTransition = (i: number) => {
    switch (theme) {
      case "cyan":
        return {
          duration: hovered ? 0.1 : 0.3,
          delay: hovered ? i * 0.01 : i * 0.02,
          ease: "easeOut" as const,
        };
      case "green":
        return {
          duration: hovered ? 0.6 : 0.3,
          delay: hovered ? i * 0.03 : i * 0.01,
          ease: hovered ? "easeIn" as const : "easeOut" as const,
        };
      case "orange":
        return {
          duration: hovered ? 0.5 : 0.3,
          delay: hovered ? i * 0.02 : i * 0.01,
          ease: hovered ? [0.4, 0, 1, 1] as const : "easeOut" as const,
        };
      case "pony":
      default:
        return {
          type: "spring" as const,
          stiffness: hovered ? 200 : 400,
          damping: hovered ? 15 : 25,
          delay: hovered ? i * 0.015 : i * 0.01,
        };
    }
  };

  const getCharStyle = (i: number): React.CSSProperties => {
    if (!hovered) return {};
    switch (theme) {
      case "orange":
        return {
          filter: "blur(1px)",
          textShadow: "0 0 8px hsl(var(--primary)), 0 -4px 12px hsl(var(--primary) / 0.5)",
        };
      case "cyan":
        return {
          textShadow: "0 0 8px hsl(var(--primary)), 2px 0 hsl(var(--secondary) / 0.5), -2px 0 hsl(var(--primary) / 0.5)",
        };
      case "green":
        return {
          textShadow: "0 0 6px hsl(var(--primary))",
        };
      default:
        return {};
    }
  };

  const chars = Array.from(children);
  const showAltChars = hovered && (theme === "cyan" || theme === "green");

  return (
    <span
      className={`inline-flex cursor-default ${className}`}
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
    >
      {chars.map((char, i) => (
        <motion.span
          key={i}
          animate={getAnimation(i)}
          transition={getTransition(i)}
          className="inline-block relative"
          style={{ whiteSpace: "pre", pointerEvents: "none", ...getCharStyle(i) }}
        >
          {char === " "
            ? "\u00A0"
            : showAltChars
            ? displayChars[i] || char
            : char}
        </motion.span>
      ))}
    </span>
  );
};

export default HeroText;
