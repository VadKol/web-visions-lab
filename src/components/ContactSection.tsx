import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Mail, Github, Linkedin } from "lucide-react";

const ContactSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="contact" className="py-24 md:py-32" ref={ref}>
      <div className="container mx-auto px-6 text-center max-w-2xl">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <p className="font-mono text-primary text-sm mb-4">04. Що далі?</p>
          <h2 className="text-3xl md:text-5xl font-bold mb-6">Зв'яжіться зі мною</h2>
          <p className="text-muted-foreground leading-relaxed mb-10">
            Я відкритий до нових можливостей та цікавих проєктів. Якщо у вас є питання або пропозиція —
            не соромтеся написати мені!
          </p>

          <a
            href="mailto:hello@example.com"
            className="inline-flex items-center gap-2 font-mono text-sm border-2 border-primary text-primary px-8 py-4 rounded hover:bg-primary/10 transition-all box-glow"
          >
            <Mail size={18} />
            Написати листа
          </a>

          <div className="flex items-center justify-center gap-6 mt-12">
            <a href="#" className="text-muted-foreground hover:text-primary transition-colors hover:-translate-y-1 transform duration-200">
              <Github size={22} />
            </a>
            <a href="#" className="text-muted-foreground hover:text-primary transition-colors hover:-translate-y-1 transform duration-200">
              <Linkedin size={22} />
            </a>
            <a href="mailto:hello@example.com" className="text-muted-foreground hover:text-primary transition-colors hover:-translate-y-1 transform duration-200">
              <Mail size={22} />
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ContactSection;
