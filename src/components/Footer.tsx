import { Link } from "react-router-dom";
import { Github, Linkedin, Mail } from "lucide-react";

const Footer = () => (
  <footer className="py-8 border-t border-border">
    <div className="container mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
      <p className="font-mono text-xs text-muted-foreground">
        Built with <span className="text-primary">♥</span> by Alex Koval © {new Date().getFullYear()}
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
            className="text-muted-foreground hover:text-primary transition-colors"
          >
            <Icon size={16} />
          </a>
        ))}
      </div>
      <div className="flex items-center gap-6">
        {["Home", "About", "Projects", "Contact"].map((label) => (
          <Link
            key={label}
            to={`/${label === "Home" ? "" : label.toLowerCase()}`}
            className="font-mono text-xs text-muted-foreground hover:text-primary transition-colors"
          >
            {label}
          </Link>
        ))}
      </div>
    </div>
  </footer>
);

export default Footer;
