import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import MessMenu from "./pages/MessMenu";
import MailSummarizer from "./pages/MailSummarizer";
import LostFound from "./pages/LostFound";
import Marketplace from "./pages/Marketplace";
import CabPool from "./pages/CabPool";
import Explore from "./pages/Explore";
import Timetable from "./pages/Timetable";
import Assignments from "./pages/Assignments";
import PersonalSpace from "./pages/PersonalSpace";
import Settings from "./pages/Settings";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/mess-menu" element={<MessMenu />} />
          <Route path="/mail-summarizer" element={<MailSummarizer />} />
          <Route path="/lost-found" element={<LostFound />} />
          <Route path="/marketplace" element={<Marketplace />} />
          <Route path="/cab-pool" element={<CabPool />} />
          <Route path="/explore" element={<Explore />} />
          <Route path="/timetable" element={<Timetable />} />
          <Route path="/assignments" element={<Assignments />} />
          <Route path="/personal-space" element={<PersonalSpace />} />
          <Route path="/settings" element={<Settings />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
