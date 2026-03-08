import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { ExternalLink, Github } from "lucide-react";

const projects = [
  {
    title: "E-Commerce Platform",
    description: "Повноцінний інтернет-магазин з кошиком, оплатою та адмін-панеллю. Побудовано на Next.js та Stripe API.",
    tech: ["Next.js", "TypeScript", "Stripe", "PostgreSQL"],
    github: "#",
    live: "#",
  },
  {
    title: "Task Management App",
    description: "Канбан-дошка для управління завданнями з drag & drop, real-time оновленнями та командною співпрацею.",
    tech: ["React", "Socket.io", "Node.js", "MongoDB"],
    github: "#",
    live: "#",
  },
  {
    title: "Weather Dashboard",
    description: "Інтерактивний дашборд погоди з візуалізацією даних, геолокацією та 7-денним прогнозом.",
    tech: ["React", "D3.js", "OpenWeather API", "Tailwind"],
    github: "#",
    live: "#",
  },
];

const ProjectsSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="projects" className="py-24 md:py-32" ref={ref}>
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <h2 className="flex items-center gap-4 text-2xl md:text-3xl font-bold mb-12">
            <span className="font-mono text-primary text-lg">03.</span>
            Проєкти
            <span className="h-px flex-1 bg-border max-w-xs" />
          </h2>

          <div className="space-y-8">
            {projects.map((project, i) => (
              <motion.div
                key={project.title}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.15 * i }}
                className="group bg-card border border-border rounded-lg p-6 md:p-8 hover:border-primary/40 transition-all hover:bg-card/80 border-glow"
              >
                <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                  <div className="flex-1">
                    <p className="font-mono text-primary text-xs mb-2">Проєкт {i + 1}</p>
                    <h3 className="text-xl md:text-2xl font-bold text-foreground mb-3 group-hover:text-primary transition-colors">
                      {project.title}
                    </h3>
                    <p className="text-muted-foreground leading-relaxed mb-4">
                      {project.description}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {project.tech.map((t) => (
                        <span
                          key={t}
                          className="font-mono text-xs px-3 py-1 rounded-full bg-primary/10 text-primary border border-primary/20"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="flex items-center gap-4 text-muted-foreground">
                    <a href={project.github} className="hover:text-primary transition-colors">
                      <Github size={20} />
                    </a>
                    <a href={project.live} className="hover:text-primary transition-colors">
                      <ExternalLink size={20} />
                    </a>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ProjectsSection;
