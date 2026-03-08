import { Link } from "react-router-dom";
import { Github, Linkedin, Mail } from "lucide-react";
import { useTheme } from "@/contexts/ThemeContext";

const Footer = () => {
  const { isPony } = useTheme();

  return (
    <footer role="contentinfo" aria-label="Site footer" className="py-8 border-t border-primary/10">
      <div className="container mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
        <p className="font-mono text-[10px] text-muted-foreground tracking-wider uppercase">
          <span className="text-secondary">{isPony ? "💖" : "//"}</span> Built by <span className="text-primary">Vadym Kolomiiets</span> © {new Date().getFullYear()}
        </p>
        <div className="flex items-center gap-4">
          {[
            { icon: Github, href: "#", label: "GitHub" },
            { icon: Linkedin, href: "#", label: "LinkedIn" },
            { icon: Mail, href: "mailto:hello@example.com", label: "Email" },
          ].map(({ icon: Icon, href, label }, i) => (
            <a key={i} href={href} aria-label={label} className={`text-muted-foreground hover:text-primary transition-colors ${isPony ? "" : "glitch-hover"}`}>
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
};

export default Footer;
