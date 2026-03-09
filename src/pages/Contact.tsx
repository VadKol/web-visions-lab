import { motion } from "framer-motion";
import { Mail, Github, Linkedin, MapPin, Send, ExternalLink, MessageCircle } from "lucide-react";
import { personal } from "@/data/portfolio";
import { ENDPOINTS } from "@/config/endpoints";
import PageTransition from "@/components/PageTransition";
import Parallax from "@/components/Parallax";
import { useTheme } from "@/contexts/ThemeContext";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";

const GOOGLE_MAPS_URL = personal.googleMapsUrl;

const Contact = () => {
  const { isPony } = useTheme();

  const inputClass = isPony
    ? "w-full bg-card border-2 border-primary/20 rounded-xl px-4 py-3 text-foreground placeholder:text-muted-foreground/40 focus:outline-none focus:border-primary/50 transition-all font-mono text-sm"
    : "w-full bg-card border border-primary/20 px-4 py-3 text-foreground placeholder:text-muted-foreground/40 focus:outline-none focus:border-primary/50 transition-all font-mono text-sm";

  const inputStyle = isPony ? {} : { clipPath: "polygon(0 0, calc(100% - 8px) 0, 100% 8px, 100% 100%, 8px 100%, 0 calc(100% - 8px))" };

  const contactItems = [
    { icon: Mail, label: "EMAIL", value: personal.email, href: `mailto:${personal.email}` },
    { icon: Github, label: "GITHUB", value: personal.githubLabel, href: personal.github },
    { icon: Linkedin, label: "LINKEDIN", value: personal.linkedinLabel, href: personal.linkedin },
    { icon: MessageCircle, label: "TELEGRAM", value: personal.telegramLabel, href: personal.telegram },
  ];

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
                className="text-center max-w-2xl mx-auto"
              >
                <p className="font-mono text-xs text-secondary mb-3 tracking-wider">
                  {isPony ? "💌 Let's chat!" : "> CONNECT.INIT"}
                </p>
                <h1 className="text-4xl md:text-6xl font-bold mb-6 tracking-wider">
                  <span className="text-primary text-glow">{isPony ? "Get in " : "GET IN "}</span>
                  <span className="text-secondary text-glow-secondary">{isPony ? "Touch 💖" : "TOUCH"}</span>
                </h1>
                <p className="text-muted-foreground text-lg leading-relaxed font-body">
                  Open to new opportunities and exciting projects. Let's connect!
                </p>
              </motion.div>
            </Parallax>

            <div className="grid md:grid-cols-2 gap-12 mt-16 max-w-4xl mx-auto">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="space-y-6"
              >
                <div className="font-mono text-[10px] text-secondary tracking-wider mb-4">
                  {isPony ? "📬 Find me here" : "> CHANNELS.LIST"}
                </div>
                {contactItems.map((item, i) => (
                  <motion.div
                    key={item.label}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, delay: 0.3 + 0.1 * i }}
                    className="flex items-center gap-4 group"
                  >
                    <div className={`w-12 h-12 flex items-center justify-center transition-all duration-300 ${isPony ? "bg-primary/10 rounded-xl border-2 border-primary/20" : "cyber-border-sm bg-card group-hover:box-glow"}`}>
                      <item.icon size={18} className="text-primary" />
                    </div>
                    <div>
                      <p className="font-mono text-[10px] text-muted-foreground tracking-wider">{item.label}</p>
                      <a href={item.href} className="text-foreground hover:text-primary transition-colors font-body text-sm">{item.value}</a>
                    </div>
                  </motion.div>
                ))}
                
                {/* Location with map hover */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: 0.6 }}
                  className="flex items-center gap-4 group"
                >
                  <div className={`w-12 h-12 flex items-center justify-center transition-all duration-300 ${isPony ? "bg-primary/10 rounded-xl border-2 border-primary/20" : "cyber-border-sm bg-card group-hover:box-glow"}`}>
                    <MapPin size={18} className="text-primary" />
                  </div>
                  <div>
                    <p className="font-mono text-[10px] text-muted-foreground tracking-wider">LOCATION</p>
                    <HoverCard openDelay={200}>
                      <HoverCardTrigger asChild>
                        <a 
                          href={GOOGLE_MAPS_URL}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-foreground hover:text-primary transition-colors font-body text-sm cursor-pointer inline-flex items-center gap-1"
                        >
                          {personal.location}
                          <ExternalLink size={12} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                        </a>
                      </HoverCardTrigger>
                      <HoverCardContent className={`w-72 p-0 overflow-hidden ${isPony ? "rounded-xl" : ""}`}>
                        <img 
                          src="https://maps.googleapis.com/maps/api/staticmap?center=Pardubice,Czech+Republic&zoom=12&size=288x160&scale=2&style=feature:all|element:labels|visibility:on&style=feature:all|element:geometry|color:0x242424&style=feature:water|element:geometry|color:0x17263c&markers=color:cyan|Pardubice,Czech+Republic&key=AIzaSyBFw0Qbyq9zTFTd-tUY6dZWTgaQzuU17R8"
                          alt="Map showing Pardubice, Czech Republic"
                          className="w-full h-40 object-cover"
                          onError={(e) => {
                            // Fallback to Google Maps embed image
                            (e.target as HTMLImageElement).src = "https://www.google.com/maps/embed/v1/place?key=AIzaSyBFw0Qbyq9zTFTd-tUY6dZWTgaQzuU17R8&q=Pardubice,Czech+Republic";
                          }}
                        />
                        <div className={`p-3 ${isPony ? "bg-card" : "bg-card border-t border-primary/20"}`}>
                          <p className="font-mono text-[10px] text-muted-foreground">
                            {isPony ? "🇨🇿 Czech Republic • 🇺🇦 Ukraine" : "CZ // UA"}
                          </p>
                          <p className="font-mono text-[9px] text-primary mt-1">
                            {isPony ? "Click to open in Google Maps" : "CLICK_TO_OPEN_MAPS"}
                          </p>
                        </div>
                      </HoverCardContent>
                    </HoverCard>
                  </div>
                </motion.div>
              </motion.div>

              <motion.form
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="space-y-5"
                onSubmit={(e) => e.preventDefault()}
              >
                <div className="font-mono text-[10px] text-secondary tracking-wider mb-2">
                  {isPony ? "✏️ Write to me" : "> MESSAGE.COMPOSE"}
                </div>
                <div>
                  <label htmlFor="contact-name" className="font-mono text-[10px] text-muted-foreground mb-2 block tracking-wider">NAME</label>
                  <input id="contact-name" type="text" placeholder="John Doe" className={inputClass} style={inputStyle} />
                </div>
                <div>
                  <label htmlFor="contact-email" className="font-mono text-[10px] text-muted-foreground mb-2 block tracking-wider">EMAIL</label>
                  <input id="contact-email" type="email" placeholder="john@example.com" className={inputClass} style={inputStyle} />
                </div>
                <div>
                  <label htmlFor="contact-message" className="font-mono text-[10px] text-muted-foreground mb-2 block tracking-wider">MESSAGE</label>
                  <textarea id="contact-message" rows={5} placeholder="Tell me about your project..." className={`${inputClass} resize-none`} style={inputStyle} />
                </div>
                <button
                  type="submit"
                  className={`inline-flex items-center gap-2 font-mono text-xs tracking-wider px-8 py-3 w-full justify-center transition-all ${isPony ? "bg-primary text-primary-foreground rounded-xl hover:opacity-90" : "cyber-border bg-primary/15 text-primary hover:bg-primary/25 box-glow"}`}
                >
                  <Send size={14} /> {isPony ? "Send 💌" : "TRANSMIT"}
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
