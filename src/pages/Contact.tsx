import { motion } from "framer-motion";
import { Mail, Github, Linkedin, MapPin, Send } from "lucide-react";
import PageTransition from "@/components/PageTransition";
import Parallax from "@/components/Parallax";

const Contact = () => {
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
                className="text-center max-w-2xl mx-auto"
              >
                <p className="font-mono text-primary text-sm mb-4">Get In Touch</p>
                <h1 className="text-4xl md:text-6xl font-bold mb-6">
                  Let's work <span className="text-primary">together</span>
                </h1>
                <p className="text-muted-foreground text-lg leading-relaxed">
                  I'm currently open to new opportunities and interesting projects.
                  Whether you have a question or just want to say hi — don't hesitate to reach out!
                </p>
              </motion.div>
            </Parallax>

            <div className="grid md:grid-cols-2 gap-12 mt-16 max-w-4xl mx-auto">
              {/* Contact info */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="space-y-8"
              >
                {[
                  { icon: Mail, label: "Email", value: "hello@vadymkolomiiets.dev", href: "mailto:hello@vadymkolomiiets.dev" },
                  { icon: Github, label: "GitHub", value: "github.com/vadymkolomiiets", href: "#" },
                  { icon: Linkedin, label: "LinkedIn", value: "linkedin.com/in/vadymkolomiiets", href: "#" },
                  { icon: MapPin, label: "Location", value: "Kyiv, Ukraine", href: undefined },
                ].map((item, i) => (
                  <motion.div
                    key={item.label}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, delay: 0.3 + 0.1 * i }}
                    className="flex items-center gap-4 group"
                  >
                    <div className="w-12 h-12 rounded-lg bg-surface border border-border flex items-center justify-center group-hover:border-primary/50 transition-colors duration-300">
                      <item.icon size={20} className="text-primary" />
                    </div>
                    <div>
                      <p className="font-mono text-xs text-muted-foreground">{item.label}</p>
                      {item.href ? (
                        <a href={item.href} className="text-foreground hover:text-primary transition-colors">
                          {item.value}
                        </a>
                      ) : (
                        <p className="text-foreground">{item.value}</p>
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
                <div>
                  <label className="font-mono text-xs text-muted-foreground mb-2 block">Name</label>
                  <input
                    type="text"
                    placeholder="John Doe"
                    className="w-full bg-surface border border-border rounded-lg px-4 py-3 text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-primary/50 transition-colors font-mono text-sm"
                  />
                </div>
                <div>
                  <label className="font-mono text-xs text-muted-foreground mb-2 block">Email</label>
                  <input
                    type="email"
                    placeholder="john@example.com"
                    className="w-full bg-surface border border-border rounded-lg px-4 py-3 text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-primary/50 transition-colors font-mono text-sm"
                  />
                </div>
                <div>
                  <label className="font-mono text-xs text-muted-foreground mb-2 block">Message</label>
                  <textarea
                    rows={5}
                    placeholder="Tell me about your project..."
                    className="w-full bg-surface border border-border rounded-lg px-4 py-3 text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-primary/50 transition-colors resize-none font-mono text-sm"
                  />
                </div>
                <button
                  type="submit"
                  className="inline-flex items-center gap-2 font-mono text-sm bg-primary text-primary-foreground px-8 py-3 rounded-lg hover:bg-primary/90 transition-all font-semibold w-full justify-center"
                >
                  <Send size={16} /> Send Message
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
