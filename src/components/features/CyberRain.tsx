import { useEffect, useRef } from "react";
import { useTheme } from "@/contexts/ThemeContext";

const CyberRain = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { isPony } = useTheme();

  useEffect(() => {
    if (isPony) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    const drops: { x: number; y: number; speed: number; length: number; alpha: number }[] = [];

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const getColor = () => {
      const hsl = getComputedStyle(document.documentElement).getPropertyValue("--neon-primary").trim();
      return hsl || "185 100% 50%";
    };

    // Init drops
    for (let i = 0; i < 80; i++) {
      drops.push({
        x: Math.random() * (canvas.width || 1200),
        y: Math.random() * (canvas.height || 800),
        speed: Math.random() * 4 + 2,
        length: Math.random() * 20 + 10,
        alpha: Math.random() * 0.4 + 0.1,
      });
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const hsl = getColor();

      for (const drop of drops) {
        ctx.beginPath();
        ctx.moveTo(drop.x, drop.y);
        ctx.lineTo(drop.x + 0.5, drop.y + drop.length);
        ctx.strokeStyle = `hsla(${hsl}, ${drop.alpha})`;
        ctx.lineWidth = 1;
        ctx.stroke();

        // Glow dot at bottom
        ctx.beginPath();
        ctx.arc(drop.x + 0.25, drop.y + drop.length, 1, 0, Math.PI * 2);
        ctx.fillStyle = `hsla(${hsl}, ${drop.alpha * 1.5})`;
        ctx.fill();

        drop.y += drop.speed;
        if (drop.y > canvas.height) {
          drop.y = -drop.length;
          drop.x = Math.random() * canvas.width;
        }
      }

      animId = requestAnimationFrame(animate);
    };
    animate();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
    };
  }, [isPony]);

  if (isPony) return null;

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none z-[1]"
    />
  );
};

export default CyberRain;
