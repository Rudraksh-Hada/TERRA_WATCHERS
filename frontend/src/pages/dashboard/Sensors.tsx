import { useSensorData } from "@/hooks/useSensorData";
import React, { useMemo } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

const Sensors: React.FC = () => {
  const { readings, isLoading } = useSensorData();

  // Prepare chart data - get last 50 readings for visualization
  const chartData = useMemo(() => {
    const lastReadings = readings.slice(-50);
    return lastReadings.map((reading, index) => ({
      time: new Date(reading.timestamp).toLocaleTimeString('en-US', { 
        hour: '2-digit', 
        minute: '2-digit',
        second: '2-digit'
      }),
      index,
      accelX: reading.accelerometerX,
      accelY: reading.accelerometerY,
      accelZ: reading.accelerometerZ,
      inclinometer: reading.inclinometer,
      extensometer: reading.extensometer,
      piezometer: reading.piezometer
    }));
  }, [readings]);

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
        <h1 className="text-3xl font-bold">Sensor Readings</h1>
        <p className="text-muted-foreground mt-1">
          Real-time sensor data visualization (updates every 5 seconds)
        </p>
      </div>

      {/* Accelerometer Chart */}
      <Card>
        <CardHeader>
          <CardTitle>Accelerometer (X, Y, Z axes)</CardTitle>
          <CardDescription>Measurements in g (gravitational force)</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
                <XAxis 
                  dataKey="time" 
                  tick={{ fontSize: 10 }}
                  interval="preserveStartEnd"
                  className="fill-muted-foreground"
                />
                <YAxis 
                  tick={{ fontSize: 12 }}
                  domain={[-1.5, 1.5]}
                  className="fill-muted-foreground"
                />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'hsl(var(--card))',
                    border: '1px solid hsl(var(--border))',
                    borderRadius: '8px'
                  }}
                />
                <Legend />
                <Line 
                  type="monotone" 
                  dataKey="accelX" 
                  stroke="hsl(var(--sensor-accel-x))" 
                  strokeWidth={2}
                  dot={false}
                  name="X-axis (g)"
                />
                <Line 
                  type="monotone" 
                  dataKey="accelY" 
                  stroke="hsl(var(--sensor-accel-y))" 
                  strokeWidth={2}
                  dot={false}
                  name="Y-axis (g)"
                />
                <Line 
                  type="monotone" 
                  dataKey="accelZ" 
                  stroke="hsl(var(--sensor-accel-z))" 
                  strokeWidth={2}
                  dot={false}
                  name="Z-axis (g)"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* Inclinometer Chart */}
      <Card>
        <CardHeader>
          <CardTitle>Inclinometer</CardTitle>
          <CardDescription>Tilt angle in degrees</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-[250px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
                <XAxis 
                  dataKey="time" 
                  tick={{ fontSize: 10 }}
                  interval="preserveStartEnd"
                  className="fill-muted-foreground"
                />
                <YAxis 
                  tick={{ fontSize: 12 }}
                  domain={[0, 50]}
                  unit="°"
                  className="fill-muted-foreground"
                />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'hsl(var(--card))',
                    border: '1px solid hsl(var(--border))',
                    borderRadius: '8px'
                  }}
                  formatter={(value: number) => [`${value.toFixed(2)}°`, 'Tilt Angle']}
                />
                <Line 
                  type="monotone" 
                  dataKey="inclinometer" 
                  stroke="hsl(var(--sensor-inclinometer))" 
                  strokeWidth={2}
                  dot={false}
                  fill="hsl(var(--sensor-inclinometer))"
                  fillOpacity={0.1}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* Extensometer Chart */}
      <Card>
        <CardHeader>
          <CardTitle>Extensometer</CardTitle>
          <CardDescription>Displacement in millimeters</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-[250px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
                <XAxis 
                  dataKey="time" 
                  tick={{ fontSize: 10 }}
                  interval="preserveStartEnd"
                  className="fill-muted-foreground"
                />
                <YAxis 
                  tick={{ fontSize: 12 }}
                  domain={[0, 30]}
                  unit=" mm"
                  className="fill-muted-foreground"
                />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'hsl(var(--card))',
                    border: '1px solid hsl(var(--border))',
                    borderRadius: '8px'
                  }}
                  formatter={(value: number) => [`${value.toFixed(2)} mm`, 'Displacement']}
                />
                <Line 
                  type="monotone" 
                  dataKey="extensometer" 
                  stroke="hsl(var(--sensor-extensometer))" 
                  strokeWidth={2}
                  dot={false}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* Piezometer Chart */}
      <Card>
        <CardHeader>
          <CardTitle>Piezometer</CardTitle>
          <CardDescription>Water pressure in kilopascals (kPa)</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-[250px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
                <XAxis 
                  dataKey="time" 
                  tick={{ fontSize: 10 }}
                  interval="preserveStartEnd"
                  className="fill-muted-foreground"
                />
                <YAxis 
                  tick={{ fontSize: 12 }}
                  domain={[0, 400]}
                  unit=" kPa"
                  className="fill-muted-foreground"
                />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'hsl(var(--card))',
                    border: '1px solid hsl(var(--border))',
                    borderRadius: '8px'
                  }}
                  formatter={(value: number) => [`${value.toFixed(1)} kPa`, 'Water Pressure']}
                />
                <Line 
                  type="monotone" 
                  dataKey="piezometer" 
                  stroke="hsl(var(--sensor-piezometer))" 
                  strokeWidth={2}
                  dot={false}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Sensors;
