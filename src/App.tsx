
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import ProtectedRoute from "@/components/auth/ProtectedRoute";

// Pages
import Index from "./pages/Index";
import HowItWorks from "./pages/HowItWorks";
import ForCoaches from "./pages/ForCoaches";
import Pricing from "./pages/Pricing";
import Coaches from "./pages/Coaches";
import Login from "./pages/Login";
import Register from "./pages/Register";
import NotFound from "./pages/NotFound";
import CoachProfile from "./pages/CoachProfile";
import CoachingSession from "./pages/CoachingSession";
import ClientDashboard from "./pages/ClientDashboard";
import AdminDashboard from "./pages/AdminDashboard";
import HRPortal from "./pages/HRPortal";
import HRDashboard from "./pages/HRDashboard";
import CoachDashboard from "./pages/CoachDashboard";
import ReneuCompass from "./pages/ReneuCompass";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            {/* Public routes */}
            <Route path="/" element={<Index />} />
            <Route path="/how-it-works" element={<HowItWorks />} />
            <Route path="/for-coaches" element={<ForCoaches />} />
            <Route path="/pricing" element={<Pricing />} />
            <Route path="/coaches" element={<Coaches />} />
            <Route path="/coaches/:id" element={<CoachProfile />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            
            {/* Protected routes */}
            <Route 
              path="/reneu-compass" 
              element={
                <ProtectedRoute allowedRoles={["client"]}>
                  <ReneuCompass />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/session/:id" 
              element={
                <ProtectedRoute>
                  <CoachingSession />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/dashboard" 
              element={
                <ProtectedRoute allowedRoles={["client"]}>
                  <ClientDashboard />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/coach-dashboard" 
              element={
                <ProtectedRoute allowedRoles={["coach"]}>
                  <CoachDashboard />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/admin" 
              element={
                <ProtectedRoute allowedRoles={["admin"]}>
                  <AdminDashboard />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/hr-portal" 
              element={
                <ProtectedRoute allowedRoles={["hr"]}>
                  <HRPortal />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/hr-dashboard" 
              element={
                <ProtectedRoute allowedRoles={["hr"]}>
                  <HRDashboard />
                </ProtectedRoute>
              } 
            />
            
            {/* Catch-all route */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
