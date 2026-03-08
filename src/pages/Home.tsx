import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import PageTransition from "@/components/PageTransition";
import Parallax from "@/components/Parallax";
import heroBg from "@/assets/hero-bg.jpg";
import avatar from "@/assets/avatar.jpg";

const Home = () => {
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const bgY = useTransform(scrollYProgress, [0, 1], [0, 150]);
  const textY = useTransform(scrollYProgress, [0, 1], [0, -50]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <PageTransition>
      {/* Hero */}
      <section ref={heroRef} className="relative min-h-screen flex items-center overflow-hidden">
        <motion.div style={{ y: bgY }} className="absolute inset-0 opacity-30">
          <img src={heroBg} alt="" className="w-full h-full object-cover" />
        </motion.div>
        <div className="absolute inset-0 bg-gradient-to-b from-background/40 via-background/70 to-background" />
        <div className="absolute inset-0 scanlines pointer-events-none" />

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
            <div className="w-14 h-14 rounded-sm overflow-hidden border border-neon-cyan/40 box-glow-cyan">
              <img src={avatar} alt="Vadym Kolomiiets" className="w-full h-full object-cover" />
            </div>
            <div>
              <p className="font-mono text-xs text-neon-magenta tracking-wider">SYSTEM.IDENTIFY</p>
              <p className="font-mono text-sm text-primary">Frontend Developer</p>
            </div>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-5xl md:text-7xl lg:text-8xl font-display font-bold text-foreground mb-2 tracking-wider"
          >
            <span className="text-primary text-glow-cyan">VADYM</span>
          </motion.h1>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="text-5xl md:text-7xl lg:text-8xl font-display font-bold text-neon-magenta text-glow-magenta mb-8 tracking-wider"
          >
            KOLOMIIETS
          </motion.h1>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.7 }}
            className="max-w-xl mb-12"
          >
            <div className="cyber-border bg-card/50 backdrop-blur-sm p-5">
              <p className="font-mono text-xs text-neon-magenta mb-2 tracking-wider">{'>'} PROFILE.DESC</p>
              <p className="text-muted-foreground text-base leading-relaxed font-body">
                Frontend developer with 5+ years of experience. Building interactive,
                performant web applications with React, TypeScript, and cutting-edge technologies.
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
              className="inline-flex items-center gap-2 font-mono text-xs tracking-wider cyber-border bg-neon-cyan/10 text-primary px-8 py-3 hover:bg-neon-cyan/20 transition-all box-glow-cyan"
            >
              VIEW_PROJECTS <ArrowRight size={14} />
            </Link>
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 font-mono text-xs tracking-wider cyber-border bg-neon-magenta/10 text-secondary px-8 py-3 hover:bg-neon-magenta/20 transition-all box-glow-magenta"
            >
              JACK_IN
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
            <div className="cyber-border bg-card/80 backdrop-blur-sm overflow-hidden box-glow-cyan">
              <div className="flex items-center gap-2 px-4 py-3 border-b border-neon-cyan/20">
                <div className="w-2.5 h-2.5 bg-destructive" />
                <div className="w-2.5 h-2.5 bg-neon-yellow" />
                <div className="w-2.5 h-2.5 bg-primary" />
                <span className="ml-2 font-mono text-[10px] text-muted-foreground tracking-wider">TERMINAL://VK</span>
              </div>
              <div className="p-5 font-mono text-sm leading-7 scanlines">
                <p><span className="text-neon-magenta">const</span> <span className="text-foreground">dev</span> = {"{"}</p>
                <p className="ml-4"><span className="text-muted-foreground">name:</span> <span className="text-primary">'Vadym Kolomiiets'</span>,</p>
                <p className="ml-4"><span className="text-muted-foreground">role:</span> <span className="text-neon-magenta">'Frontend Dev'</span>,</p>
                <p className="ml-4"><span className="text-muted-foreground">stack:</span> [<span className="text-primary">'React'</span>, <span className="text-neon-magenta">'TS'</span>],</p>
                <p className="ml-4"><span className="text-muted-foreground">status:</span> <span className="text-neon-yellow">ONLINE</span>,</p>
                <p>{"}"};</p>
                <p className="mt-2">
                  <span className="text-primary animate-pulse">█</span>
                </p>
              </div>
            </div>
          </motion.div>
        </Parallax>
      </section>

      {/* Services */}
      <section className="py-24 relative">
        <div className="absolute inset-0 scanlines pointer-events-none opacity-30" />
        <div className="container mx-auto px-6 relative z-10">
          <Parallax speed={-0.15}>
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6 }}
              className="text-center mb-16"
            >
              <p className="font-mono text-xs text-neon-magenta mb-3 tracking-wider">{'>'} SERVICES.LIST</p>
              <h2 className="text-3xl md:text-4xl font-display font-bold tracking-wider">
                <span className="text-primary text-glow-cyan">DIGITAL</span>{" "}
                <span className="text-foreground">ARSENAL</span>
              </h2>
            </motion.div>
          </Parallax>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              { title: "FRONTEND_DEV", desc: "Building responsive, accessible interfaces with React, TypeScript, and modern CSS architectures." },
              { title: "UI/UX_IMPL", desc: "Translating designs into pixel-perfect, interactive web experiences with smooth animations." },
              { title: "PERF_OPT", desc: "Ensuring blazing-fast load times, buttery animations, and optimal user experience." },
            ].map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 * i }}
                className="cyber-border bg-card/50 p-8 hover:bg-card/80 transition-all duration-500 box-glow-cyan group"
              >
                <h3 className="font-mono text-xs text-neon-magenta tracking-wider mb-1">MODULE.0{i + 1}</h3>
                <h4 className="font-display text-sm text-primary mb-3 tracking-wider group-hover:text-glow-cyan">{item.title}</h4>
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
              className="inline-flex items-center gap-2 font-mono text-xs text-primary hover:text-neon-magenta transition-colors tracking-wider"
            >
              LEARN_MORE <ArrowRight size={12} />
            </Link>
          </motion.div>
        </div>
      </section>
    </PageTransition>
  );
};

export default Home;
