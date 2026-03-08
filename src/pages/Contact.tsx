import { motion } from "framer-motion";
import { Mail, Github, Linkedin, MapPin, Send } from "lucide-react";
import PageTransition from "@/components/PageTransition";
import Parallax from "@/components/Parallax";

const Contact = () => {
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
                className="text-center max-w-2xl mx-auto"
              >
                <p className="font-mono text-xs text-neon-magenta mb-3 tracking-wider">{'>'} CONNECT.INIT</p>
                <h1 className="text-4xl md:text-6xl font-display font-bold mb-6 tracking-wider">
                  <span className="text-primary text-glow-cyan">GET IN</span>{" "}
                  <span className="text-neon-magenta text-glow-magenta">TOUCH</span>
                </h1>
                <p className="text-muted-foreground text-lg leading-relaxed font-body">
                  Open to new opportunities and exciting projects.
                  Whether you have a question or want to collaborate — let's connect.
                </p>
              </motion.div>
            </Parallax>

            <div className="grid md:grid-cols-2 gap-12 mt-16 max-w-4xl mx-auto">
              {/* Contact info */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="space-y-6"
              >
                <div className="font-mono text-[10px] text-neon-magenta tracking-wider mb-4">{'>'} CHANNELS.LIST</div>
                {[
                  { icon: Mail, label: "EMAIL", value: "hello@vadymkolomiiets.dev", href: "mailto:hello@vadymkolomiiets.dev" },
                  { icon: Github, label: "GITHUB", value: "github.com/vadymkolomiiets", href: "#" },
                  { icon: Linkedin, label: "LINKEDIN", value: "linkedin.com/in/vadymkolomiiets", href: "#" },
                  { icon: MapPin, label: "LOCATION", value: "Kyiv, Ukraine", href: undefined },
                ].map((item, i) => (
                  <motion.div
                    key={item.label}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, delay: 0.3 + 0.1 * i }}
                    className="flex items-center gap-4 group"
                  >
                    <div className="w-12 h-12 cyber-border-sm bg-card flex items-center justify-center group-hover:box-glow-cyan transition-all duration-300">
                      <item.icon size={18} className="text-primary" />
                    </div>
                    <div>
                      <p className="font-mono text-[10px] text-muted-foreground tracking-wider">{item.label}</p>
                      {item.href ? (
                        <a href={item.href} className="text-foreground hover:text-primary transition-colors font-body text-sm">
                          {item.value}
                        </a>
                      ) : (
                        <p className="text-foreground font-body text-sm">{item.value}</p>
                      )}
                    </div>
                  </motion.div>
                ))}
              </motion.div>

              {/* Contact form */}
              <motion.form
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="space-y-5"
                onSubmit={(e) => e.preventDefault()}
              >
                <div className="font-mono text-[10px] text-neon-magenta tracking-wider mb-2">{'>'} MESSAGE.COMPOSE</div>
                <div>
                  <label className="font-mono text-[10px] text-muted-foreground mb-2 block tracking-wider">NAME</label>
                  <input
                    type="text"
                    placeholder="John Doe"
                    className="w-full bg-card border border-neon-cyan/20 px-4 py-3 text-foreground placeholder:text-muted-foreground/40 focus:outline-none focus:border-neon-cyan/50 focus:box-glow-cyan transition-all font-mono text-sm"
                    style={{ clipPath: "polygon(0 0, calc(100% - 8px) 0, 100% 8px, 100% 100%, 8px 100%, 0 calc(100% - 8px))" }}
                  />
                </div>
                <div>
                  <label className="font-mono text-[10px] text-muted-foreground mb-2 block tracking-wider">EMAIL</label>
                  <input
                    type="email"
                    placeholder="john@example.com"
                    className="w-full bg-card border border-neon-cyan/20 px-4 py-3 text-foreground placeholder:text-muted-foreground/40 focus:outline-none focus:border-neon-cyan/50 transition-all font-mono text-sm"
                    style={{ clipPath: "polygon(0 0, calc(100% - 8px) 0, 100% 8px, 100% 100%, 8px 100%, 0 calc(100% - 8px))" }}
                  />
                </div>
                <div>
                  <label className="font-mono text-[10px] text-muted-foreground mb-2 block tracking-wider">MESSAGE</label>
                  <textarea
                    rows={5}
                    placeholder="Tell me about your project..."
                    className="w-full bg-card border border-neon-cyan/20 px-4 py-3 text-foreground placeholder:text-muted-foreground/40 focus:outline-none focus:border-neon-cyan/50 transition-all resize-none font-mono text-sm"
                    style={{ clipPath: "polygon(0 0, calc(100% - 8px) 0, 100% 8px, 100% 100%, 8px 100%, 0 calc(100% - 8px))" }}
                  />
                </div>
                <button
                  type="submit"
                  className="inline-flex items-center gap-2 font-mono text-xs tracking-wider cyber-border bg-neon-cyan/15 text-primary px-8 py-3 hover:bg-neon-cyan/25 transition-all w-full justify-center box-glow-cyan"
                >
                  <Send size={14} /> TRANSMIT
                </button>
              </motion.form>
            </div>
          </div>
        </section>
      </div>
    </PageTransition>
  );
};

export default Contact;
