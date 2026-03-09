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
          {/* Flame tongues from all sides */}
          {[0, 45, 90, 135, 180, 225, 270, 315].map((rotation, i) => (
            <motion.div
              key={rotation}
              className={`absolute z-0 ${size === "sm" ? "inset-[-12px]" : "inset-[-20px]"}`}
              style={{
                background: `radial-gradient(ellipse 30% 80% at 50% 0%, hsl(var(--neon-primary) / ${isHovered ? 0.95 : 0.8}) 0%, hsl(var(--neon-secondary) / ${isHovered ? 0.6 : 0.4}) 50%, transparent 80%)`,
                filter: isHovered ? "blur(6px)" : "blur(5px)",
                transform: `rotate(${rotation}deg)`,
                transformOrigin: "center center",
              }}
              animate={{ 
                scaleY: isHovered 
                  ? [1.1 + (i % 3) * 0.1, 1.4, 1, 1.3, 1.1 + (i % 3) * 0.1] 
                  : [1 + (i % 3) * 0.05, 1.2, 0.9, 1.15, 1 + (i % 3) * 0.05],
                opacity: isHovered 
                  ? [0.8, 1, 0.7, 0.95, 0.8] 
                  : [0.6, 0.9, 0.5, 0.8, 0.6],
              }}
              transition={{ 
                duration: isHovered ? 0.25 + (i % 4) * 0.05 : 0.4 + (i % 4) * 0.08,
                repeat: Infinity,
                ease: "easeInOut",
                delay: i * 0.05,
              }}
            />
          ))}
          {/* Central glow */}
          <motion.div
            className={`absolute z-0 ${size === "sm" ? "inset-[-8px]" : "inset-[-14px]"} rounded-full`}
            style={{
              background: `radial-gradient(circle, hsl(40 100% ${isHovered ? '65%' : '55%'} / ${isHovered ? 0.9 : 0.7}) 0%, hsl(var(--neon-primary) / ${isHovered ? 0.5 : 0.3}) 50%, transparent 70%)`,
              filter: isHovered ? "blur(8px)" : "blur(6px)",
            }}
            animate={{ 
              scale: isHovered ? [1, 1.15, 0.95, 1.1, 1] : [1, 1.08, 0.95, 1.05, 1],
              opacity: isHovered ? [0.85, 1, 0.8, 1, 0.85] : [0.6, 0.8, 0.55, 0.75, 0.6],
            }}
            transition={{ 
              duration: isHovered ? 0.3 : 0.5,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
          {/* Extra hot core on hover */}
          {isHovered && (
            <motion.div
              className={`absolute z-0 ${size === "sm" ? "inset-[-2px]" : "inset-[-6px]"} rounded-full`}
              style={{
                background: `radial-gradient(circle, hsl(50 100% 85% / 0.95) 0%, hsl(40 100% 60% / 0.5) 50%, transparent 70%)`,
                filter: "blur(4px)",
              }}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ 
                opacity: [0.7, 1, 0.75, 1, 0.7],
                scale: [1, 1.1, 0.95, 1.08, 1],
              }}
              transition={{ 
                duration: 0.2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
          )}
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
