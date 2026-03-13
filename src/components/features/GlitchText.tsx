import { useState } from "react";
import { useTheme } from "@/contexts/ThemeContext";

interface GlitchTextProps {
  children: string;
  className?: string;
}

const GlitchText = ({ children, className = "" }: GlitchTextProps) => {
  const [hovering, setHovering] = useState(false);
  const { isPony } = useTheme();

  if (isPony) {
    return (
      <span
        className={`inline-block transition-transform duration-200 hover:scale-105 cursor-default ${className}`}
      >
        {children}
      </span>
    );
  }

  return (
    <span
      className={`relative inline-block cursor-default ${className}`}
      onMouseEnter={() => setHovering(true)}
      onMouseLeave={() => setHovering(false)}
    >
      {/* Base text */}
      <span className="relative z-10">{children}</span>

      {/* Glitch layers */}
      {hovering && (
        <>
          <span
            className="absolute inset-0 z-20 animate-glitch-1"
            style={{
              color: "hsl(var(--neon-primary))",
              clipPath: "polygon(0 0, 100% 0, 100% 35%, 0 35%)",
            }}
            aria-hidden
          >
            {children}
          </span>
          <span
            className="absolute inset-0 z-20 animate-glitch-2"
            style={{
              color: "hsl(var(--neon-secondary))",
              clipPath: "polygon(0 65%, 100% 65%, 100% 100%, 0 100%)",
            }}
            aria-hidden
          >
            {children}
          </span>
          <span
            className="absolute inset-0 z-20 animate-glitch-3"
            style={{
              color: "hsl(var(--neon-accent))",
              clipPath: "polygon(0 35%, 100% 35%, 100% 65%, 0 65%)",
            }}
            aria-hidden
          >
            {children}
          </span>
        </>
      )}
    </span>
  );
};

export default GlitchText;
