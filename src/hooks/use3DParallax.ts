import { useEffect, useState } from "react";
import { useMotionValue, useSpring } from "framer-motion";
import { useIsMobile } from "@/hooks/use-mobile";

interface Parallax3DValues {
  rotateX: ReturnType<typeof useSpring>;
  rotateY: ReturnType<typeof useSpring>;
  mouseX: ReturnType<typeof useSpring>;
  mouseY: ReturnType<typeof useSpring>;
}

export const use3DParallax = (intensity: number = 1): Parallax3DValues => {
  const isMobile = useIsMobile();
  const rotateXValue = useMotionValue(0);
  const rotateYValue = useMotionValue(0);
  const mouseXValue = useMotionValue(0);
  const mouseYValue = useMotionValue(0);

  const springConfig = { stiffness: 100, damping: 30, mass: 0.5 };
  
  const rotateX = useSpring(rotateXValue, springConfig);
  const rotateY = useSpring(rotateYValue, springConfig);
  const mouseX = useSpring(mouseXValue, springConfig);
  const mouseY = useSpring(mouseYValue, springConfig);

  const [hasDeviceOrientation, setHasDeviceOrientation] = useState(false);

  useEffect(() => {
    // Disable all parallax movement on mobile
    if (isMobile) return;

    const checkOrientation = () => {
      if (typeof DeviceOrientationEvent !== "undefined" && 
          typeof (DeviceOrientationEvent as any).requestPermission === "function") {
        setHasDeviceOrientation(false);
      } else if (window.DeviceOrientationEvent) {
        setHasDeviceOrientation(true);
      }
    };
    
    checkOrientation();

    const handleOrientation = (e: DeviceOrientationEvent) => {
      if (e.beta !== null && e.gamma !== null) {
        const tiltX = Math.max(-30, Math.min(30, e.beta - 45)) / 30;
        const tiltY = Math.max(-30, Math.min(30, e.gamma)) / 30;
        
        rotateXValue.set(tiltX * 15 * intensity);
        rotateYValue.set(tiltY * 15 * intensity);
        mouseXValue.set(tiltY * 50 * intensity);
        mouseYValue.set(tiltX * 50 * intensity);
      }
    };

    const handleMouse = (e: MouseEvent) => {
      if (hasDeviceOrientation) return;
      
      const centerX = window.innerWidth / 2;
      const centerY = window.innerHeight / 2;
      
      const normalizedX = (e.clientX - centerX) / centerX;
      const normalizedY = (e.clientY - centerY) / centerY;
      
      rotateXValue.set(-normalizedY * 10 * intensity);
      rotateYValue.set(normalizedX * 10 * intensity);
      mouseXValue.set(normalizedX * 30 * intensity);
      mouseYValue.set(normalizedY * 30 * intensity);
    };

    if (hasDeviceOrientation) {
      window.addEventListener("deviceorientation", handleOrientation);
    }
    window.addEventListener("mousemove", handleMouse);

    return () => {
      window.removeEventListener("deviceorientation", handleOrientation);
      window.removeEventListener("mousemove", handleMouse);
    };
  }, [isMobile, hasDeviceOrientation, intensity, rotateXValue, rotateYValue, mouseXValue, mouseYValue]);

  return { rotateX, rotateY, mouseX, mouseY };
};

export default use3DParallax;
