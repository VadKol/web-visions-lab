import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import PageTransition from "@/components/PageTransition";
import Parallax from "@/components/Parallax";
import heroBg from "@/assets/hero-bg.jpg";

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
        <motion.div
          style={{ y: bgY }}
          className="absolute inset-0 opacity-20"
        >
          <img src={heroBg} alt="" className="w-full h-full object-cover" />
        </motion.div>
        <div className="absolute inset-0 bg-gradient-to-b from-background/50 via-background/80 to-background" />

        <motion.div
          style={{ y: textY, opacity }}
          className="container relative z-10 mx-auto px-6 py-32"
        >
          <motion.p
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="font-mono text-primary mb-6 text-sm md:text-base"
          >
            Hi, my name is
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-5xl md:text-7xl lg:text-8xl font-bold text-foreground mb-4"
          >
            Vadym Kolomiiets
          </motion.h1>

          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="text-3xl md:text-5xl lg:text-6xl font-bold text-muted-foreground mb-8"
          >
            I build web experiences.
          </motion.h2>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="max-w-xl text-muted-foreground text-lg mb-12 leading-relaxed"
          >
            Frontend developer with 5+ years of experience, specializing in building interactive,
            performant web applications using React, TypeScript, and modern technologies.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 1.0 }}
            className="flex flex-wrap gap-4"
          >
            <Link
              to="/projects"
              className="inline-flex items-center gap-2 font-mono text-sm border-2 border-primary text-primary px-8 py-3 rounded hover:bg-primary/10 transition-all box-glow"
            >
              View My Work <ArrowRight size={16} />
            </Link>
            <Link
              to="/contact"
              className="font-mono text-sm bg-primary text-primary-foreground px-8 py-3 rounded hover:bg-primary/90 transition-all font-semibold"
            >
              Contact Me
            </Link>
          </motion.div>
        </motion.div>

        {/* Terminal card with parallax */}
        <Parallax speed={-0.3} className="hidden lg:block absolute right-12 xl:right-24 top-1/2 -translate-y-1/2 w-[420px]">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 1.2 }}
          >
            <div className="bg-surface border border-border rounded-lg overflow-hidden border-glow">
              <div className="flex items-center gap-2 px-4 py-3 border-b border-border">
                <div className="w-3 h-3 rounded-full bg-destructive/80" />
                <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                <div className="w-3 h-3 rounded-full bg-primary/80" />
                <span className="ml-2 font-mono text-xs text-muted-foreground">terminal</span>
              </div>
              <div className="p-5 font-mono text-sm leading-7">
                <p><span className="text-primary">const</span> <span className="text-foreground">developer</span> = {"{"}</p>
                <p className="ml-4"><span className="text-muted-foreground">name:</span> <span className="text-primary">'Vadym Kolomiiets'</span>,</p>
                <p className="ml-4"><span className="text-muted-foreground">role:</span> <span className="text-primary">'Frontend Developer'</span>,</p>
                <p className="ml-4"><span className="text-muted-foreground">skills:</span> [<span className="text-primary">'React'</span>, <span className="text-primary">'TypeScript'</span>],</p>
                <p className="ml-4"><span className="text-muted-foreground">available:</span> <span className="text-primary">true</span>,</p>
                <p>{"}"};</p>
                <p className="mt-2 text-muted-foreground">
                  <span className="text-primary animate-pulse">▊</span>
                </p>
              </div>
            </div>
          </motion.div>
        </Parallax>
      </section>

      {/* Quick skills section */}
      <section className="py-24 bg-surface/50">
        <div className="container mx-auto px-6">
          <Parallax speed={-0.15}>
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6 }}
              className="text-center mb-16"
            >
              <p className="font-mono text-primary text-sm mb-4">What I do</p>
              <h2 className="text-3xl md:text-4xl font-bold">Crafting Digital Experiences</h2>
            </motion.div>
          </Parallax>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              { title: "Frontend Development", desc: "Building responsive, accessible interfaces with React, TypeScript, and modern CSS." },
              { title: "UI/UX Implementation", desc: "Translating designs into pixel-perfect, interactive web experiences." },
              { title: "Performance Optimization", desc: "Ensuring fast load times, smooth animations, and optimal user experience." },
            ].map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 * i }}
                className="bg-card border border-border rounded-lg p-8 hover:border-primary/40 transition-all duration-500 border-glow group"
              >
                <h3 className="font-mono text-primary text-sm font-semibold mb-3">{`// ${item.title}`}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{item.desc}</p>
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
              className="inline-flex items-center gap-2 font-mono text-sm text-primary hover:underline"
            >
              Learn more about me <ArrowRight size={14} />
            </Link>
          </motion.div>
        </div>
      </section>
    </PageTransition>
  );
};

export default Home;
