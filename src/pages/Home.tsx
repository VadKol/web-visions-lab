import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import PageTransition from "@/components/PageTransition";
import Parallax from "@/components/Parallax";
import CyberRain from "@/components/CyberRain";
import ThemedAvatar from "@/components/ThemedAvatar";
import GlitchText from "@/components/GlitchText";
import TerminalTyping from "@/components/TerminalTyping";
import { useTheme } from "@/contexts/ThemeContext";
import { personal, bio, services } from "@/data/portfolio";
import heroBg from "@/assets/hero-bg.jpg";
import heroBgPony from "@/assets/hero-bg-pony.jpg";

const Home = () => {
  const heroRef = useRef(null);
  const { isPony } = useTheme();
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const bgY = useTransform(scrollYProgress, [0, 1], [0, 150]);
  const textY = useTransform(scrollYProgress, [0, 1], [0, -50]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <PageTransition>
      <section ref={heroRef} className="relative min-h-screen flex items-center overflow-hidden">
        <motion.div style={{ y: bgY }} className={`absolute inset-0 ${isPony ? "opacity-60" : "opacity-30"}`}>
          <img src={isPony ? heroBgPony : heroBg} alt="" className="w-full h-full object-cover" />
        </motion.div>
        <div className={`absolute inset-0 ${isPony ? "bg-gradient-to-b from-background/20 via-background/50 to-background" : "bg-gradient-to-b from-background/40 via-background/70 to-background"}`} />
        {!isPony && <div className="absolute inset-0 scanlines pointer-events-none" />}
        <CyberRain />

        <motion.div
          style={{ y: textY, opacity }}
          className="container relative z-10 mx-auto px-6 py-32"
        >
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex items-center gap-4 mb-8"
          >
            <ThemedAvatar size="sm" />
            <div>
              <p className="font-mono text-xs text-secondary tracking-wider">
                {isPony ? "✨ Hello World! ✨" : "> SYSTEM.IDENTIFY"}
              </p>
              <p className="font-mono text-sm text-primary">{isPony ? personal.rolePony : personal.role}</p>
            </div>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className={`text-5xl md:text-7xl lg:text-8xl font-bold mb-2 tracking-wider ${isPony ? "text-primary" : "text-primary text-glow"}`}
          >
            <GlitchText>{isPony ? "Vadym ✨" : "VADYM"}</GlitchText>
          </motion.h1>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className={`text-5xl md:text-7xl lg:text-8xl font-bold mb-8 tracking-wider ${isPony ? "text-secondary" : "text-secondary text-glow-secondary"}`}
          >
            <GlitchText>{isPony ? "Kolomiiets 🦄" : "KOLOMIIETS"}</GlitchText>
          </motion.h1>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.7 }}
            className="max-w-xl mb-12"
          >
            <div className={`${isPony ? "bg-card/80 rounded-2xl border-2 border-primary/20" : "cyber-border bg-card/50 backdrop-blur-sm"} p-5`}>
              <p className="font-mono text-xs text-secondary mb-2 tracking-wider">
                {isPony ? "💖 About me" : "> PROFILE.DESC"}
              </p>
              <p className="text-muted-foreground text-base leading-relaxed font-body">
                {bio.summary}
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.9 }}
            className="flex flex-wrap gap-4"
          >
            <Link
              to="/projects"
              className={`inline-flex items-center gap-2 font-mono text-xs tracking-wider ${isPony ? "bg-primary text-primary-foreground rounded-full px-8 py-3 hover:opacity-90" : "cyber-border bg-primary/10 text-primary px-8 py-3 hover:bg-primary/20 box-glow"} transition-all`}
            >
              {isPony ? "My Projects 💫" : "VIEW_PROJECTS"} <ArrowRight size={14} />
            </Link>
            <Link
              to="/contact"
              className={`inline-flex items-center gap-2 font-mono text-xs tracking-wider ${isPony ? "bg-secondary text-secondary-foreground rounded-full px-8 py-3 hover:opacity-90" : "cyber-border bg-secondary/10 text-secondary px-8 py-3 hover:bg-secondary/20 box-glow-secondary"} transition-all`}
            >
              {isPony ? "Say Hi! 👋" : "JACK_IN"}
            </Link>
          </motion.div>
        </motion.div>

        {/* Terminal card */}
        <Parallax speed={-0.3} className="hidden lg:block absolute right-12 xl:right-24 top-1/2 -translate-y-1/2 w-[420px]">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 1.2 }}
          >
            <div className={`${isPony ? "rounded-2xl border-2 border-primary/20 shadow-xl bg-card/90" : "cyber-border bg-card/80"} backdrop-blur-sm overflow-hidden box-glow`}>
              <div className={`flex items-center gap-2 px-4 py-3 border-b ${isPony ? "border-primary/20" : "border-primary/20"}`}>
                <div className={`w-2.5 h-2.5 ${isPony ? "rounded-full bg-pink-400" : "bg-destructive"}`} />
                <div className={`w-2.5 h-2.5 ${isPony ? "rounded-full bg-yellow-300" : "bg-neon-accent"}`} />
                <div className={`w-2.5 h-2.5 ${isPony ? "rounded-full bg-green-400" : "bg-primary"}`} />
                <span className="ml-2 font-mono text-[10px] text-muted-foreground tracking-wider">
                  {isPony ? "✨ pony.js" : "TERMINAL://VK"}
                </span>
              </div>
              <TerminalTyping />
            </div>
          </motion.div>
        </Parallax>
      </section>

      {/* Services */}
      <section className="py-24 relative">
        {!isPony && <div className="absolute inset-0 scanlines pointer-events-none opacity-30" />}
        <div className="container mx-auto px-6 relative z-10">
          <Parallax speed={-0.15}>
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6 }}
              className="text-center mb-16"
            >
              <p className="font-mono text-xs text-secondary mb-3 tracking-wider">
                {isPony ? "✨ What I do" : "> SERVICES.LIST"}
              </p>
              <h2 className="text-3xl md:text-4xl font-bold tracking-wider">
                <span className="text-primary text-glow">{isPony ? "My " : "DIGITAL "}</span>
                <span className="text-foreground">{isPony ? "Superpowers 💪" : "ARSENAL"}</span>
              </h2>
            </motion.div>
          </Parallax>

          <div className="grid md:grid-cols-3 gap-6">
            {services.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 * i }}
                className={`${isPony ? "bg-card rounded-2xl border-2 border-primary/20 shadow-lg" : "cyber-border bg-card/50 box-glow"} p-8 hover:bg-card/80 transition-all duration-500 group`}
              >
                {!isPony && <h3 className="font-mono text-xs text-secondary tracking-wider mb-1">MODULE.0{i + 1}</h3>}
                <h4 className={`${isPony ? "text-base font-semibold" : "font-display text-sm tracking-wider"} text-primary mb-3`}>{isPony ? item.titlePony : item.titleCyber}</h4>
                <p className="text-muted-foreground text-sm leading-relaxed font-body">{item.desc}</p>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            className="text-center mt-12"
          >
            <Link
              to="/about"
              className="inline-flex items-center gap-2 font-mono text-xs text-primary hover:text-secondary transition-colors tracking-wider"
            >
              {isPony ? "More about me 💖" : "LEARN_MORE"} <ArrowRight size={12} />
            </Link>
          </motion.div>
        </div>
      </section>
    </PageTransition>
  );
};

export default Home;
