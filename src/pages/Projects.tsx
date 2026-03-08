import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ExternalLink, Github, X, Eye } from "lucide-react";
import PageTransition from "@/components/PageTransition";
import Parallax from "@/components/Parallax";
import projectEcommerce from "@/assets/project-ecommerce.jpg";
import projectTaskapp from "@/assets/project-taskapp.jpg";
import projectWeather from "@/assets/project-weather.jpg";

const projects = [
  {
    title: "E-Commerce Platform",
    description: "Full-featured online store with cart, checkout, and admin panel. Built with Next.js and Stripe API for seamless payment processing.",
    tech: ["Next.js", "TypeScript", "Stripe", "PostgreSQL"],
    github: "#",
    live: "#",
    image: projectEcommerce,
  },
  {
    title: "Task Management App",
    description: "Kanban board for task management with drag & drop, real-time updates, and team collaboration features.",
    tech: ["React", "Socket.io", "Node.js", "MongoDB"],
    github: "#",
    live: "#",
    image: projectTaskapp,
  },
  {
    title: "Weather Dashboard",
    description: "Interactive weather dashboard with data visualization, geolocation, and 7-day forecast with beautiful charts.",
    tech: ["React", "D3.js", "OpenWeather API", "Tailwind"],
    github: "#",
    live: "#",
    image: projectWeather,
  },
];

const Projects = () => {
  const [previewImage, setPreviewImage] = useState<string | null>(null);

  return (
    <PageTransition>
      <div className="pt-24 pb-16">
        <section className="py-16 md:py-24 relative">
          <div className="absolute inset-0 scanlines pointer-events-none opacity-20" />
          <div className="container mx-auto px-6 relative z-10">
            <Parallax speed={-0.1}>
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                <p className="font-mono text-xs text-neon-magenta mb-3 tracking-wider">{'>'} PROJECTS.LIST</p>
                <h1 className="text-4xl md:text-6xl font-display font-bold mb-4 tracking-wider">
                  <span className="text-primary text-glow-cyan">FEATURED</span>{" "}
                  <span className="text-foreground">WORK</span>
                </h1>
                <p className="text-muted-foreground text-lg max-w-2xl font-body">
                  A selection of projects I've built. Each one represents a unique challenge
                  and a chance to push the boundaries of what's possible.
                </p>
              </motion.div>
            </Parallax>

            <div className="mt-16 space-y-12">
              {projects.map((project, i) => (
                <motion.div
                  key={project.title}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.1 * i }}
                  className="group grid md:grid-cols-2 gap-0 cyber-border bg-card/50 overflow-hidden hover:bg-card/80 transition-all duration-500 box-glow-cyan"
                >
                  {/* Preview image */}
                  <div
                    className="relative aspect-video md:aspect-auto overflow-hidden cursor-pointer"
                    onClick={() => setPreviewImage(project.image)}
                  >
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 grayscale group-hover:grayscale-0"
                    />
                    <div className="absolute inset-0 bg-neon-cyan/10 group-hover:bg-transparent transition-colors duration-500" />
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center">
                      <div className="cyber-border-sm bg-background/80 backdrop-blur-sm p-3">
                        <Eye size={20} className="text-primary" />
                      </div>
                    </div>
                    <div className="absolute top-3 left-3 font-mono text-[10px] text-neon-magenta tracking-wider bg-background/70 px-2 py-1">
                      PRJ.0{i + 1}
                    </div>
                  </div>

                  {/* Project details */}
                  <div className="p-6 md:p-8 flex flex-col justify-center">
                    <p className="font-mono text-[10px] text-neon-magenta tracking-wider mb-2">
                      PROJECT_{String(i + 1).padStart(2, '0')}
                    </p>
                    <h3 className="text-xl md:text-2xl font-display text-foreground mb-4 group-hover:text-primary transition-colors duration-300 tracking-wider">
                      {project.title.toUpperCase()}
                    </h3>
                    <p className="text-muted-foreground leading-relaxed mb-6 font-body">
                      {project.description}
                    </p>
                    <div className="flex flex-wrap gap-2 mb-6">
                      {project.tech.map((t) => (
                        <span
                          key={t}
                          className="font-mono text-[10px] px-3 py-1 bg-neon-cyan/10 text-primary border border-neon-cyan/20 tracking-wider"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                    <div className="flex items-center gap-4">
                      <a href={project.github} className="inline-flex items-center gap-2 font-mono text-[10px] text-muted-foreground hover:text-primary transition-colors tracking-wider">
                        <Github size={14} /> CODE
                      </a>
                      <a href={project.live} className="inline-flex items-center gap-2 font-mono text-[10px] text-muted-foreground hover:text-neon-magenta transition-colors tracking-wider">
                        <ExternalLink size={14} /> LIVE
                      </a>
                      <button onClick={() => setPreviewImage(project.image)} className="inline-flex items-center gap-2 font-mono text-[10px] text-muted-foreground hover:text-primary transition-colors tracking-wider">
                        <Eye size={14} /> PREVIEW
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </div>

      {/* Preview modal */}
      <AnimatePresence>
        {previewImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[60] bg-background/95 backdrop-blur-xl flex items-center justify-center p-6 scanlines"
            onClick={() => setPreviewImage(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="relative max-w-5xl w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setPreviewImage(null)}
                className="absolute -top-12 right-0 text-muted-foreground hover:text-neon-magenta transition-colors"
              >
                <X size={24} />
              </button>
              <div className="cyber-border overflow-hidden box-glow-cyan">
                <img src={previewImage} alt="Project preview" className="w-full h-auto" />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </PageTransition>
  );
};

export default Projects;
