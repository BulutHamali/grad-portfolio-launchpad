
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import HireMe from "./pages/HireMe";
import NotFound from "./pages/NotFound";
import { PaymentSuccess } from "./pages/PaymentSuccess";
import SingleCellAnalysis from "./pages/projects/SingleCellAnalysis";
import SpatialTranscriptomics from "./pages/projects/SpatialTranscriptomics";
import GenomicVariants from "./pages/projects/GenomicVariants";
import ProteinPrediction from "./pages/projects/ProteinPrediction";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/hire-me" element={<HireMe />} />
          <Route path="/payment-success" element={<PaymentSuccess />} />
          <Route path="/projects/single-cell-analysis" element={<SingleCellAnalysis />} />
          <Route path="/projects/spatial-transcriptomics" element={<SpatialTranscriptomics />} />
          <Route path="/projects/genomic-variants" element={<GenomicVariants />} />
          <Route path="/projects/protein-prediction" element={<ProteinPrediction />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
