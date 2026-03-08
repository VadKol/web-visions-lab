import { motion } from "framer-motion";
import { useTheme } from "@/contexts/ThemeContext";
import avatarCyber from "@/assets/avatar-cyber.jpg";
import avatarMatrix from "@/assets/avatar-matrix.jpg";
import avatarInferno from "@/assets/avatar-inferno.jpg";
import avatarPony from "@/assets/avatar-pony.jpg";

interface ThemedAvatarProps {
  size?: "sm" | "md" | "lg";
  className?: string;
}

const sizeMap = {
  sm: "w-16 h-16",
  md: "w-48 h-48 md:w-56 md:h-56",
  lg: "w-64 h-64 md:w-72 md:h-72",
};

const ThemedAvatar = ({ size = "sm", className = "" }: ThemedAvatarProps) => {
  const { theme, isPony } = useTheme();

  const src = (() => {
    switch (theme) {
      case "green": return avatarMatrix;
      case "orange": return avatarInferno;
      case "pony": return avatarPony;
      default: return avatarCyber;
    }
  })();

  // Theme-specific border/glow colors via CSS vars
  const containerClass = isPony
    ? "rounded-full border-2 border-primary/40 shadow-xl"
    : "cyber-border-sm";

  const overlayColor = (() => {
    switch (theme) {
      case "green": return "bg-green-500/10";
      case "orange": return "bg-orange-500/10";
      case "pony": return "bg-transparent";
      default: return "bg-primary/10";
    }
  })();

  return (
    <motion.div
      className={`relative group ${className}`}
      whileHover={{ scale: isPony ? 1.05 : 1.02 }}
      transition={{ type: "spring", stiffness: 300 }}
    >
      {/* Animated glow ring */}
      {theme === "orange" && (
        <>
          {/* Main fire glow */}
          <motion.div
            className={`absolute z-0 ${size === "sm" ? "inset-[-16px]" : "inset-[-24px]"}`}
            style={{
              background: `radial-gradient(ellipse 80% 100% at 50% 100%, hsl(var(--neon-primary) / 0.9) 0%, hsl(var(--neon-secondary) / 0.6) 40%, transparent 70%)`,
              clipPath: "polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)",
              filter: "blur(6px)",
            }}
            animate={{ 
              scaleY: [1, 1.15, 0.95, 1.1, 1.05, 0.98, 1],
              scaleX: [1, 0.95, 1.05, 0.98, 1.02, 1],
              opacity: [0.8, 1, 0.7, 0.9, 1, 0.75, 0.8],
              y: [0, -3, 1, -2, 0]
            }}
            transition={{ 
              duration: 0.5,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
          {/* Inner flame flicker */}
          <motion.div
            className={`absolute z-0 ${size === "sm" ? "inset-[-10px]" : "inset-[-16px]"}`}
            style={{
              background: `radial-gradient(ellipse 60% 80% at 50% 100%, hsl(40 100% 60% / 0.8) 0%, hsl(var(--neon-primary) / 0.5) 50%, transparent 70%)`,
              clipPath: "polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)",
              filter: "blur(4px)",
            }}
            animate={{ 
              scaleY: [1.1, 0.9, 1.15, 0.95, 1.1],
              scaleX: [0.95, 1.05, 0.9, 1.1, 0.95],
              opacity: [0.6, 0.9, 0.5, 0.85, 0.6],
              y: [-2, 2, -1, 1, -2]
            }}
            transition={{ 
              duration: 0.35,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        </>
      )}

      {theme === "green" && (
        <motion.div
          className={`absolute inset-[-3px] z-0 ${size === "sm" ? "" : "inset-[-4px]"}`}
          style={{
            background: `linear-gradient(180deg, transparent 0%, hsl(var(--neon-primary) / 0.8) 50%, transparent 100%)`,
            clipPath: "polygon(0 0, calc(100% - 8px) 0, 100% 8px, 100% 100%, 8px 100%, 0 calc(100% - 8px))",
            filter: "blur(2px)",
          }}
          animate={{ y: ["-100%", "100%"] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
        />
      )}

      {!isPony && theme !== "orange" && theme !== "green" && (
        <motion.div
          className={`absolute inset-[-3px] z-0 ${size === "sm" ? "" : "inset-[-4px]"}`}
          style={{
            background: `conic-gradient(from 0deg, hsl(var(--neon-primary) / 0.6), hsl(var(--neon-secondary) / 0.6), hsl(var(--neon-primary) / 0.6))`,
            clipPath: "polygon(0 0, calc(100% - 8px) 0, 100% 8px, 100% 100%, 8px 100%, 0 calc(100% - 8px))",
            filter: "blur(3px)",
          }}
          animate={{ rotate: 360 }}
          transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
        />
      )}

      {isPony && (
        <motion.div
          className="absolute inset-[-4px] z-0 rounded-full"
          style={{
            background: `conic-gradient(from 0deg, hsl(var(--neon-primary) / 0.5), hsl(var(--neon-secondary) / 0.5), hsl(var(--neon-accent) / 0.5), hsl(var(--neon-primary) / 0.5))`,
            filter: "blur(4px)",
          }}
          animate={{ rotate: 360 }}
          transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
        />
      )}

      <div className={`${sizeMap[size]} overflow-hidden relative z-10 ${containerClass} box-glow`}>
        <img
          src={src}
          alt="Vadym Kolomiiets"
          className={`w-full h-full object-cover ${!isPony ? "grayscale group-hover:grayscale-0" : ""} transition-all duration-700`}
        />
        {!isPony && (
          <div className={`absolute inset-0 ${overlayColor} group-hover:bg-transparent transition-colors duration-500`} />
        )}
      </div>
    </motion.div>
  );
};

export default ThemedAvatar;
