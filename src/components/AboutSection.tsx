import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";

const AboutSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="about" className="py-24 md:py-32" ref={ref}>
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <h2 className="flex items-center gap-4 text-2xl md:text-3xl font-bold mb-12">
            <span className="font-mono text-primary text-lg">01.</span>
            Про мене
            <span className="h-px flex-1 bg-border max-w-xs" />
          </h2>

          <div className="grid md:grid-cols-5 gap-12">
            <div className="md:col-span-3 space-y-5 text-muted-foreground leading-relaxed">
              <p>
                Привіт! Мене звати Олександр, і мені подобається створювати речі, які живуть в інтернеті.
                Моя пристрасть до веб-розробки почалася ще у 2019 році, коли я вирішив спробувати створити
                свій перший сайт — і це повністю змінило моє розуміння технологій.
              </p>
              <p>
                Сьогодні я маю досвід роботи з різними компаніями: від стартапів до великих продуктових команд.
                Мій фокус — створення доступних, інклюзивних та продуктивних веб-додатків.
              </p>
              <p>
                Ось технології, з якими я працюю щодня:
              </p>
              <ul className="grid grid-cols-2 gap-2 font-mono text-sm">
                {["React / Next.js", "TypeScript", "Tailwind CSS", "Node.js", "GraphQL", "Framer Motion"].map((tech) => (
                  <li key={tech} className="flex items-center gap-2">
                    <span className="text-primary">▹</span> {tech}
                  </li>
                ))}
              </ul>
            </div>

            <div className="md:col-span-2 flex justify-center">
              <div className="relative group">
                <div className="w-64 h-64 md:w-72 md:h-72 rounded-lg bg-surface border-2 border-primary/30 overflow-hidden relative z-10 group-hover:border-primary transition-colors">
                  <div className="w-full h-full bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center">
                    <span className="font-mono text-6xl text-primary/60">OK</span>
                  </div>
                </div>
                <div className="absolute top-4 left-4 w-64 h-64 md:w-72 md:h-72 rounded-lg border-2 border-primary/40 -z-0 group-hover:top-3 group-hover:left-3 transition-all" />
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default AboutSection;
