import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Download, ExternalLink, FileText, X } from "lucide-react";
import PageTransition from "@/components/PageTransition";
import Parallax from "@/components/Parallax";
import ThemedAvatar from "@/components/ThemedAvatar";
import { useTheme } from "@/contexts/ThemeContext";

const RESUME_URL = "/Vadym_Kolomiiets_Resume_FE.pdf";

const skills = [
  { category: "FRONTEND", items: ["TypeScript / JavaScript", "React / Redux / RTK-query", "Next.js / Vue.js", "HTML5 / CSS3 / Sass / BEM", "Tailwind / Material UI / Bootstrap"] },
  { category: "BACKEND", items: ["Node.js / Express / Nest.js", "PostgreSQL / MySQL / Prisma", "REST API / GraphQL", "WebSockets / Axios", "Docker"] },
  { category: "TOOLS", items: ["Git / GitHub", "Webpack / Vite / NPM", "Figma", "VS Code / WebStorm", "Chrome DevTools / React DevTools"] },
  { category: "TESTING & OTHER", items: ["Cypress / Jest", "CI/CD Pipelines", "Agile / Jira / Trello", "OOP", "English B2 / Czech B2"] },
];

const About = () => {
  const { isPony } = useTheme();
  const [showResume, setShowResume] = useState(false);

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
                  {isPony ? "✨ Get to know me" : "> PROFILE.LOAD"}
                </p>
                <h1 className="text-4xl md:text-6xl font-bold mb-8 tracking-wider">
                  <span className="text-primary text-glow">{isPony ? "About " : "ABOUT "}</span>
                  <span className="text-foreground">{isPony ? "Me 💖" : "ME"}</span>
                </h1>
              </motion.div>
            </Parallax>

            <div className="grid md:grid-cols-5 gap-12 mt-12">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="md:col-span-3 space-y-5"
              >
                <div className={`${isPony ? "bg-card rounded-2xl border-2 border-primary/20 shadow-lg" : "cyber-border bg-card/50"} p-6`}>
                  <p className="font-mono text-xs text-secondary mb-3 tracking-wider">
                    {isPony ? "💬 My Story" : "> BIO.READ"}
                  </p>
                  <div className="space-y-4 text-muted-foreground leading-relaxed font-body text-base">
                    <p>
                      {isPony ? "Hey there! 👋" : "Hello!"} My name is <span className="text-primary">Vadym</span>, Frontend Developer
                      with solid experience in professional and freelance projects. Skilled in JavaScript, TypeScript,
                      React, Node.js, database management, and API integration.
                    </p>
                    <p>
                      I've worked at <span className="text-primary">Gamirare Inc.</span> building frontends with React & Next.js,
                      at <span className="text-primary">Mate Academy</span> as a Fullstack Developer & Mentor,
                      and as a <span className="text-primary">Freelance</span> developer delivering optimized web applications.
                    </p>
                    <p>
                      I hold a Master's Degree in Computer Sciences from Kyiv National Economic University.
                      Currently based in <span className="text-primary">Pardubice, Czech Republic</span> — open to remote work and relocation.
                    </p>
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="md:col-span-2 flex justify-center"
              >
                <ThemedAvatar size="lg" />
              </motion.div>
            </div>
          </div>
        </section>

        {/* Skills */}
        <section className="py-16 relative">
          <div className="absolute inset-0 bg-surface/30" />
          <div className="container mx-auto px-6 relative z-10">
            <Parallax speed={-0.1}>
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <p className="font-mono text-xs text-secondary mb-3 tracking-wider">
                  {isPony ? "🛠️ My toolkit" : "> SKILLS.SCAN"}
                </p>
                <h2 className="text-3xl md:text-4xl font-bold mb-12 tracking-wider">
                  <span className="text-primary text-glow">{isPony ? "Tech " : "TECH "}</span>
                  <span className="text-foreground">{isPony ? "Stack 🔧" : "STACK"}</span>
                </h2>
              </motion.div>
            </Parallax>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {skills.map((group, i) => (
                <motion.div
                  key={group.category}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.1 * i }}
                  className={`${isPony ? "bg-card rounded-2xl border-2 border-primary/20 shadow-lg" : "cyber-border bg-card/50 box-glow"} p-6 hover:bg-card/80 transition-all duration-500`}
                >
                  {!isPony && <h3 className="font-mono text-xs text-secondary tracking-wider mb-1">MODULE.0{i + 1}</h3>}
                  <h4 className={`${isPony ? "text-sm font-semibold" : "font-display text-xs tracking-wider"} text-primary mb-4`}>
                    {isPony ? group.category.charAt(0) + group.category.slice(1).toLowerCase() : group.category}
                  </h4>
                  <ul className="space-y-2">
                    {group.items.map((item) => (
                      <li key={item} className="text-muted-foreground text-sm flex items-center gap-2 font-body">
                        <span className={`w-1 h-1 ${isPony ? "rounded-full" : ""} bg-primary`} />
                        {item}
                      </li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Experience */}
        <section className="py-16">
          <div className="container mx-auto px-6">
            <Parallax speed={-0.1}>
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <p className="font-mono text-xs text-secondary mb-3 tracking-wider">
                  {isPony ? "📋 Experience" : "> EXP.LOG"}
                </p>
                <h2 className="text-3xl md:text-4xl font-bold mb-12 tracking-wider">
                  <span className="text-primary text-glow">{isPony ? "Work " : "WORK "}</span>
                  <span className="text-foreground">{isPony ? "History 💼" : "HISTORY"}</span>
                </h2>
              </motion.div>
            </Parallax>

            <div className="space-y-8 max-w-3xl">
              {[
                { role: "Frontend / Full-Stack Developer", company: "Freelance", period: "2024 — 2026", desc: "Developed web applications using JavaScript, React, and Node.js. Optimized app functionality, reducing load times by 20–30%. Implemented automated testing, reducing bugs by 40%." },
                { role: "Fullstack Developer / Mentor", company: "Mate Academy", period: "2023 — 2024", desc: "Developed web apps with React & Node.js, implemented CRUD and API integrations. Mentored junior developers. Optimized load times by 20–30%." },
                { role: "Fullstack Developer", company: "Gamirare Inc.", period: "2022 — 2023", desc: "Built frontend with React & Next.js, backend with Node.js. Worked with MySQL & PostgreSQL. Integrated REST/GraphQL APIs. Optimized DB performance, reducing page loads by 30%. Implemented OAuth2 authentication." },
              ].map((job, i) => (
                <motion.div
                  key={job.company}
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.1 * i }}
                  className={`relative pl-8 border-l-2 ${isPony ? "border-primary/30 hover:border-primary/60" : "border-primary/20 hover:border-primary/50"} transition-colors duration-500`}
                >
                  <div className={`absolute -left-[5px] top-1 w-2 h-2 ${isPony ? "rounded-full" : ""} bg-primary box-glow`} />
                  <p className="font-mono text-[10px] text-secondary tracking-wider mb-1">{job.period}</p>
                  <h3 className="text-lg font-bold text-foreground tracking-wide">{job.role}</h3>
                  <p className="font-mono text-xs text-primary mb-2">@ {job.company}</p>
                  <p className="text-muted-foreground text-sm leading-relaxed font-body">{job.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Education */}
        <section className="py-16 relative">
          <div className="container mx-auto px-6">
            <Parallax speed={-0.1}>
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <p className="font-mono text-xs text-secondary mb-3 tracking-wider">
                  {isPony ? "🎓 Education" : "> EDU.LOG"}
                </p>
                <h2 className="text-3xl md:text-4xl font-bold mb-12 tracking-wider">
                  <span className="text-primary text-glow">{isPony ? "Education " : "EDU "}</span>
                  <span className="text-foreground">{isPony ? "🎓" : "HISTORY"}</span>
                </h2>
              </motion.div>
            </Parallax>

            <div className="grid md:grid-cols-2 gap-6 max-w-3xl">
              {[
                { degree: "Master's Degree", field: "Computer Sciences", school: "Kyiv National Economic University", period: "2020 — 2022", note: "Nostrified in Czech Republic" },
                { degree: "Bachelor's Degree", field: "Computer Sciences", school: "Kyiv National Economic University", period: "2016 — 2020", note: "Nostrified in Czech Republic" },
              ].map((edu, i) => (
                <motion.div
                  key={edu.degree}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.1 * i }}
                  className={`${isPony ? "bg-card rounded-2xl border-2 border-primary/20 shadow-lg" : "cyber-border bg-card/50 box-glow"} p-6 hover:bg-card/80 transition-all duration-500`}
                >
                  {!isPony && <p className="font-mono text-[10px] text-secondary tracking-wider mb-2">RECORD.0{i + 1}</p>}
                  <p className="font-mono text-[10px] text-muted-foreground tracking-wider mb-1">{edu.period}</p>
                  <h3 className="text-lg font-bold text-foreground tracking-wide">{edu.degree}</h3>
                  <p className="text-primary font-mono text-xs mb-1">{edu.field}</p>
                  <p className="text-muted-foreground text-sm font-body">{edu.school}</p>
                  <p className={`mt-2 text-xs font-mono ${isPony ? "text-secondary" : "text-neon-accent"}`}>
                    {isPony ? "✅ " : "▸ "}{edu.note}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-16 relative">
          <div className="absolute inset-0 bg-surface/30" />
          <div className="container mx-auto px-6 relative z-10 text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <p className="font-mono text-xs text-secondary mb-3 tracking-wider">
                {isPony ? "📄 My Resume" : "> RESUME.ACCESS"}
              </p>
              <h2 className="text-3xl md:text-4xl font-bold mb-6 tracking-wider">
                <span className="text-primary text-glow">{isPony ? "Download " : "GET "}</span>
                <span className="text-foreground">{isPony ? "Resume 📋" : "RESUME"}</span>
              </h2>
              <p className="text-muted-foreground font-body mb-8 max-w-md mx-auto">
                View or download my full resume with detailed work experience, skills, and education.
              </p>
              <div className="flex flex-wrap gap-4 justify-center">
                <button
                  onClick={() => setShowResume(true)}
                  className={`inline-flex items-center gap-2 font-mono text-xs tracking-wider px-6 py-3 transition-all ${isPony ? "bg-primary text-primary-foreground rounded-full hover:opacity-90" : "cyber-border bg-primary/10 text-primary hover:bg-primary/20 box-glow"}`}
                >
                  <FileText size={14} /> {isPony ? "Preview 👀" : "PREVIEW"}
                </button>
                <a
                  href={RESUME_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`inline-flex items-center gap-2 font-mono text-xs tracking-wider px-6 py-3 transition-all ${isPony ? "bg-secondary text-secondary-foreground rounded-full hover:opacity-90" : "cyber-border bg-secondary/10 text-secondary hover:bg-secondary/20 box-glow-secondary"}`}
                >
                  <ExternalLink size={14} /> {isPony ? "Open in Tab 🔗" : "OPEN_TAB"}
                </a>
                <a
                  href={RESUME_URL}
                  download="Vadym_Kolomiiets_Resume_FE.pdf"
                  className={`inline-flex items-center gap-2 font-mono text-xs tracking-wider px-6 py-3 transition-all ${isPony ? "bg-card border-2 border-primary/30 text-foreground rounded-full hover:border-primary/60" : "cyber-border bg-card/50 text-foreground hover:bg-card/80 border-glow"}`}
                >
                  <Download size={14} /> {isPony ? "Download 📥" : "DOWNLOAD"}
                </a>
              </div>
            </motion.div>
          </div>
        </section>
      </div>

      {/* Resume Preview Modal */}
      <AnimatePresence>
        {showResume && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
            onClick={() => setShowResume(false)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
              onClick={(e) => e.stopPropagation()}
              className={`w-full max-w-4xl h-[85vh] flex flex-col ${isPony ? "rounded-2xl border-2 border-primary/30 shadow-2xl" : "cyber-border"} bg-card overflow-hidden`}
            >
              {/* Modal header */}
              <div className={`flex items-center justify-between px-5 py-3 border-b ${isPony ? "border-primary/20" : "border-primary/20"}`}>
                <div className="flex items-center gap-3">
                  <FileText size={16} className="text-primary" />
                  <span className="font-mono text-xs text-muted-foreground tracking-wider">
                    {isPony ? "📄 Resume Preview" : "RESUME://PREVIEW"}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <a
                    href={RESUME_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 text-muted-foreground hover:text-primary transition-colors"
                    title="Open in new tab"
                  >
                    <ExternalLink size={16} />
                  </a>
                  <a
                    href={RESUME_URL}
                    download="Vadym_Kolomiiets_Resume_FE.pdf"
                    className="p-2 text-muted-foreground hover:text-primary transition-colors"
                    title="Download"
                  >
                    <Download size={16} />
                  </a>
                  <button
                    onClick={() => setShowResume(false)}
                    className="p-2 text-muted-foreground hover:text-destructive transition-colors"
                  >
                    <X size={16} />
                  </button>
                </div>
              </div>
              {/* PDF embed */}
              <div className="flex-1 bg-background">
                <iframe
                  src={RESUME_URL}
                  className="w-full h-full border-0"
                  title="Resume Preview"
                />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </PageTransition>
  );
};

export default About;
