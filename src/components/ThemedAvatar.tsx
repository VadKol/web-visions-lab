import { motion } from "framer-motion";
import { useState } from "react";
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
  const [isHovered, setIsHovered] = useState(false);

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
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      {/* Animated glow ring */}
      {theme === "orange" && (
        <>
          {/* Main fire glow */}
          <motion.div
            className={`absolute z-0 ${size === "sm" ? "inset-[-24px]" : "inset-[-36px]"} rounded-full`}
            style={{
              background: `radial-gradient(ellipse 100% 120% at 50% 80%, hsl(var(--neon-primary) / ${isHovered ? 1 : 0.9}) 0%, hsl(var(--neon-secondary) / ${isHovered ? 0.8 : 0.6}) 40%, transparent 70%)`,
              filter: isHovered ? "blur(12px)" : "blur(10px)",
            }}
            animate={{ 
              scaleY: isHovered ? [1.1, 1.3, 1.05, 1.25, 1.15, 1.08, 1.1] : [1, 1.15, 0.95, 1.1, 1.05, 0.98, 1],
              scaleX: isHovered ? [1.05, 1, 1.1, 1.02, 1.08, 1.05] : [1, 0.95, 1.05, 0.98, 1.02, 1],
              opacity: isHovered ? [0.95, 1, 0.9, 1, 0.95] : [0.8, 1, 0.7, 0.9, 1, 0.75, 0.8],
              y: isHovered ? [0, -8, 2, -5, 0] : [0, -4, 1, -3, 0]
            }}
            transition={{ 
              duration: isHovered ? 0.3 : 0.5,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
          {/* Inner flame flicker */}
          <motion.div
            className={`absolute z-0 ${size === "sm" ? "inset-[-16px]" : "inset-[-24px]"} rounded-full`}
            style={{
              background: `radial-gradient(ellipse 80% 100% at 50% 70%, hsl(40 100% ${isHovered ? '70%' : '60%'} / ${isHovered ? 1 : 0.8}) 0%, hsl(var(--neon-primary) / ${isHovered ? 0.7 : 0.5}) 50%, transparent 70%)`,
              filter: isHovered ? "blur(8px)" : "blur(6px)",
            }}
            animate={{ 
              scaleY: isHovered ? [1.2, 1, 1.3, 1.05, 1.2] : [1.1, 0.9, 1.15, 0.95, 1.1],
              scaleX: isHovered ? [1, 1.1, 0.95, 1.15, 1] : [0.95, 1.05, 0.9, 1.1, 0.95],
              opacity: isHovered ? [0.85, 1, 0.8, 1, 0.85] : [0.6, 0.9, 0.5, 0.85, 0.6],
              y: isHovered ? [-5, 4, -3, 3, -5] : [-3, 2, -2, 1, -3]
            }}
            transition={{ 
              duration: isHovered ? 0.2 : 0.35,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
          {/* Extra hot core on hover */}
          {isHovered && (
            <motion.div
              className={`absolute z-0 ${size === "sm" ? "inset-[-8px]" : "inset-[-12px]"} rounded-full`}
              style={{
                background: `radial-gradient(ellipse 60% 80% at 50% 60%, hsl(50 100% 80% / 0.9) 0%, hsl(40 100% 60% / 0.4) 60%, transparent 80%)`,
                filter: "blur(5px)",
              }}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ 
                opacity: [0.7, 1, 0.8, 1, 0.7],
                scaleY: [1.15, 0.95, 1.2, 1, 1.15],
                y: [-4, 3, -3, 2, -4]
              }}
              transition={{ 
                duration: 0.25,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
          )}
        </>
      )}

      {theme === "green" && (
        <>
          {/* Scanner line */}
          <motion.div
            className={`absolute ${size === "sm" ? "inset-[-6px]" : "inset-[-10px]"} z-0 rounded-sm overflow-hidden`}
          >
            <motion.div
              className="absolute inset-x-0 h-8"
              style={{
                background: `linear-gradient(180deg, transparent 0%, hsl(var(--neon-primary) / 0.6) 50%, transparent 100%)`,
                filter: "blur(3px)",
              }}
              animate={{ y: ["-100%", "200%"] }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            />
          </motion.div>
          {/* Matrix numbers */}
          {[...Array(8)].map((_, i) => (
            <motion.span
              key={i}
              className={`absolute z-0 font-mono text-[10px] text-primary/70`}
              style={{
                left: `${10 + (i % 4) * 25}%`,
                top: `${i < 4 ? -5 : 105}%`,
              }}
              animate={{
                y: i < 4 ? [0, 30, 0] : [0, -30, 0],
                opacity: [0, 0.8, 0],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                delay: i * 0.2,
                ease: "easeInOut",
              }}
            >
              {Math.random() > 0.5 ? "1" : "0"}
            </motion.span>
          ))}
          {/* Glow border */}
          <motion.div
            className={`absolute ${size === "sm" ? "inset-[-4px]" : "inset-[-6px]"} z-0 rounded-sm`}
            style={{
              border: "1px solid hsl(var(--neon-primary) / 0.4)",
              boxShadow: "0 0 10px hsl(var(--neon-primary) / 0.3), inset 0 0 10px hsl(var(--neon-primary) / 0.1)",
            }}
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        </>
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
