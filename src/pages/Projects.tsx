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
        <section className="py-16 md:py-24">
          <div className="container mx-auto px-6">
            <Parallax speed={-0.1}>
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                <p className="font-mono text-primary text-sm mb-4">My Work</p>
                <h1 className="text-4xl md:text-6xl font-bold mb-4">
                  Featured <span className="text-primary">Projects</span>
                </h1>
                <p className="text-muted-foreground text-lg max-w-2xl">
                  A selection of projects I've built. Each one represents a unique challenge
                  and a chance to learn something new.
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
                  className="group grid md:grid-cols-2 gap-6 bg-card border border-border rounded-xl overflow-hidden hover:border-primary/40 transition-all duration-500 border-glow"
                >
                  {/* Preview image */}
                  <div
                    className="relative aspect-video md:aspect-auto overflow-hidden cursor-pointer"
                    onClick={() => setPreviewImage(project.image)}
                  >
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-primary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center">
                      <div className="bg-background/80 backdrop-blur-sm rounded-full p-3">
                        <Eye size={24} className="text-primary" />
                      </div>
                    </div>
                  </div>

                  {/* Project details */}
                  <div className="p-6 md:p-8 flex flex-col justify-center">
                    <p className="font-mono text-primary text-xs mb-2">Project {String(i + 1).padStart(2, '0')}</p>
                    <h3 className="text-2xl md:text-3xl font-bold text-foreground mb-4 group-hover:text-primary transition-colors duration-300">
                      {project.title}
                    </h3>
                    <p className="text-muted-foreground leading-relaxed mb-6">
                      {project.description}
                    </p>
                    <div className="flex flex-wrap gap-2 mb-6">
                      {project.tech.map((t) => (
                        <span
                          key={t}
                          className="font-mono text-xs px-3 py-1 rounded-full bg-primary/10 text-primary border border-primary/20"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                    <div className="flex items-center gap-4">
                      <a
                        href={project.github}
                        className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"
                      >
                        <Github size={18} /> Code
                      </a>
                      <a
                        href={project.live}
                        className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"
                      >
                        <ExternalLink size={18} /> Live Demo
                      </a>
                      <button
                        onClick={() => setPreviewImage(project.image)}
                        className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"
                      >
                        <Eye size={18} /> Preview
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
            className="fixed inset-0 z-[60] bg-background/90 backdrop-blur-xl flex items-center justify-center p-6"
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
                className="absolute -top-12 right-0 text-muted-foreground hover:text-primary transition-colors"
              >
                <X size={24} />
              </button>
              <div className="rounded-xl overflow-hidden border border-border box-glow">
                <img
                  src={previewImage}
                  alt="Project preview"
                  className="w-full h-auto"
                />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </PageTransition>
  );
};

export default Projects;
