import { useState } from "react";
import { motion } from "framer-motion";
import { Gamepad2, Keyboard, Trophy } from "lucide-react";
import PageTransition from "@/components/PageTransition";
import Parallax from "@/components/Parallax";
import { useTheme } from "@/contexts/ThemeContext";
import TypingGame from "@/components/TypingGame";

const games = [
  {
    id: "typing",
    title: "Typing Speed Test",
    description: "Test your coding speed with real code snippets",
    icon: Keyboard,
    color: "primary",
  },
];

const Minigames = () => {
  const { isPony } = useTheme();
  const [typingGameOpen, setTypingGameOpen] = useState(false);

  const handleGameClick = (gameId: string) => {
    if (gameId === "typing") {
      setTypingGameOpen(true);
    }
  };

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

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-4xl mx-auto">
              {games.map((game, i) => (
                <motion.button
                  key={game.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.2 + i * 0.1 }}
                  onClick={() => handleGameClick(game.id)}
                  className={`group p-6 text-left transition-all ${
                    isPony
                      ? "bg-card rounded-2xl border-2 border-primary/20 hover:border-primary/50 hover:shadow-lg"
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
                    {isPony ? game.title : game.title.toUpperCase()}
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

              {/* Coming Soon Cards */}
              {["Snake", "Memory Cards"].map((name, i) => (
                <motion.div
                  key={name}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.4 + i * 0.1 }}
                  className={`p-6 opacity-50 ${
                    isPony
                      ? "bg-card/50 rounded-2xl border-2 border-dashed border-muted-foreground/20"
                      : "cyber-border bg-card/30 border-dashed"
                  }`}
                >
                  <div className={`w-14 h-14 flex items-center justify-center mb-4 ${
                    isPony 
                      ? "bg-muted/20 rounded-xl" 
                      : "cyber-border-sm bg-background/30"
                  }`}>
                    <Trophy size={28} className="text-muted-foreground" />
                  </div>
                  <h3 className="font-mono text-lg text-muted-foreground mb-2 tracking-wider">
                    {isPony ? name : name.toUpperCase()}
                  </h3>
                  <p className="text-muted-foreground/60 text-sm font-body">
                    Coming soon...
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </div>

      <TypingGame isOpen={typingGameOpen} onClose={() => setTypingGameOpen(false)} />
    </PageTransition>
  );
};

export default Minigames;
