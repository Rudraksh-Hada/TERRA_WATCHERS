import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Battery, Target, AlertCircle } from "lucide-react";
import { useSensorData } from "@/hooks/useSensorData";
import { cn } from "@/lib/utils";

const SensorHealth: React.FC = () => {
  const { sensorHealth, isLoading } = useSensorData();

  const getBatteryColor = (level: number): string => {
    if (level > 50) return 'bg-[hsl(var(--alert-normal))]';
    if (level > 25) return 'bg-[hsl(var(--alert-warning))]';
    return 'bg-[hsl(var(--alert-critical))]';
  };

  const getBatteryStatus = (level: number): string => {
    if (level > 50) return 'Good';
    if (level > 25) return 'Low';
    return 'Critical';
  };

  const getAccuracyColor = (accuracy: number): string => {
    if (accuracy > 95) return 'text-[hsl(var(--alert-normal))]';
    if (accuracy > 90) return 'text-[hsl(var(--alert-warning))]';
    return 'text-[hsl(var(--alert-critical))]';
  };

  const getSensorIcon = (name: string) => {
    // Color mapping for each sensor type
    const colors: Record<string, string> = {
      'Accelerometer': 'hsl(var(--sensor-accel-z))',
      'Inclinometer': 'hsl(var(--sensor-inclinometer))',
      'Extensometer': 'hsl(var(--sensor-extensometer))',
      'Piezometer': 'hsl(var(--sensor-piezometer))'
    };
    return colors[name] || 'hsl(var(--primary))';
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Sensor Health</h1>
        <p className="text-muted-foreground mt-1">
          Monitor battery life and accuracy of all sensors
        </p>
      </div>

      {/* Info Banner */}
      <Card className="bg-primary/10 border-primary">
        <CardContent className="flex items-center gap-3 py-4">
          <AlertCircle className="h-5 w-5 text-primary" />
          <p className="text-sm">
            Sensor batteries are rated for 48 hours of continuous operation. 
            Accuracy is factored into the prediction model for reliable results.
          </p>
        </CardContent>
      </Card>

      {/* Sensor Health Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {sensorHealth.map((sensor) => (
          <Card key={sensor.sensorName} className="overflow-hidden">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div 
                    className="h-4 w-4 rounded-full"
                    style={{ backgroundColor: getSensorIcon(sensor.sensorName) }}
                  />
                  <CardTitle className="text-xl">{sensor.sensorName}</CardTitle>
                </div>
                <Badge variant="outline">
                  {new Date(sensor.lastUpdated).toLocaleTimeString()}
                </Badge>
              </div>
              <CardDescription>Last updated</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Battery Life */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Battery className="h-5 w-5 text-muted-foreground" />
                    <span className="font-medium">Battery Life</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-2xl font-bold">{sensor.batteryLife.toFixed(1)}%</span>
                    <Badge 
                      variant="secondary"
                      className={cn(
                        'text-xs',
                        sensor.batteryLife > 50 && 'bg-[hsl(var(--alert-normal))]/20 text-[hsl(var(--alert-normal))]',
                        sensor.batteryLife <= 50 && sensor.batteryLife > 25 && 'bg-[hsl(var(--alert-warning))]/20 text-[hsl(var(--alert-warning))]',
                        sensor.batteryLife <= 25 && 'bg-[hsl(var(--alert-critical))]/20 text-[hsl(var(--alert-critical))]'
                      )}
                    >
                      {getBatteryStatus(sensor.batteryLife)}
                    </Badge>
                  </div>
                </div>
                <Progress 
                  value={sensor.batteryLife} 
                  className="h-3"
                />
                <p className="text-xs text-muted-foreground">
                  Estimated time remaining: {Math.round((sensor.batteryLife / 100) * 48)} hours
                </p>
              </div>

              {/* Accuracy */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Target className="h-5 w-5 text-muted-foreground" />
                    <span className="font-medium">Sensor Accuracy</span>
                  </div>
                  <span className={cn('text-2xl font-bold', getAccuracyColor(sensor.accuracy))}>
                    {sensor.accuracy.toFixed(1)}%
                  </span>
                </div>
                <Progress 
                  value={sensor.accuracy} 
                  className="h-3"
                />
                <p className="text-xs text-muted-foreground">
                  {sensor.accuracy > 95 
                    ? 'Excellent sensor performance'
                    : sensor.accuracy > 90 
                      ? 'Good sensor performance'
                      : 'Calibration may be required'}
                </p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Summary Card */}
      <Card>
        <CardHeader>
          <CardTitle>System Summary</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center p-4 bg-muted rounded-lg">
              <p className="text-3xl font-bold text-primary">
                {sensorHealth.length}
              </p>
              <p className="text-sm text-muted-foreground">Total Sensors</p>
            </div>
            <div className="text-center p-4 bg-muted rounded-lg">
              <p className="text-3xl font-bold text-[hsl(var(--alert-normal))]">
                {sensorHealth.filter(s => s.batteryLife > 25).length}
              </p>
              <p className="text-sm text-muted-foreground">Healthy Battery</p>
            </div>
            <div className="text-center p-4 bg-muted rounded-lg">
              <p className="text-3xl font-bold">
                {(sensorHealth.reduce((sum, s) => sum + s.accuracy, 0) / sensorHealth.length).toFixed(1)}%
              </p>
              <p className="text-sm text-muted-foreground">Avg Accuracy</p>
            </div>
            <div className="text-center p-4 bg-muted rounded-lg">
              <p className="text-3xl font-bold">
                {(sensorHealth.reduce((sum, s) => sum + s.batteryLife, 0) / sensorHealth.length).toFixed(1)}%
              </p>
              <p className="text-sm text-muted-foreground">Avg Battery</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SensorHealth;
