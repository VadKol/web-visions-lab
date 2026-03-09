import { motion, MotionValue } from "framer-motion";
import { ReactNode } from "react";

interface Parallax3DLayerProps {
  children: ReactNode;
  depth: number; // 0 = front, higher = further back
  rotateX: MotionValue<number>;
  rotateY: MotionValue<number>;
  mouseX: MotionValue<number>;
  mouseY: MotionValue<number>;
  className?: string;
}

export const Parallax3DLayer = ({
  children,
  depth,
  rotateX,
  rotateY,
  mouseX,
  mouseY,
  className = "",
}: Parallax3DLayerProps) => {
  const depthMultiplier = 1 + depth * 0.5;
  
  return (
    <motion.div
      className={className}
      style={{
        rotateX,
        rotateY,
        x: mouseX,
        y: mouseY,
        z: -depth * 50,
        scale: 1 - depth * 0.05,
      }}
      transition={{ type: "spring", stiffness: 100, damping: 30 }}
    >
      {children}
    </motion.div>
  );
};

interface Parallax3DSceneProps {
  children: ReactNode;
  className?: string;
  perspective?: number;
}

export const Parallax3DScene = ({
  children,
  className = "",
  perspective = 1000,
}: Parallax3DSceneProps) => {
  return (
    <div
      className={className}
      style={{
        perspective: `${perspective}px`,
        perspectiveOrigin: "50% 50%",
        transformStyle: "preserve-3d",
      }}
    >
      {children}
    </div>
  );
};

export default Parallax3DScene;
