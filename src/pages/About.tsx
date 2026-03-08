import { motion } from "framer-motion";
import PageTransition from "@/components/PageTransition";
import Parallax from "@/components/Parallax";
import ThemedAvatar from "@/components/ThemedAvatar";
import { useTheme } from "@/contexts/ThemeContext";

const skills = [
  { category: "FRONTEND", items: ["React", "TypeScript", "Next.js", "Vue.js", "Tailwind CSS", "SCSS"] },
  { category: "TOOLS", items: ["Git", "Webpack", "Vite", "Docker", "Figma", "Storybook"] },
  { category: "BACKEND", items: ["Node.js", "Express", "GraphQL", "REST API", "PostgreSQL", "MongoDB"] },
  { category: "OTHER", items: ["CI/CD", "Testing", "Agile", "Performance", "SEO", "A11y"] },
];

const About = () => {
  const { isPony } = useTheme();

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
                      {isPony ? "Hey there! 👋" : "Hello!"} My name is <span className="text-primary">Vadym</span>, and I craft digital experiences
                      that push the boundaries of the web. My journey into development started in 2019,
                      when a single line of code changed everything.
                    </p>
                    <p>
                      Today I work with teams ranging from ambitious startups to enterprise-scale products.
                      My focus: building accessible, performant, and visually striking web applications.
                    </p>
                    <p>
                      When I'm offline, I explore emerging tech, contribute to open-source,
                      and fuel my coding sessions with {isPony ? "magical unicorn juice 🦄" : "industrial amounts of coffee"}.
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
      </div>
    </PageTransition>
  );
};

export default About;
