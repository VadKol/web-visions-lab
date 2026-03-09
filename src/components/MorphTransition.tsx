import { motion, AnimatePresence } from "framer-motion";
import { ReactNode } from "react";
import { useLocation } from "react-router-dom";

interface MorphTransitionProps {
  children: ReactNode;
}

const pageVariants = {
  initial: {
    opacity: 0,
    scale: 0.98,
    filter: "blur(10px)",
  },
  enter: {
    opacity: 1,
    scale: 1,
    filter: "blur(0px)",
    transition: {
      duration: 0.5,
      ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number],
      staggerChildren: 0.1,
    },
  },
  exit: {
    opacity: 0,
    scale: 1.02,
    filter: "blur(10px)",
    transition: {
      duration: 0.4,
      ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number],
    },
  },
};

const contentVariants = {
  initial: { 
    opacity: 0, 
    y: 30,
    rotateX: 10,
  },
  enter: { 
    opacity: 1, 
    y: 0,
    rotateX: 0,
    transition: {
      duration: 0.6,
      ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number],
    },
  },
  exit: { 
    opacity: 0, 
    y: -20,
    rotateX: -5,
    transition: {
      duration: 0.3,
    },
  },
};

export const MorphTransition = ({ children }: MorphTransitionProps) => {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={location.pathname}
        variants={pageVariants}
        initial="initial"
        animate="enter"
        exit="exit"
        style={{ 
          perspective: "1200px",
          transformStyle: "preserve-3d",
        }}
      >
        <motion.div variants={contentVariants}>
          {children}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

// Shared morph element - use layoutId for elements that should morph between pages
interface MorphElementProps {
  children: ReactNode;
  layoutId: string;
  className?: string;
}

export const MorphElement = ({ children, layoutId, className = "" }: MorphElementProps) => {
  return (
    <motion.div
      layoutId={layoutId}
      className={className}
      transition={{
        type: "spring",
        stiffness: 300,
        damping: 30,
      }}
    >
      {children}
    </motion.div>
  );
};

// Liquid morph overlay for dramatic transitions
export const MorphOverlay = () => {
  return (
    <motion.div
      className="fixed inset-0 z-[100] pointer-events-none"
      initial={{ clipPath: "circle(0% at 50% 50%)" }}
      animate={{ clipPath: "circle(150% at 50% 50%)" }}
      exit={{ clipPath: "circle(0% at 50% 50%)" }}
      transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-background to-secondary/20" />
    </motion.div>
  );
};

export default MorphTransition;