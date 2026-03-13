import { lazy } from "react";

export function LazyLoadProviders() {
  const Home = lazy(() => import("@/pages/Home"));
  const About = lazy(() => import("@/pages/About"));
  const Projects = lazy(() => import("@/pages/Projects"));
  const Contact = lazy(() => import("@/pages/Contact"));
  const Minigames = lazy(() => import("@/pages/Minigames"));
  const Blog = lazy(() => import("@/pages/Blog"));
  const NotFound = lazy(() => import("@/pages/NotFound"));
  return { Home, About, Projects, Contact, Minigames, Blog, NotFound };
}
