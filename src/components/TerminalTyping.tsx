import { useState, useEffect } from "react";
import { useTheme } from "@/contexts/ThemeContext";
import { terminalLines } from "@/data/portfolio";

interface TerminalLine {
  text: string;
  className?: string;
  indent?: boolean;
}

const TerminalTyping = () => {
  const { isPony } = useTheme();
  const [visibleChars, setVisibleChars] = useState(0);
  const [started, setStarted] = useState(false);

  const lines: TerminalLine[] = [
    ...terminalLines.map((t) => ({ text: t })),
    { text: `  status: ${isPony ? "'SPARKLY ✨'" : "'ONLINE'"},` },
    { text: "};" },
  ];

  const fullText = lines.map((l) => l.text).join("\n");
  const totalChars = fullText.length;

  useEffect(() => {
    const delay = setTimeout(() => setStarted(true), 1400);
    return () => clearTimeout(delay);
  }, []);

  useEffect(() => {
    if (!started) return;
    if (visibleChars >= totalChars) return;

    const speed = 25 + Math.random() * 25;
    const timer = setTimeout(() => setVisibleChars((v) => v + 1), speed);
    return () => clearTimeout(timer);
  }, [started, visibleChars, totalChars]);

  // Build visible string
  const visibleText = fullText.slice(0, visibleChars);
  const visibleLines = visibleText.split("\n");

  const colorize = (line: string) => {
    // Tokenize for syntax highlighting
    return line
      .replace(/(const|let|var)/g, `<span class="text-secondary">$1</span>`)
      .replace(/(dev)/g, `<span class="text-foreground">$1</span>`)
      .replace(/(name|role|stack|status):/g, `<span class="text-muted-foreground">$1:</span>`)
      .replace(/'([^']*)'/g, (match, p1) => {
        if (["React"].includes(p1)) return `<span class="text-primary">'${p1}'</span>`;
        if (["TS"].includes(p1)) return `<span class="text-secondary">'${p1}'</span>`;
        if (p1.includes("ONLINE") || p1.includes("SPARKLY")) return `<span class="text-neon-accent">'${p1}'</span>`;
        if (p1.includes("Vadym")) return `<span class="text-primary">'${p1}'</span>`;
        if (p1.includes("Frontend")) return `<span class="text-secondary">'${p1}'</span>`;
        return `<span class="text-primary">'${p1}'</span>`;
      });
  };

  return (
    <div className={`p-5 font-mono text-sm leading-7 ${isPony ? "" : "scanlines"}`}>
      {visibleLines.map((line, i) => (
        <p key={i} dangerouslySetInnerHTML={{ __html: colorize(line) || "&nbsp;" }} />
      ))}
      <p className="mt-2">
        <span className={`text-primary ${visibleChars < totalChars ? "animate-pulse" : "animate-pulse"}`}>█</span>
      </p>
    </div>
  );
};

export default TerminalTyping;
