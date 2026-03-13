import { RouteObject } from "react-router-dom";
import { LazyLoadProviders } from "@/providers/LazyLoadProviders";

// console.log(LazyLoadProviders());
const { Home, About, Projects, Contact, Minigames, Blog, NotFound } =
  LazyLoadProviders();

export const routes: RouteObject[] = [
  { path: "/", element: <Home /> },
  { path: "/about", element: <About /> },
  { path: "/projects", element: <Projects /> },
  { path: "/contact", element: <Contact /> },
  { path: "/minigames", element: <Minigames /> },
  { path: "/blog", element: <Blog /> },
  { path: "*", element: <NotFound /> },
];