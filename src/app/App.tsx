// src/app/App.tsx
import { useState, useEffect } from "react";
import { BrowserRouter } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";

import { ThemeProvider } from "@/contexts/ThemeContext";
import PageLoader from "@/components/layouts/PageLoader";
import { AnimatedRoutes } from "@/app/router/AnimatedRoutes";
import { RootLayout } from "@/app/RootLayout";

const queryClient = new QueryClient();

const App = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1800);
    return () => clearTimeout(timer);
  }, []);

  return (
    <ThemeProvider>
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <AnimatePresence mode='wait'>
            {loading ? (
              <PageLoader key='loader' />
            ) : (
              <motion.div
                key='app'
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
              >
                <BrowserRouter>
                  <RootLayout>
                    <AnimatedRoutes />
                  </RootLayout>
                </BrowserRouter>
              </motion.div>
            )}
          </AnimatePresence>
        </TooltipProvider>
      </QueryClientProvider>
    </ThemeProvider>
  );
};

export default App;