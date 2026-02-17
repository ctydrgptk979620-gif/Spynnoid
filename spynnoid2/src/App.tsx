import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useIsMobile } from "@/hooks/use-mobile";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import MobileOnlyScreen from "./components/MobileOnlyScreen";

const queryClient = new QueryClient();

const App = () => {
  const isMobile = useIsMobile();

  // Show loading state while checking device type
  if (isMobile === undefined) {
    return null;
  }

  // Show mobile-only screen for desktop users
  if (!isMobile) {
    return <MobileOnlyScreen />;
  }

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
