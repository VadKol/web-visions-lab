import { useEffect, useRef } from "react";
import { useTheme } from "@/contexts/ThemeContext";

const CursorTrail = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { isPony } = useTheme();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationId: number;
    const particles: { x: number; y: number; alpha: number; size: number; vx: number; vy: number }[] = [];
    let mouse = { x: -100, y: -100 };

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const getColor = () => {
      const style = getComputedStyle(document.documentElement);
      const hsl = style.getPropertyValue("--neon-primary").trim();
      if (!hsl) return "0, 100%, 50%";
      return hsl;
    };

    const onMove = (e: MouseEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
      for (let i = 0; i < 2; i++) {
        particles.push({
          x: mouse.x,
          y: mouse.y,
          alpha: 1,
          size: Math.random() * 3 + 1.5,
          vx: (Math.random() - 0.5) * 1.5,
          vy: (Math.random() - 0.5) * 1.5,
        });
      }
      if (particles.length > 80) particles.splice(0, particles.length - 80);
    };

    window.addEventListener("mousemove", onMove);

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const hsl = getColor();

      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.alpha -= 0.02;
        p.x += p.vx;
        p.y += p.vy;
        p.size *= 0.97;

        if (p.alpha <= 0) {
          particles.splice(i, 1);
          continue;
        }

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `hsla(${hsl}, ${p.alpha})`;
        ctx.shadowBlur = 8;
        ctx.shadowColor = `hsla(${hsl}, ${p.alpha * 0.5})`;
        ctx.fill();
      }

      ctx.shadowBlur = 0;
      animationId = requestAnimationFrame(animate);
    };
    animate();

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("resize", resize);
    };
  }, [isPony]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 z-[9999] pointer-events-none"
    />
  );
};

export default CursorTrail;
