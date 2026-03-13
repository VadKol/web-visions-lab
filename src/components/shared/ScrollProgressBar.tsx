import { motion, useScroll, useSpring } from "framer-motion";
import { useTheme } from "@/contexts/ThemeContext";

const ScrollProgressBar = () => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });
  const { isPony } = useTheme();

  return (
    <motion.div
      style={{ scaleX, transformOrigin: "left" }}
      className={`fixed top-0 left-0 right-0 h-[3px] z-[60] ${
        isPony
          ? "bg-gradient-to-r from-pink-400 via-primary to-secondary"
          : "bg-gradient-to-r from-primary via-secondary to-primary shadow-[0_0_10px_hsl(var(--primary)/0.6)]"
      }`}
    />
  );
};

export default ScrollProgressBar;
