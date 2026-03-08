import { motion } from "framer-motion";
import PageTransition from "@/components/PageTransition";
import Parallax from "@/components/Parallax";

const skills = [
  { category: "Frontend", items: ["React", "TypeScript", "Next.js", "Vue.js", "Tailwind CSS", "SCSS"] },
  { category: "Tools", items: ["Git", "Webpack", "Vite", "Docker", "Figma", "Storybook"] },
  { category: "Backend", items: ["Node.js", "Express", "GraphQL", "REST API", "PostgreSQL", "MongoDB"] },
  { category: "Other", items: ["CI/CD", "Testing", "Agile", "Performance", "SEO", "Accessibility"] },
];

const About = () => {
  return (
    <PageTransition>
      <div className="pt-24 pb-16">
        {/* Hero header */}
        <section className="py-16 md:py-24">
          <div className="container mx-auto px-6">
            <Parallax speed={-0.1}>
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                <p className="font-mono text-primary text-sm mb-4">01. About Me</p>
                <h1 className="text-4xl md:text-6xl font-bold mb-8">
                  A passionate <span className="text-primary">frontend</span> developer
                </h1>
              </motion.div>
            </Parallax>

            <div className="grid md:grid-cols-5 gap-12 mt-12">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="md:col-span-3 space-y-5 text-muted-foreground leading-relaxed"
              >
                <p>
                  Hello! My name is Alex, and I love creating things that live on the internet.
                  My passion for web development started back in 2019, when I decided to try building
                  my first website — and it completely changed my understanding of technology.
                </p>
                <p>
                  Today I have experience working with various companies: from startups to large product teams.
                  My focus is building accessible, inclusive, and performant web applications.
                </p>
                <p>
                  When I'm not coding, you'll find me exploring new technologies, contributing to open-source
                  projects, or enjoying a good cup of coffee while reading tech blogs.
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="md:col-span-2 flex justify-center"
              >
                <div className="relative group">
                  <div className="w-64 h-64 md:w-72 md:h-72 rounded-lg bg-surface border-2 border-primary/30 overflow-hidden relative z-10 group-hover:border-primary transition-colors duration-500">
                    <div className="w-full h-full bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center">
                      <span className="font-mono text-6xl text-primary/60">AK</span>
                    </div>
                  </div>
                  <div className="absolute top-4 left-4 w-64 h-64 md:w-72 md:h-72 rounded-lg border-2 border-primary/40 -z-0 group-hover:top-3 group-hover:left-3 transition-all duration-500" />
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Skills */}
        <section className="py-16 bg-surface/50">
          <div className="container mx-auto px-6">
            <Parallax speed={-0.1}>
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <p className="font-mono text-primary text-sm mb-4">02. Skills</p>
                <h2 className="text-3xl md:text-4xl font-bold mb-12">Technologies I work with</h2>
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
                  className="bg-card border border-border rounded-lg p-6 hover:border-primary/50 transition-all duration-500 border-glow"
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
          </div>
        </section>

        {/* Experience timeline */}
        <section className="py-16">
          <div className="container mx-auto px-6">
            <Parallax speed={-0.1}>
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <p className="font-mono text-primary text-sm mb-4">03. Experience</p>
                <h2 className="text-3xl md:text-4xl font-bold mb-12">Where I've worked</h2>
              </motion.div>
            </Parallax>

            <div className="space-y-8 max-w-3xl">
              {[
                { role: "Senior Frontend Developer", company: "TechCorp", period: "2023 — Present", desc: "Leading the frontend team, building scalable React applications with TypeScript and Next.js." },
                { role: "Frontend Developer", company: "StartupHub", period: "2021 — 2023", desc: "Built interactive dashboards and real-time collaboration tools using React and WebSocket." },
                { role: "Junior Developer", company: "WebAgency", period: "2019 — 2021", desc: "Developed responsive websites and landing pages for various clients using modern web technologies." },
              ].map((job, i) => (
                <motion.div
                  key={job.company}
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.1 * i }}
                  className="relative pl-8 border-l-2 border-border hover:border-primary/50 transition-colors duration-500"
                >
                  <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-background border-2 border-primary" />
                  <p className="font-mono text-primary text-xs mb-1">{job.period}</p>
                  <h3 className="text-lg font-bold text-foreground">{job.role}</h3>
                  <p className="font-mono text-sm text-primary/80 mb-2">@ {job.company}</p>
                  <p className="text-muted-foreground text-sm leading-relaxed">{job.desc}</p>
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
