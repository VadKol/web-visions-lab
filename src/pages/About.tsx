import { motion } from "framer-motion";
import PageTransition from "@/components/PageTransition";
import Parallax from "@/components/Parallax";
import avatar from "@/assets/avatar.jpg";

const skills = [
  { category: "FRONTEND", items: ["React", "TypeScript", "Next.js", "Vue.js", "Tailwind CSS", "SCSS"] },
  { category: "TOOLS", items: ["Git", "Webpack", "Vite", "Docker", "Figma", "Storybook"] },
  { category: "BACKEND", items: ["Node.js", "Express", "GraphQL", "REST API", "PostgreSQL", "MongoDB"] },
  { category: "OTHER", items: ["CI/CD", "Testing", "Agile", "Performance", "SEO", "A11y"] },
];

const About = () => {
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
                <p className="font-mono text-xs text-neon-magenta mb-3 tracking-wider">{'>'} PROFILE.LOAD</p>
                <h1 className="text-4xl md:text-6xl font-display font-bold mb-8 tracking-wider">
                  <span className="text-primary text-glow-cyan">ABOUT</span>{" "}
                  <span className="text-foreground">ME</span>
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
                <div className="cyber-border bg-card/50 p-6">
                  <p className="font-mono text-xs text-neon-magenta mb-3 tracking-wider">{'>'} BIO.READ</p>
                  <div className="space-y-4 text-muted-foreground leading-relaxed font-body text-base">
                    <p>
                      Hello! My name is <span className="text-primary">Vadym</span>, and I craft digital experiences
                      that push the boundaries of the web. My journey into development started in 2019,
                      when a single line of code changed everything.
                    </p>
                    <p>
                      Today I work with teams ranging from ambitious startups to enterprise-scale products.
                      My focus: building accessible, performant, and visually striking web applications.
                    </p>
                    <p>
                      When I'm offline, I explore emerging tech, contribute to open-source,
                      and fuel my coding sessions with industrial amounts of coffee.
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
                <div className="relative group">
                  <div className="w-64 h-64 md:w-72 md:h-72 overflow-hidden relative z-10 cyber-border box-glow-cyan">
                    <img
                      src={avatar}
                      alt="Vadym Kolomiiets"
                      className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
                    />
                    <div className="absolute inset-0 bg-neon-cyan/10 group-hover:bg-transparent transition-colors duration-500" />
                  </div>
                  <div
                    className="absolute top-3 left-3 w-64 h-64 md:w-72 md:h-72 border border-neon-magenta/30 -z-0 group-hover:top-2 group-hover:left-2 transition-all duration-500"
                    style={{ clipPath: "polygon(0 0, calc(100% - 12px) 0, 100% 12px, 100% 100%, 12px 100%, 0 calc(100% - 12px))" }}
                  />
                </div>
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
                <p className="font-mono text-xs text-neon-magenta mb-3 tracking-wider">{'>'} SKILLS.SCAN</p>
                <h2 className="text-3xl md:text-4xl font-display font-bold mb-12 tracking-wider">
                  <span className="text-primary text-glow-cyan">TECH</span>{" "}
                  <span className="text-foreground">STACK</span>
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
                  className="cyber-border bg-card/50 p-6 hover:bg-card/80 transition-all duration-500 box-glow-cyan"
                >
                  <h3 className="font-mono text-xs text-neon-magenta tracking-wider mb-1">MODULE.0{i + 1}</h3>
                  <h4 className="font-display text-xs text-primary tracking-wider mb-4">{group.category}</h4>
                  <ul className="space-y-2">
                    {group.items.map((item) => (
                      <li key={item} className="text-muted-foreground text-sm flex items-center gap-2 font-body">
                        <span className="w-1 h-1 bg-neon-cyan" />
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
                <p className="font-mono text-xs text-neon-magenta mb-3 tracking-wider">{'>'} EXP.LOG</p>
                <h2 className="text-3xl md:text-4xl font-display font-bold mb-12 tracking-wider">
                  <span className="text-primary text-glow-cyan">WORK</span>{" "}
                  <span className="text-foreground">HISTORY</span>
                </h2>
              </motion.div>
            </Parallax>

            <div className="space-y-8 max-w-3xl">
              {[
                { role: "Senior Frontend Developer", company: "TechCorp", period: "2023 — Present", desc: "Leading the frontend squad, building scalable React applications with TypeScript and Next.js." },
                { role: "Frontend Developer", company: "StartupHub", period: "2021 — 2023", desc: "Built interactive dashboards and real-time collaboration tools using React and WebSocket." },
                { role: "Junior Developer", company: "WebAgency", period: "2019 — 2021", desc: "Developed responsive websites and landing pages for diverse clients using modern web tech." },
              ].map((job, i) => (
                <motion.div
                  key={job.company}
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.1 * i }}
                  className="relative pl-8 border-l-2 border-neon-cyan/20 hover:border-neon-cyan/50 transition-colors duration-500"
                >
                  <div className="absolute -left-[5px] top-1 w-2 h-2 bg-neon-cyan box-glow-cyan" />
                  <p className="font-mono text-[10px] text-neon-magenta tracking-wider mb-1">{job.period}</p>
                  <h3 className="text-lg font-display text-foreground tracking-wide">{job.role}</h3>
                  <p className="font-mono text-xs text-primary mb-2">@ {job.company}</p>
                  <p className="text-muted-foreground text-sm leading-relaxed font-body">{job.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </PageTransition>
  );
};

export default About;
