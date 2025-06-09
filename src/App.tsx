
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import ResumeReview from "./pages/ResumeReview";
import CreateInterview from "./pages/CreateInterview";
import InterviewTaking from "./pages/InterviewTaking";
import InterviewReport from "./pages/InterviewReport";
import ResumeReport from "./pages/ResumeReport";
import Analytics from "./pages/Analytics";
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
          <Route path="/" element={<Dashboard />} />
          <Route path="/resume-review" element={<ResumeReview />} />
          <Route path="/resume-report" element={<ResumeReport />} />
          <Route path="/create-interview" element={<CreateInterview />} />
          <Route path="/interview-taking" element={<InterviewTaking />} />
          <Route path="/interview-report" element={<InterviewReport />} />
          <Route path="/analytics" element={<Analytics />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
