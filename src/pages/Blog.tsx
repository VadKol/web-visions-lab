import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Rss, ExternalLink, Clock, RefreshCw, Tag } from "lucide-react";
import PageTransition from "@/components/PageTransition";
import Parallax from "@/components/Parallax";
import { useTheme } from "@/contexts/ThemeContext";

interface Article {
  id: number;
  title: string;
  description: string;
  url: string;
  published_at: string;
  tag_list: string[];
  user: {
    name: string;
    profile_image: string;
  };
  reading_time_minutes: number;
  cover_image: string | null;
}

const TAGS = ["react", "javascript", "typescript", "frontend", "webdev", "css"];

const Blog = () => {
  const { isPony } = useTheme();
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTag, setActiveTag] = useState("frontend");
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);

  const fetchArticles = async (tag: string) => {
    setLoading(true);
    try {
      const response = await fetch(
        `https://dev.to/api/articles?tag=${tag}&per_page=12&top=7`
      );
      const data = await response.json();
      setArticles(data);
      setLastUpdated(new Date());
    } catch (error) {
      console.error("Failed to fetch articles:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchArticles(activeTag);
    // Auto-refresh every 5 minutes
    const interval = setInterval(() => fetchArticles(activeTag), 5 * 60 * 1000);
    return () => clearInterval(interval);
  }, [activeTag]);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

    if (diffHours < 1) return "Just now";
    if (diffHours < 24) return `${diffHours}h ago`;
    if (diffDays < 7) return `${diffDays}d ago`;
    return date.toLocaleDateString();
  };

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
                className="text-center max-w-2xl mx-auto mb-12"
              >
                <p className="font-mono text-xs text-secondary mb-3 tracking-wider">
                  {isPony ? "📰 Fresh news!" : "> NEWS_FEED.STREAM"}
                </p>
                <h1 className="text-4xl md:text-6xl font-bold mb-6 tracking-wider">
                  <span className="text-primary text-glow">{isPony ? "Dev " : "DEV "}</span>
                  <span className="text-secondary text-glow-secondary">{isPony ? "Blog 📝" : "BLOG"}</span>
                </h1>
                <p className="text-muted-foreground text-lg leading-relaxed font-body">
                  Real-time frontend news and articles from dev.to
                </p>
              </motion.div>
            </Parallax>

            {/* Tags Filter */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.2 }}
              className="flex flex-wrap justify-center gap-2 mb-8"
            >
              {TAGS.map((tag) => (
                <button
                  key={tag}
                  onClick={() => setActiveTag(tag)}
                  className={`font-mono text-xs tracking-wider px-4 py-2 transition-all ${
                    activeTag === tag
                      ? isPony
                        ? "bg-primary text-primary-foreground rounded-xl"
                        : "cyber-border bg-primary/20 text-primary box-glow"
                      : isPony
                        ? "bg-card rounded-xl border border-primary/20 text-muted-foreground hover:text-foreground"
                        : "cyber-border-sm bg-card/50 text-muted-foreground hover:text-foreground"
                  }`}
                >
                  #{tag}
                </button>
              ))}
            </motion.div>

            {/* Status Bar */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="flex items-center justify-between mb-8 px-2"
            >
              <div className="flex items-center gap-2 text-muted-foreground font-mono text-xs">
                <Rss size={14} className="text-primary animate-pulse" />
                <span>{isPony ? "Live feed" : "LIVE_STREAM"}</span>
              </div>
              <div className="flex items-center gap-4">
                {lastUpdated && (
                  <span className="text-muted-foreground font-mono text-xs">
                    Updated {formatDate(lastUpdated.toISOString())}
                  </span>
                )}
                <button
                  onClick={() => fetchArticles(activeTag)}
                  disabled={loading}
                  className={`p-2 transition-all ${
                    isPony
                      ? "bg-card rounded-lg border border-primary/20 hover:border-primary/50"
                      : "cyber-border-sm bg-card hover:box-glow"
                  } ${loading ? "animate-spin" : ""}`}
                >
                  <RefreshCw size={14} className="text-primary" />
                </button>
              </div>
            </motion.div>

            {/* Articles Grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              <AnimatePresence mode="wait">
                {loading ? (
                  // Loading Skeletons
                  [...Array(6)].map((_, i) => (
                    <motion.div
                      key={`skeleton-${i}`}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className={`p-5 animate-pulse ${
                        isPony
                          ? "bg-card rounded-2xl border-2 border-primary/10"
                          : "cyber-border bg-card"
                      }`}
                    >
                      <div className="h-4 bg-muted rounded w-3/4 mb-3" />
                      <div className="h-3 bg-muted rounded w-full mb-2" />
                      <div className="h-3 bg-muted rounded w-2/3" />
                    </motion.div>
                  ))
                ) : (
                  articles.map((article, i) => (
                    <motion.a
                      key={article.id}
                      href={article.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ duration: 0.3, delay: i * 0.05 }}
                      className={`group block p-5 transition-all ${
                        isPony
                          ? "bg-card rounded-2xl border-2 border-primary/10 hover:border-primary/40 hover:shadow-lg"
                          : "cyber-border bg-card hover:box-glow"
                      }`}
                    >
                      {article.cover_image && (
                        <div className={`mb-4 overflow-hidden ${isPony ? "rounded-xl" : ""}`}>
                          <img
                            src={article.cover_image}
                            alt={article.title}
                            className="w-full h-32 object-cover transition-transform group-hover:scale-105"
                            loading="lazy"
                          />
                        </div>
                      )}
                      
                      <div className="flex items-center gap-2 mb-3">
                        <img
                          src={article.user.profile_image}
                          alt={article.user.name}
                          className={`w-6 h-6 ${isPony ? "rounded-full" : ""}`}
                        />
                        <span className="font-mono text-[10px] text-muted-foreground truncate">
                          {article.user.name}
                        </span>
                        <span className="text-muted-foreground/50">•</span>
                        <span className="font-mono text-[10px] text-muted-foreground">
                          {formatDate(article.published_at)}
                        </span>
                      </div>

                      <h3 className="font-mono text-sm text-foreground mb-2 line-clamp-2 group-hover:text-primary transition-colors">
                        {article.title}
                      </h3>

                      <p className="text-muted-foreground text-xs font-body line-clamp-2 mb-3">
                        {article.description}
                      </p>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-1 flex-wrap">
                          {article.tag_list.slice(0, 2).map((tag) => (
                            <span
                              key={tag}
                              className={`font-mono text-[9px] px-2 py-0.5 ${
                                isPony
                                  ? "bg-primary/10 text-primary rounded-full"
                                  : "bg-primary/10 text-primary"
                              }`}
                            >
                              #{tag}
                            </span>
                          ))}
                        </div>
                        <div className="flex items-center gap-1 text-muted-foreground">
                          <Clock size={10} />
                          <span className="font-mono text-[10px]">{article.reading_time_minutes}m</span>
                        </div>
                      </div>

                      <div className="mt-3 flex items-center gap-1 text-primary font-mono text-[10px] opacity-0 group-hover:opacity-100 transition-opacity">
                        <ExternalLink size={10} />
                        {isPony ? "Read more" : "OPEN_LINK"}
                      </div>
                    </motion.a>
                  ))
                )}
              </AnimatePresence>
            </div>
          </div>
        </section>
      </div>
    </PageTransition>
  );
};

export default Blog;
