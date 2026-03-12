import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ExternalLink, Github, X, Eye, Lock, ChevronLeft, ChevronRight } from "lucide-react";
import PageTransition from "@/components/PageTransition";
import Parallax from "@/components/Parallax";
import { useTheme } from "@/contexts/ThemeContext";
import { projects } from "@/data/portfolio";
import TiltCard from "@/components/TiltCard";

const PROJECTS_PER_PAGE = 3;

const Projects = () => {
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const { isPony } = useTheme();

  const totalPages = Math.ceil(projects.length / PROJECTS_PER_PAGE);
  const startIdx = (currentPage - 1) * PROJECTS_PER_PAGE;
  const currentProjects = projects.slice(startIdx, startIdx + PROJECTS_PER_PAGE);

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
              >
                <p className="font-mono text-xs text-secondary mb-3 tracking-wider">
                  {isPony ? "🎨 My Work" : "> PROJECTS.LIST"}
                </p>
                <h1 className="text-4xl md:text-6xl font-bold mb-4 tracking-wider">
                  <span className="text-primary text-glow">{isPony ? "Featured " : "FEATURED "}</span>
                  <span className="text-foreground">{isPony ? "Projects ✨" : "PROJECTS"}</span>
                </h1>
                <p className="text-muted-foreground text-lg max-w-2xl font-body">
                  A selection of projects I've built. Each one represents a unique challenge.
                </p>
              </motion.div>
            </Parallax>

            <div className="mt-16 space-y-12">
              {currentProjects.map((project, i) => (
                <TiltCard key={project.title}>
                  <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.1 * i }}
                    className={`group grid md:grid-cols-2 gap-0 overflow-hidden transition-all duration-500 ${isPony ? "bg-card rounded-2xl border-2 border-primary/20 shadow-lg hover:shadow-xl" : "cyber-border bg-card/50 hover:bg-card/80 box-glow"}`}
                  >
                  <div
                    className="relative aspect-video md:aspect-auto overflow-hidden cursor-pointer"
                    onClick={() => setPreviewImage(project.image)}
                  >
                    <img
                      src={project.image}
                      alt={project.title}
                      loading="lazy"
                      decoding="async"
                      className={`w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 ${isPony ? "" : "grayscale group-hover:grayscale-0"}`}
                    />
                    {!isPony && <div className="absolute inset-0 bg-primary/10 group-hover:bg-transparent transition-colors duration-500" />}
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center">
                      <div className={`${isPony ? "bg-card/80 rounded-full" : "cyber-border-sm bg-background/80 backdrop-blur-sm"} p-3`}>
                        <Eye size={20} className="text-primary" />
                      </div>
                    </div>
                    {!isPony && (
                      <div className="absolute top-3 left-3 font-mono text-[10px] text-secondary tracking-wider bg-background/70 px-2 py-1">
                        PRJ.0{startIdx + i + 1}
                      </div>
                    )}
                    {project.underNDA && (
                      <div className={`absolute top-3 right-3 flex items-center gap-1 font-mono text-[10px] tracking-wider px-2 py-1 ${isPony ? "bg-destructive/80 text-destructive-foreground rounded-full" : "bg-destructive/80 text-destructive-foreground"}`}>
                        <Lock size={10} />
                        NDA
                      </div>
                    )}
                  </div>

                  <div className="p-6 md:p-8 flex flex-col justify-center">
                    <div className="flex items-center gap-2 mb-2">
                      <p className="font-mono text-[10px] text-secondary tracking-wider">
                        {isPony ? `Project ${startIdx + i + 1}` : `PROJECT_${String(startIdx + i + 1).padStart(2, '0')}`}
                      </p>
                      {project.underNDA && (
                        <span className={`inline-flex items-center gap-1 font-mono text-[10px] px-2 py-0.5 text-destructive border border-destructive/30 tracking-wider ${isPony ? "rounded-full bg-destructive/10" : "bg-destructive/10"}`}>
                          <Lock size={8} />
                          UNDER NDA
                        </span>
                      )}
                    </div>
                    <h3 className={`text-xl md:text-2xl font-bold text-foreground mb-4 group-hover:text-primary transition-colors duration-300 ${isPony ? "" : "tracking-wider"}`}>
                      {isPony ? project.title : project.title.toUpperCase()}
                    </h3>
                    <p className="text-muted-foreground leading-relaxed mb-6 font-body">{project.description}</p>
                    <div className="flex flex-wrap gap-2 mb-6">
                      {project.tech.map((t) => (
                        <span key={t} className={`font-mono text-[10px] px-3 py-1 text-primary border border-primary/20 tracking-wider ${isPony ? "rounded-full bg-primary/10" : "bg-primary/10"}`}>
                          {t}
                        </span>
                      ))}
                    </div>
                    <div className="flex items-center gap-4">
                      {project.underNDA ? (
                        <span className="inline-flex items-center gap-2 font-mono text-[10px] text-muted-foreground/50 tracking-wider cursor-not-allowed" title="Source code is under NDA">
                          <Lock size={14} /> {isPony ? "Code (NDA)" : "CODE [RESTRICTED]"}
                        </span>
                      ) : (
                        <a href={project.github} className="inline-flex items-center gap-2 font-mono text-[10px] text-muted-foreground hover:text-primary transition-colors tracking-wider">
                          <Github size={14} /> {isPony ? "Code" : "CODE"}
                        </a>
                      )}
                      <a href={project.live} className="inline-flex items-center gap-2 font-mono text-[10px] text-muted-foreground hover:text-secondary transition-colors tracking-wider">
                        <ExternalLink size={14} /> {isPony ? "Live" : "LIVE"}
                      </a>
                      <button onClick={() => setPreviewImage(project.image)} aria-label={`Preview ${project.title}`} className="inline-flex items-center gap-2 font-mono text-[10px] text-muted-foreground hover:text-primary transition-colors tracking-wider">
                        <Eye size={14} /> {isPony ? "Preview" : "PREVIEW"}
                      </button>
                    </div>
                  </div>
                  </motion.div>
                </TiltCard>
              ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="mt-16 flex items-center justify-center gap-3"
              >
                <button
                  onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                  disabled={currentPage === 1}
                  className={`inline-flex items-center gap-1 font-mono text-xs px-4 py-2 transition-colors tracking-wider disabled:opacity-30 disabled:cursor-not-allowed ${isPony ? "bg-card border-2 border-primary/20 rounded-full text-primary hover:bg-primary/10" : "cyber-border text-primary hover:bg-primary/10"}`}
                >
                  <ChevronLeft size={14} />
                  {isPony ? "Prev" : "PREV"}
                </button>

                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                  <button
                    key={page}
                    onClick={() => setCurrentPage(page)}
                    className={`font-mono text-xs w-10 h-10 transition-colors tracking-wider ${
                      page === currentPage
                        ? isPony
                          ? "bg-primary text-primary-foreground rounded-full"
                          : "bg-primary text-primary-foreground"
                        : isPony
                          ? "bg-card border-2 border-primary/20 rounded-full text-muted-foreground hover:text-primary"
                          : "cyber-border text-muted-foreground hover:text-primary"
                    }`}
                  >
                    {String(page).padStart(2, "0")}
                  </button>
                ))}

                <button
                  onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                  disabled={currentPage === totalPages}
                  className={`inline-flex items-center gap-1 font-mono text-xs px-4 py-2 transition-colors tracking-wider disabled:opacity-30 disabled:cursor-not-allowed ${isPony ? "bg-card border-2 border-primary/20 rounded-full text-primary hover:bg-primary/10" : "cyber-border text-primary hover:bg-primary/10"}`}
                >
                  {isPony ? "Next" : "NEXT"}
                  <ChevronRight size={14} />
                </button>
              </motion.div>
            )}
          </div>
        </section>
      </div>

      <AnimatePresence>
        {previewImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className={`fixed inset-0 z-[60] bg-background/95 backdrop-blur-xl flex items-center justify-center p-6 ${isPony ? "" : "scanlines"}`}
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
              <button onClick={() => setPreviewImage(null)} aria-label="Close preview" className="absolute -top-12 right-0 text-muted-foreground hover:text-secondary transition-colors">
                <X size={24} />
              </button>
              <div className={`overflow-hidden ${isPony ? "rounded-2xl border-2 border-primary/20 shadow-2xl" : "cyber-border box-glow"}`}>
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
