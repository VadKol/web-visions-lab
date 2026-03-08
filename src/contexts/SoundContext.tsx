import { createContext, useContext, useState, useCallback, ReactNode, useEffect } from "react";

interface SoundContextType {
  muted: boolean;
  toggleMute: () => void;
  playClick: () => void;
  playHover: () => void;
  playTransition: () => void;
}

const SoundContext = createContext<SoundContextType>({
  muted: true,
  toggleMute: () => {},
  playClick: () => {},
  playHover: () => {},
  playTransition: () => {},
});

export const useSound = () => useContext(SoundContext);

// Generate simple synth sounds using Web Audio API
const createAudioCtx = () => {
  try {
    return new (window.AudioContext || (window as any).webkitAudioContext)();
  } catch {
    return null;
  }
};

let audioCtx: AudioContext | null = null;

const playTone = (freq: number, duration: number, volume: number = 0.08, type: OscillatorType = "sine") => {
  if (!audioCtx) audioCtx = createAudioCtx();
  if (!audioCtx) return;

  const osc = audioCtx.createOscillator();
  const gain = audioCtx.createGain();
  osc.type = type;
  osc.frequency.value = freq;
  gain.gain.setValueAtTime(volume, audioCtx.currentTime);
  gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + duration);
  osc.connect(gain);
  gain.connect(audioCtx.destination);
  osc.start();
  osc.stop(audioCtx.currentTime + duration);
};

export const SoundProvider = ({ children }: { children: ReactNode }) => {
  const [muted, setMuted] = useState(() => {
    try {
      return localStorage.getItem("vk-sound-muted") !== "false";
    } catch {
      return true;
    }
  });

  const toggleMute = useCallback(() => {
    setMuted((m) => {
      const next = !m;
      try { localStorage.setItem("vk-sound-muted", String(next)); } catch {}
      // Play a test tone when unmuting
      if (!next) {
        playTone(800, 0.1, 0.05, "sine");
        setTimeout(() => playTone(1200, 0.1, 0.05, "sine"), 60);
      }
      return next;
    });
  }, []);

  const playClick = useCallback(() => {
    if (muted) return;
    playTone(600, 0.08, 0.06, "square");
    setTimeout(() => playTone(900, 0.06, 0.04, "square"), 30);
  }, [muted]);

  const playHover = useCallback(() => {
    if (muted) return;
    playTone(1200, 0.05, 0.03, "sine");
  }, [muted]);

  const playTransition = useCallback(() => {
    if (muted) return;
    playTone(400, 0.15, 0.05, "sine");
    setTimeout(() => playTone(600, 0.12, 0.04, "sine"), 60);
    setTimeout(() => playTone(800, 0.1, 0.03, "sine"), 120);
  }, [muted]);

  return (
    <SoundContext.Provider value={{ muted, toggleMute, playClick, playHover, playTransition }}>
      {children}
    </SoundContext.Provider>
  );
};
