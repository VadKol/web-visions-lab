import { motion } from "framer-motion";
import { ReactNode, forwardRef } from "react";

interface PageTransitionProps {
  children: ReactNode;
}

const pageVariants = {
  initial: { 
    opacity: 0, 
    scale: 0.96,
    filter: "blur(8px)",
    rotateX: 5,
  },
  enter: { 
    opacity: 1, 
    scale: 1,
    filter: "blur(0px)",
    rotateX: 0,
    transition: {
      duration: 0.6,
      ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number],
      staggerChildren: 0.08,
    },
  },
  exit: { 
    opacity: 0, 
    scale: 1.04,
    filter: "blur(12px)",
    rotateX: -3,
    transition: {
      duration: 0.4,
      ease: [0.55, 0.085, 0.68, 0.53] as [number, number, number, number],
    },
  },
};

const childVariants = {
  initial: { 
    opacity: 0, 
    y: 40,
    scale: 0.95,
  },
  enter: { 
    opacity: 1, 
    y: 0,
    scale: 1,
    transition: {
      duration: 0.5,
      ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number],
    },
  },
  exit: { 
    opacity: 0, 
    y: -30,
    scale: 0.98,
  },
};

const PageTransition = forwardRef<HTMLDivElement, PageTransitionProps>(({ children }, ref) => {
  return (
    <motion.div
      ref={ref}
      variants={pageVariants}
      initial="initial"
      animate="enter"
      exit="exit"
      style={{ 
        perspective: "1200px",
        transformStyle: "preserve-3d",
        transformOrigin: "center center",
      }}
    >
      <motion.div variants={childVariants}>
        {children}
      </motion.div>
    </motion.div>
  );
});

PageTransition.displayName = "PageTransition";

export default PageTransition;