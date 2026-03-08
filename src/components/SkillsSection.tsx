import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const skills = [
  { category: "Frontend", items: ["React", "TypeScript", "Next.js", "Vue.js", "Tailwind CSS", "SCSS"] },
  { category: "Інструменти", items: ["Git", "Webpack", "Vite", "Docker", "Figma", "Storybook"] },
  { category: "Backend", items: ["Node.js", "Express", "GraphQL", "REST API", "PostgreSQL", "MongoDB"] },
  { category: "Інше", items: ["CI/CD", "Testing", "Agile", "Performance", "SEO", "A11y"] },
];

const SkillsSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="skills" className="py-24 md:py-32 bg-surface/50" ref={ref}>
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <h2 className="flex items-center gap-4 text-2xl md:text-3xl font-bold mb-12">
            <span className="font-mono text-primary text-lg">02.</span>
            Навички
            <span className="h-px flex-1 bg-border max-w-xs" />
          </h2>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {skills.map((group, i) => (
              <motion.div
                key={group.category}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.1 * i }}
                className="bg-card border border-border rounded-lg p-6 hover:border-primary/50 transition-colors border-glow"
              >
                <h3 className="font-mono text-primary text-sm font-semibold mb-4">
                  {`// ${group.category}`}
                </h3>
                <ul className="space-y-2">
                  {group.items.map((item) => (
                    <li key={item} className="text-muted-foreground text-sm flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-primary/60" />
                      {item}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default SkillsSection;
