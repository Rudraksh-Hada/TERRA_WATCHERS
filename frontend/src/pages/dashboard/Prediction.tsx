import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { MapPin, Clock, AlertTriangle, TrendingUp } from 'lucide-react';
import { useSensorData } from '@/hooks/useSensorData';
import { cn } from '@/lib/utils';

const Prediction: React.FC = () => {
  const { prediction, isLoading } = useSensorData();

  const normalizeLevel = (level?: string) =>
    level?.toLowerCase() ?? 'normal';

  const getRiskStyle = (level?: string) => {
    switch (normalizeLevel(level)) {
      case 'normal':
        return {
          bg: 'bg-[hsl(var(--alert-normal))]',
          text: 'text-white',
          label: 'Normal'
        };
      case 'critical':
        return {
          bg: 'bg-[hsl(var(--alert-warning))]',
          text: 'text-white',
          label: 'Critical'
        };
      case 'warning':
        return {
          bg: 'bg-[hsl(var(--alert-critical))]',
          text: 'text-white',
          label: 'Warning'
        };
      default:
        return {
          bg: 'bg-muted',
          text: 'text-foreground',
          label: 'Unknown'
        };
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!prediction) {
    return (
      <Card>
        <CardContent className="p-6 text-center">
          <p className="text-muted-foreground">Waiting for prediction data…</p>
        </CardContent>
      </Card>
    );
  }

  const timeframes = [
    { label: 'Next 3 Hours', value: prediction.next3Hours, icon: Clock },
    { label: 'Next 6 Hours', value: prediction.next6Hours, icon: Clock },
    { label: 'Next 12 Hours', value: prediction.next12Hours, icon: Clock },
    { label: 'Next 24 Hours', value: prediction.next24Hours, icon: Clock },
  ];

  // 🔒 SAFE FALLBACKS (backend doesn’t provide these yet)
    const timestamp = prediction.timestamp
    ? new Date(prediction.timestamp).toLocaleString()
    : new Date().toLocaleString();

  const locationX = prediction.locationX ?? 0;
  const locationY = prediction.locationY ?? 0;
  const locationZ = prediction.locationZ ?? 0;


  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Rockfall Prediction</h1>
        <p className="text-muted-foreground mt-1">
          AI-powered analysis using Random Forest model
        </p>
      </div>

      <Card className="border-2">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5" />
                Current Risk Assessment
              </CardTitle>
              <CardDescription>
                Last updated: {timestamp}
              </CardDescription>
            </div>
            <Badge
              className={cn(
                'text-lg px-4 py-2',
                getRiskStyle(prediction.next3Hours).bg,
                getRiskStyle(prediction.next3Hours).text
              )}
            >
              {prediction.probability.toFixed(1)}% Probability
            </Badge>
          </div>
        </CardHeader>

        <CardContent>
          <div className="bg-muted rounded-lg p-4 mb-6">
            <div className="flex items-center gap-2 mb-3">
              <MapPin className="h-5 w-5 text-primary" />
              <h3 className="font-semibold">Predicted Location</h3>
            </div>
            <div className="grid grid-cols-3 gap-4 text-center">
              <div className="bg-card rounded-md p-3 shadow-sm">
                <p className="text-xs text-muted-foreground">X Coordinate</p>
                <p className="text-xl font-bold">{locationX.toFixed(1)} m</p>
              </div>
              <div className="bg-card rounded-md p-3 shadow-sm">
                <p className="text-xs text-muted-foreground">Y Coordinate</p>
                <p className="text-xl font-bold">{locationY.toFixed(1)} m</p>
              </div>
              <div className="bg-card rounded-md p-3 shadow-sm">
                <p className="text-xs text-muted-foreground">Z Coordinate (Depth)</p>
                <p className="text-xl font-bold">{locationZ.toFixed(1)} m</p>
              </div>
            </div>
          </div>

          <div>
            <div className="flex items-center gap-2 mb-4">
              <AlertTriangle className="h-5 w-5 text-primary" />
              <h3 className="font-semibold">Risk Level by Timeframe</h3>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {timeframes.map((tf, index) => {
                const style = getRiskStyle(tf.value);
                return (
                  <div
                    key={index}
                    className={cn(
                      'rounded-lg p-4 text-center transition-transform hover:scale-105',
                      style.bg,
                      style.text
                    )}
                  >
                    <tf.icon className="h-6 w-6 mx-auto mb-2 opacity-80" />
                    <p className="text-sm opacity-90">{tf.label}</p>
                    <p className="text-xl font-bold mt-1">{style.label}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </CardContent>
      </Card>
       {/* Legend */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Alert Level Legend</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="flex items-center gap-3 p-3 rounded-lg bg-[hsl(var(--alert-normal))]/10 border border-[hsl(var(--alert-normal))]">
              <div className="h-4 w-4 rounded-full bg-[hsl(var(--alert-normal))]" />
              <div>
                <p className="font-semibold text-[hsl(var(--alert-normal))]">Normal</p>
                <p className="text-xs text-muted-foreground">Safe operating conditions</p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-3 rounded-lg bg-[hsl(var(--alert-warning))]/10 border border-[hsl(var(--alert-warning))]">
              <div className="h-4 w-4 rounded-full bg-[hsl(var(--alert-warning))]" />
              <div>
                <p className="font-semibold text-[hsl(var(--alert-warning))]">Critical</p>
                <p className="text-xs text-muted-foreground">Increased monitoring required</p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-3 rounded-lg bg-[hsl(var(--alert-critical))]/10 border border-[hsl(var(--alert-critical))]">
              <div className="h-4 w-4 rounded-full bg-[hsl(var(--alert-critical))]" />
              <div>
                <p className="font-semibold text-[hsl(var(--alert-critical))]">Warning</p>
                <p className="text-xs text-muted-foreground">Immediate action required</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Prediction;
