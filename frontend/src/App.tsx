import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import { SettingsProvider } from "@/contexts/SettingsContext";


// Pages
import Login from "./pages/Login";
import Register from "./pages/Register";
import DashboardLayout from "./components/layout/DashboardLayout";
import Home from "./pages/dashboard/Home";
import Prediction from "./pages/dashboard/Prediction";
import Sensors from "./pages/dashboard/Sensors";
import SensorHealth from "./pages/dashboard/SensorHealth";
import MineInfo from "./pages/dashboard/MineInfo";
import Settings from "./pages/dashboard/Settings";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <BrowserRouter>
      <AuthProvider>
        <SettingsProvider>
          
            <TooltipProvider>
              <Toaster />
              <Sonner />

              <Routes>
                {/* Auth Routes */}
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />

                {/* Dashboard Routes */}
                <Route path="/dashboard" element={<DashboardLayout />}>
                  <Route index element={<Home />} />
                  <Route path="prediction" element={<Prediction />} />
                  <Route path="sensors" element={<Sensors />} />
                  <Route path="health" element={<SensorHealth />} />
                  <Route path="mine-info" element={<MineInfo />} />
                  <Route path="settings" element={<Settings />} />
                </Route>

                {/* Redirects */}
                <Route path="/" element={<Navigate to="/login" replace />} />

                {/* 404 */}
                <Route path="*" element={<NotFound />} />
              </Routes>
            </TooltipProvider>
          
        </SettingsProvider>
      </AuthProvider>
    </BrowserRouter>
  </QueryClientProvider>
);

export default App;
