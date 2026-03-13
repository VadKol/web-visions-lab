import { Volume2, VolumeX } from "lucide-react";
import { motion } from "framer-motion";
import { useSound } from "@/contexts/SoundContext";

const SoundToggle = () => {
  const { muted, toggleMute } = useSound();

  return (
    <motion.button
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      onClick={toggleMute}
      className="fixed bottom-6 left-20 z-50 w-10 h-10 cyber-border-sm bg-card/80 backdrop-blur-sm text-primary flex items-center justify-center hover:bg-primary/10 transition-colors box-glow"
      aria-label={muted ? "Unmute sounds" : "Mute sounds"}
    >
      {muted ? <VolumeX size={16} /> : <Volume2 size={16} />}
    </motion.button>
  );
};

export default SoundToggle;
