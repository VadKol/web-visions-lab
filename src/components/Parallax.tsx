import { useRef, forwardRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ReactNode } from "react";

interface ParallaxProps {
  children: ReactNode;
  speed?: number;
  className?: string;
}

const Parallax = forwardRef<HTMLDivElement, ParallaxProps>(({ children, speed = 0.5, className = "" }, _ref) => {
  const innerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: innerRef,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, speed * 100]);

  return (
    <motion.div ref={innerRef} style={{ y }} className={className}>
      {children}
    </motion.div>
  );
});

Parallax.displayName = "Parallax";

export default Parallax;
