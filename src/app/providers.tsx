"use client";

import { ReactNode, useState } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { CartProvider } from "@/hooks/useCart";
import CartDrawer from "@/components/cart/CartDrawer";
import ScrollToTop from "@/components/ScrollToTop";

interface ProvidersProps {
  children: ReactNode;
}

const Providers = ({ children }: ProvidersProps) => {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <QueryClientProvider client={queryClient}>
      <CartProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <ScrollToTop />
          <CartDrawer />
          {children}
        </TooltipProvider>
      </CartProvider>
    </QueryClientProvider>
  );
};

export default Providers;
