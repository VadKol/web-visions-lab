import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const routes = ["/", "/about", "/projects", "/minigames", "/blog", "/contact"];

const useKeyboardNav = () => {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      // Don't trigger when typing in inputs
      const tag = (e.target as HTMLElement).tagName;
      if (tag === "INPUT" || tag === "TEXTAREA" || tag === "SELECT") return;

      const key = e.key;
      if (key >= "1" && key <= "6") {
        e.preventDefault();
        const index = parseInt(key) - 1;
        const route = routes[index];
        if (route && route !== location.pathname) {
          navigate(route);
        }
      }
    };

    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [navigate, location.pathname]);
};

export default useKeyboardNav;
