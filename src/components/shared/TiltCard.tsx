import { useCallback, useRef, MouseEvent, ReactNode } from "react";

interface TiltCardProps {
  children: ReactNode;
  className?: string;
  tiltMax?: number;
}

const TiltCard = ({ children, className = "", tiltMax = 8 }: TiltCardProps) => {
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMove = useCallback(
    (e: MouseEvent<HTMLDivElement>) => {
      const card = cardRef.current;
      if (!card) return;
      const rect = card.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width;
      const y = (e.clientY - rect.top) / rect.height;
      const rotateX = (0.5 - y) * tiltMax;
      const rotateY = (x - 0.5) * tiltMax;

      card.style.transform = `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
      
      // Edge glow
      const glowX = x * 100;
      const glowY = y * 100;
      card.style.setProperty("--glow-x", `${glowX}%`);
      card.style.setProperty("--glow-y", `${glowY}%`);
    },
    [tiltMax]
  );

  const handleLeave = useCallback(() => {
    const card = cardRef.current;
    if (!card) return;
    card.style.transform = "perspective(800px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)";
  }, []);

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      className={`transition-transform duration-200 ease-out ${className}`}
      style={{
        transformStyle: "preserve-3d",
        background: `radial-gradient(circle at var(--glow-x, 50%) var(--glow-y, 50%), hsl(var(--primary) / 0.08) 0%, transparent 60%)`,
      }}
    >
      {children}
    </div>
  );
};

export default TiltCard;
