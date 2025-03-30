
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";
import AssistantChat from "./components/AssistantChat";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Wellness from "./pages/Wellness";
import Emergency from "./pages/Emergency";
import Resources from "./pages/Resources";
import Tracking from "./pages/Tracking";
import Community from "./pages/Community";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import ForgotPassword from "./pages/ForgotPassword";
import Profile from "./pages/Profile";
import { useEffect } from "react";

// Configure React Query client with optimized settings
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
      staleTime: 5 * 60 * 1000, // 5 minutes
    }
  }
});

// Add application metadata
const appMetadata = {
  name: "MomCare",
  description: "Comprehensive support for mothers through pregnancy and early parenthood",
  features: [
    "Personalized tracking of maternal and baby health",
    "Community support and resources",
    "Expert guidance and wellness tools",
    "Emergency information and preparedness"
  ]
};

// Wrap the routes that require authentication with ProtectedRoute
const AppRoutes = () => (
  <Routes>
    <Route path="/" element={<Index />} />
    <Route 
      path="/wellness" 
      element={
        <ProtectedRoute>
          <Wellness />
        </ProtectedRoute>
      } 
    />
    <Route path="/emergency" element={<Emergency />} />
    <Route path="/resources" element={<Resources />} />
    <Route 
      path="/tracking" 
      element={
        <ProtectedRoute>
          <Tracking />
        </ProtectedRoute>
      } 
    />
    <Route 
      path="/community" 
      element={
        <ProtectedRoute>
          <Community />
        </ProtectedRoute>
      } 
    />
    <Route 
      path="/profile" 
      element={
        <ProtectedRoute>
          <Profile />
        </ProtectedRoute>
      } 
    />
    <Route path="/login" element={<Login />} />
    <Route path="/signup" element={<Signup />} />
    <Route path="/forgot-password" element={<ForgotPassword />} />
    {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
    <Route path="*" element={<NotFound />} />
  </Routes>
);

const App = () => {
  // Set document title and metadata
  useEffect(() => {
    document.title = appMetadata.name;
    
    // You could also set meta tags here
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', appMetadata.description);
    } else {
      const meta = document.createElement('meta');
      meta.name = 'description';
      meta.content = appMetadata.description;
      document.head.appendChild(meta);
    }
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <AuthProvider>
            <AppRoutes />
            <AssistantChat />
          </AuthProvider>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
