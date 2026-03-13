import { Suspense } from "react";
import { useLocation, useRoutes } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import useKeyboardNav from "@/hooks/useKeyboardNav";
import { routes } from "@/router/routes";

export const AnimatedRoutes = () => {
  const location = useLocation();
  useKeyboardNav();

  const element = useRoutes(routes);

  return (
    <Suspense fallback={<div className="min-h-screen bg-background" />}>
      <AnimatePresence mode="wait" initial={false}>
        {element}
      </AnimatePresence>
    </Suspense>
  );
};