import { useEffect, useRef } from "react";
import { useTheme } from "@/contexts/ThemeContext";

const NeonCursor = () => {
  const glowRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const { theme } = useTheme();
  const pos = useRef({ x: -100, y: -100 });
  const target = useRef({ x: -100, y: -100 });

  useEffect(() => {
    let animId: number;

    const onMove = (e: MouseEvent) => {
      target.current = { x: e.clientX, y: e.clientY };
    };

    const animate = () => {
      // Smooth lerp
      pos.current.x += (target.current.x - pos.current.x) * 0.15;
      pos.current.y += (target.current.y - pos.current.y) * 0.15;

      if (glowRef.current) {
        glowRef.current.style.transform = `translate(${target.current.x}px, ${target.current.y}px) translate(-50%, -50%)`;
      }
      if (ringRef.current) {
        ringRef.current.style.transform = `translate(${pos.current.x}px, ${pos.current.y}px) translate(-50%, -50%)`;
      }

      animId = requestAnimationFrame(animate);
    };

    window.addEventListener("mousemove", onMove);
    animate();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("mousemove", onMove);
    };
  }, [theme]);

  return (
    <>
      {/* Inner glow dot */}
      <div
        ref={glowRef}
        className="fixed top-0 left-0 z-[9999] pointer-events-none w-3 h-3 rounded-full bg-primary opacity-80"
        style={{
          boxShadow: `0 0 8px 2px hsl(var(--primary) / 0.6), 0 0 20px 6px hsl(var(--primary) / 0.3)`,
          willChange: "transform",
        }}
      />
      {/* Outer trailing ring */}
      <div
        ref={ringRef}
        className="fixed top-0 left-0 z-[9999] pointer-events-none w-8 h-8 rounded-full border border-primary/40"
        style={{
          boxShadow: `0 0 12px 2px hsl(var(--primary) / 0.15)`,
          willChange: "transform",
          transition: "width 0.2s, height 0.2s",
        }}
      />
    </>
  );
};

export default NeonCursor;
