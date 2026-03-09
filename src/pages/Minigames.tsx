import { useState } from "react";
import { motion } from "framer-motion";
import { Gamepad2, Keyboard, Brain, Blocks, MousePointer } from "lucide-react";
import PageTransition from "@/components/PageTransition";
import Parallax from "@/components/Parallax";
import { useTheme } from "@/contexts/ThemeContext";
import TypingGame from "@/components/TypingGame";
import SnakeGame from "@/components/SnakeGame";
import MemoryGame from "@/components/MemoryGame";
import TetrisGame from "@/components/TetrisGame";
import ClickSpeedGame from "@/components/ClickSpeedGame";

const games = [
  {
    id: "typing",
    title: "Typing Speed",
    titlePony: "Typing Test ⌨️",
    description: "Test your coding speed with real code snippets",
    icon: Keyboard,
  },
  {
    id: "snake",
    title: "Snake",
    titlePony: "Snake 🐍",
    description: "Classic snake game - eat, grow, don't crash!",
    icon: Gamepad2,
  },
  {
    id: "memory",
    title: "Memory Cards",
    titlePony: "Memory 🃏",
    description: "Find matching pairs and train your memory",
    icon: Brain,
  },
  {
    id: "tetris",
    title: "Tetris",
    titlePony: "Tetris 🧱",
    description: "Stack blocks and clear lines in this classic",
    icon: Blocks,
  },
  {
    id: "clickspeed",
    title: "Click Speed",
    titlePony: "Click Test 🎯",
    description: "How many clicks can you do in 10 seconds?",
    icon: MousePointer,
  },
];

const Minigames = () => {
  const { isPony } = useTheme();
  const [activeGame, setActiveGame] = useState<string | null>(null);

  return (
    <PageTransition>
      <div className="pt-24 pb-16">
        <section className="py-16 md:py-24 relative">
          {!isPony && <div className="absolute inset-0 scanlines pointer-events-none opacity-20" />}
          <div className="container mx-auto px-6 relative z-10">
            <Parallax speed={-0.1}>
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="text-center max-w-2xl mx-auto mb-16"
              >
                <p className="font-mono text-xs text-secondary mb-3 tracking-wider">
                  {isPony ? "🎮 Have fun!" : "> ARCADE.INIT"}
                </p>
                <h1 className="text-4xl md:text-6xl font-bold mb-6 tracking-wider">
                  <span className="text-primary text-glow">{isPony ? "Mini" : "MINI"}</span>
                  <span className="text-secondary text-glow-secondary">{isPony ? "games 🕹️" : "GAMES"}</span>
                </h1>
                <p className="text-muted-foreground text-lg leading-relaxed font-body">
                  Take a break and challenge yourself with these developer-themed games!
                </p>
              </motion.div>
            </Parallax>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
              {games.map((game, i) => (
                <motion.button
                  key={game.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.1 + i * 0.08 }}
                  onClick={() => setActiveGame(game.id)}
                  className={`group p-6 text-left transition-all ${
                    isPony
                      ? "bg-card rounded-2xl border-2 border-primary/20 hover:border-primary/50 hover:shadow-lg hover:shadow-primary/10"
                      : "cyber-border bg-card hover:box-glow"
                  }`}
                >
                  <div className={`w-14 h-14 flex items-center justify-center mb-4 ${
                    isPony 
                      ? "bg-primary/10 rounded-xl" 
                      : "cyber-border-sm bg-background/50"
                  }`}>
                    <game.icon size={28} className="text-primary" />
                  </div>
                  <h3 className="font-mono text-lg text-foreground mb-2 tracking-wider">
                    {isPony ? game.titlePony : game.title.toUpperCase()}
                  </h3>
                  <p className="text-muted-foreground text-sm font-body">
                    {game.description}
                  </p>
                  <div className="mt-4 flex items-center gap-2 text-primary font-mono text-xs tracking-wider opacity-0 group-hover:opacity-100 transition-opacity">
                    <Gamepad2 size={14} />
                    {isPony ? "Play now" : "LAUNCH"}
                  </div>
                </motion.button>
              ))}
            </div>
          </div>
        </section>
      </div>

      <TypingGame isOpen={activeGame === "typing"} onClose={() => setActiveGame(null)} />
      <SnakeGame isOpen={activeGame === "snake"} onClose={() => setActiveGame(null)} />
      <MemoryGame isOpen={activeGame === "memory"} onClose={() => setActiveGame(null)} />
      <TetrisGame isOpen={activeGame === "tetris"} onClose={() => setActiveGame(null)} />
      <ClickSpeedGame isOpen={activeGame === "clickspeed"} onClose={() => setActiveGame(null)} />
    </PageTransition>
  );
};

export default Minigames;