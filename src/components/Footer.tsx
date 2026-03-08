import { Link } from "react-router-dom";
import { Github, Linkedin, Mail } from "lucide-react";

const Footer = () => (
  <footer className="py-8 border-t border-neon-cyan/10">
    <div className="container mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
      <p className="font-mono text-[10px] text-muted-foreground tracking-wider uppercase">
        <span className="text-neon-magenta">//</span> Built by <span className="text-primary">Vadym Kolomiiets</span> © {new Date().getFullYear()}
      </p>
      <div className="flex items-center gap-4">
        {[
          { icon: Github, href: "#" },
          { icon: Linkedin, href: "#" },
          { icon: Mail, href: "mailto:hello@example.com" },
        ].map(({ icon: Icon, href }, i) => (
          <a
            key={i}
            href={href}
            className="text-muted-foreground hover:text-primary transition-colors glitch-hover"
          >
            <Icon size={14} />
          </a>
        ))}
      </div>
      <div className="flex items-center gap-6">
        {["Home", "About", "Projects", "Contact"].map((label) => (
          <Link
            key={label}
            to={`/${label === "Home" ? "" : label.toLowerCase()}`}
            className="font-mono text-[10px] text-muted-foreground hover:text-primary transition-colors tracking-wider uppercase"
          >
            {label}
          </Link>
        ))}
      </div>
    </div>
  </footer>
);

export default Footer;
