import { motion } from "framer-motion";
import heroBg from "@/assets/hero-bg.jpg";

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      <div
        className="absolute inset-0 opacity-20"
        style={{ backgroundImage: `url(${heroBg})`, backgroundSize: "cover", backgroundPosition: "center" }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-background/50 via-background/80 to-background" />

      <div className="container relative z-10 mx-auto px-6 py-32">
        <motion.p
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="font-mono text-primary mb-6 text-sm md:text-base"
        >
          Привіт, мене звати
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="text-5xl md:text-7xl lg:text-8xl font-bold text-foreground mb-4"
        >
          Олександр Коваль
        </motion.h1>

        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.0 }}
          className="text-3xl md:text-5xl lg:text-6xl font-bold text-muted-foreground mb-8"
        >
          Створюю веб-досвід.
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 1.2 }}
          className="max-w-xl text-muted-foreground text-lg mb-12 leading-relaxed"
        >
          Frontend-розробник із 5+ роками досвіду. Спеціалізуюсь на створенні
          інтерактивних та продуктивних веб-додатків з використанням React, TypeScript та сучасних технологій.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 1.4 }}
          className="flex gap-4"
        >
          <a
            href="#projects"
            className="font-mono text-sm border-2 border-primary text-primary px-8 py-3 rounded hover:bg-primary/10 transition-all box-glow"
          >
            Мої проєкти
          </a>
          <a
            href="#contact"
            className="font-mono text-sm bg-primary text-primary-foreground px-8 py-3 rounded hover:bg-primary/90 transition-all font-semibold"
          >
            Контакт
          </a>
        </motion.div>
      </div>

      {/* Decorative terminal */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, delay: 1.6 }}
        className="hidden lg:block absolute right-12 xl:right-24 top-1/2 -translate-y-1/2 w-[420px]"
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
            <p className="ml-4"><span className="text-muted-foreground">name:</span> <span className="text-primary">'Олександр Коваль'</span>,</p>
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
    </section>
  );
};

export default HeroSection;
