import { Link } from "react-router-dom";
import { Github, Linkedin, Mail } from "lucide-react";
import { useTheme } from "@/contexts/ThemeContext";

const Footer = () => {
  const { isPony } = useTheme();

  return (
    <footer
      role='contentinfo'
      aria-label='Site footer'
      className='py-8 border-t border-primary/10'
    >
      <div className='container mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4'>
        <p className='font-mono text-[10px] text-muted-foreground tracking-wider uppercase'>
          Created with <span className='text-destructive'>❤️</span> by{" "}
          <span className='text-primary'>Vadym Kolomiiets</span> ©{" "}
          {new Date().getFullYear()}
        </p>
        <div className='flex items-center gap-4'>
          {[
            { icon: Github, href: "https://github.com/VadKol", label: "GitHub" },
            { icon: Linkedin, href: "https://www.linkedin.com/in/vadym-kolomiiets-ua/", label: "LinkedIn" },
            { icon: Mail, href: "mailto:kolomiietsvad@gmail.com", label: "Email" },
          ].map(({ icon: Icon, href, label }, i) => (
            <a
              key={i}
              href={href}
              aria-label={label}
              target="_blank"
              className={`text-muted-foreground hover:text-primary transition-colors ${isPony ? "" : "glitch-hover"}`}
            >
              <Icon size={14} />
            </a>
          ))}
        </div>
        <div className='flex items-center gap-6 flex-wrap'>
          {["Home", "About", "Projects", "Games", "Blog", "Contact"].map(
            (label) => (
              <Link
                key={label}
                to={`/${label === "Home" ? "" : label === "Games" ? "minigames" : label.toLowerCase()}`}
                className='font-mono text-[10px] text-muted-foreground hover:text-primary transition-colors tracking-wider uppercase'
              >
                {label}
              </Link>
            ),
          )}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
