import React from "react";
import { Link } from "react-router-dom";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Activity,
  AlertTriangle,
  ArrowRight,
  Gauge,
} from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { useSensorData } from "@/hooks/useSensorData";

const Home: React.FC = () => {
  const { user } = useAuth();
  const { latestReading, prediction, isLoading } = useSensorData();

  /* ===============================
     DERIVED STATES (SAFE & STABLE)
     =============================== */

  const systemStatus: "online" | "warning" | "offline" =
    prediction?.riskLevel === "critical"
      ? "warning"
      : prediction?.riskLevel === "warning"
      ? "warning"
      : "online";

  const riskLevel = prediction?.riskLevel ?? "normal";

  /* ===============================
     UI HELPERS
     =============================== */

  const getStatusColor = (status: string) => {
    switch (status) {
      case "online":
        return "bg-green-500";
      case "warning":
        return "bg-yellow-500";
      case "offline":
        return "bg-red-500";
      default:
        return "bg-muted";
    }
  };

  const getRiskBadge = (level: string) => {
    switch (level) {
      case "normal":
        return <Badge className="bg-green-500 text-white">Normal</Badge>;
      case "warning":
        return <Badge className="bg-yellow-500 text-white">Warning</Badge>;
      case "critical":
        return <Badge className="bg-red-500 text-white">Critical</Badge>;
      default:
        return <Badge>Unknown</Badge>;
    }
  };

  /* ===============================
     LOADING STATE
     =============================== */

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  /* ===============================
     RENDER
     =============================== */

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="bg-card rounded-xl p-6 shadow-md">
        <h1 className="text-3xl font-bold text-foreground">
          Welcome back, {user?.firstName}!
        </h1>
        <p className="text-muted-foreground mt-2">
          Here's your mining safety overview for today.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* System Status */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              System Status
            </CardTitle>
            <Activity className="h-5 w-5 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-3">
              <div className={`h-4 w-4 rounded-full ${getStatusColor(systemStatus)} animate-pulse`} />
              <span className="text-2xl font-bold capitalize">{systemStatus}</span>
            </div>
            <p className="text-xs text-muted-foreground mt-2">
              All sensors operational
            </p>
          </CardContent>
        </Card>

        {/* Latest Reading */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Latest Reading
            </CardTitle>
            <Gauge className="h-5 w-5 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            {latestReading ? (
              <div className="space-y-1">
                <div className="flex justify-between text-sm">
                  <span>Inclinometer:</span>
                  <span className="font-semibold">{latestReading.inclinometer.toFixed(2)}°</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Extensometer:</span>
                  <span className="font-semibold">{latestReading.extensometer.toFixed(2)} mm</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Piezometer:</span>
                  <span className="font-semibold">{latestReading.piezometer.toFixed(1)} kPa</span>
                </div>
              </div>
            ) : (
              <p className="text-muted-foreground">No data available</p>
            )}
          </CardContent>
        </Card>

        {/* Current Risk Level */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Current Risk Level
            </CardTitle>
            <AlertTriangle className="h-5 w-5 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-3">
              {getRiskBadge(riskLevel)}
              {prediction && (
                <span className="text-lg font-semibold">
                  {prediction.probability.toFixed(1)}% probability
                </span>
              )}
            </div>
            <p className="text-xs text-muted-foreground mt-2">
              Based on current sensor readings
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
          <CardDescription>Access key features of the prediction system</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Link to="/dashboard/prediction">
              <Button variant="outline" className="w-full justify-between h-auto py-4">
                <div className="flex flex-col items-start">
                  <span className="font-semibold">View Predictions</span>
                  <span className="text-xs text-muted-foreground">Detailed rockfall analysis</span>
                </div>
                <ArrowRight className="h-5 w-5" />
              </Button>
            </Link>
            <Link to="/dashboard/sensors">
              <Button variant="outline" className="w-full justify-between h-auto py-4">
                <div className="flex flex-col items-start">
                  <span className="font-semibold">Sensor Readings</span>
                  <span className="text-xs text-muted-foreground">Real-time sensor data</span>
                </div>
                <ArrowRight className="h-5 w-5" />
              </Button>
            </Link>
            <Link to="/dashboard/health">
              <Button variant="outline" className="w-full justify-between h-auto py-4">
                <div className="flex flex-col items-start">
                  <span className="font-semibold">Sensor Health</span>
                  <span className="text-xs text-muted-foreground">Battery & accuracy status</span>
                </div>
                <ArrowRight className="h-5 w-5" />
              </Button>
            </Link>
            <Link to="/dashboard/mine-info">
              <Button variant="outline" className="w-full justify-between h-auto py-4">
                <div className="flex flex-col items-start">
                  <span className="font-semibold">Mine Information</span>
                  <span className="text-xs text-muted-foreground">Location & operations</span>
                </div>
                <ArrowRight className="h-5 w-5" />
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Home;
