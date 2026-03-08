import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "@/contexts/ThemeContext";

const cyberRoles = [
  "FRONTEND_DEV",
  "REACT_EXPERT",
  "TYPESCRIPT_NINJA",
  "PROBLEM_SOLVER",
  "FULLSTACK_DEV",
];

const ponyRoles = [
  "Frontend Fairy ✨",
  "React Wizard 🧙",
  "TypeScript Unicorn 🦄",
  "Problem Solver 💡",
  "Fullstack Hero 🚀",
];

const TypingRoles = () => {
  const { isPony } = useTheme();
  const roles = isPony ? ponyRoles : cyberRoles;
  const [index, setIndex] = useState(0);
  const [displayed, setDisplayed] = useState("");
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const current = roles[index % roles.length];
    const currentChars = Array.from(current);
    const displayedChars = Array.from(displayed);

    if (!deleting) {
      if (displayedChars.length < currentChars.length) {
        const t = setTimeout(() => setDisplayed(currentChars.slice(0, displayedChars.length + 1).join("")), 80);
        return () => clearTimeout(t);
      } else {
        const t = setTimeout(() => setDeleting(true), 2000);
        return () => clearTimeout(t);
      }
    } else {
      if (displayedChars.length > 0) {
        const t = setTimeout(() => setDisplayed(currentChars.slice(0, displayedChars.length - 1).join("")), 40);
        return () => clearTimeout(t);
      } else {
        setDeleting(false);
        setIndex((i) => (i + 1) % roles.length);
      }
    }
  }, [displayed, deleting, index, roles]);

  return (
    <span className="font-mono text-sm md:text-base text-primary tracking-wider">
      {isPony ? "" : "> "}
      {displayed}
      <motion.span
        animate={{ opacity: [1, 0] }}
        transition={{ duration: 0.5, repeat: Infinity, repeatType: "reverse" }}
        className="inline-block w-[2px] h-[1em] bg-primary ml-0.5 align-middle"
      />
    </span>
  );
};

export default TypingRoles;
