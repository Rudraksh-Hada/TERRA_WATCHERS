import React, { useEffect, useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MapPin, Mountain, Users, Calendar,  Pickaxe , Ruler } from 'lucide-react';
import { fetchMineInfo } from "@/utils/api";
import type { MineInfo as MineInfoType } from "@/types";

const MineInfo: React.FC = () => {
  const [mineInfo, setMineInfo] = useState<MineInfoType | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchMineInfo()
      .then(setMineInfo)
      .catch((err) => console.error("Mine info load failed", err))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return <p className="text-muted-foreground">Loading mine information…</p>;
  }

  if (!mineInfo) {
    return <p className="text-muted-foreground">No mine information available.</p>;
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Mine Information</h1>
        <p className="text-muted-foreground mt-1">
          Details about the mining complex and operations
        </p>
      </div>

       {/* Main Info Card */}
      <Card className="overflow-hidden">
        <div className="bg-primary p-6">
          <div className="flex items-center gap-3">
            <Mountain className="h-10 w-10 text-primary-foreground" />
            <div>
              <h2 className="text-2xl font-bold text-primary-foreground">{mineInfo.name}</h2>
              <div className="flex items-center gap-2 text-primary-foreground/80 mt-1">
                <MapPin className="h-4 w-4" />
                <span>{mineInfo.location}</span>
              </div>
            </div>
          </div>
        </div>
        <CardContent className="pt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Coordinates */}
            <div className="space-y-2">
              <h3 className="font-semibold text-muted-foreground">Coordinates</h3>
              <div className="bg-muted rounded-lg p-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-xs text-muted-foreground">Latitude</p>
                    <p className="font-semibold">{mineInfo.latitude.toFixed(4)}° N</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Longitude</p>
                    <p className="font-semibold">{mineInfo.longitude.toFixed(4)}° E</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Depth */}
            <div className="space-y-2">
              <h3 className="font-semibold text-muted-foreground">Mine Depth</h3>
              <div className="bg-muted rounded-lg p-4 flex items-center gap-4">
                <Ruler className="h-8 w-8 text-primary" />
                <div>
                  <p className="text-2xl font-bold">{mineInfo.depth} meters</p>
                  <p className="text-xs text-muted-foreground">Maximum depth from surface</p>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Elements Extracted */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <Pickaxe className="h-5 w-5 text-primary" />
            <CardTitle>Elements Extracted</CardTitle>
          </div>
          <CardDescription>Primary minerals and ores mined at this facility</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-3">
            {mineInfo.elements.map((element, index) => (
              <Badge 
                key={index} 
                variant="secondary" 
                className="text-lg px-4 py-2"
              >
                {element}
              </Badge>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Operations Info */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="pb-2">
            <div className="flex items-center gap-2">
              <Calendar className="h-5 w-5 text-primary" />
              <CardTitle className="text-lg">Established</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">{mineInfo.established}</p>
            <p className="text-sm text-muted-foreground mt-1">
              {new Date().getFullYear() - parseInt(mineInfo.established)} years of operation
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <div className="flex items-center gap-2">
              <Users className="h-5 w-5 text-primary" />
              <CardTitle className="text-lg">Employees</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">{mineInfo.employees.toLocaleString()}</p>
            <p className="text-sm text-muted-foreground mt-1">Active workforce</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <div className="flex items-center gap-2">
              <Mountain className="h-5 w-5 text-primary" />
              <CardTitle className="text-lg">Daily Production</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">{mineInfo.dailyProduction}</p>
            <p className="text-sm text-muted-foreground mt-1">Average daily output</p>
          </CardContent>
        </Card>
      </div>

      {/* Safety Note */}
      <Card className="bg-primary/5 border-primary">
        <CardContent className="py-4">
          <div className="flex items-start gap-3">
            <div className="bg-primary rounded-full p-2 mt-0.5">
              <Mountain className="h-4 w-4 text-primary-foreground" />
            </div>
            <div>
              <h3 className="font-semibold">Safety First</h3>
              <p className="text-sm text-muted-foreground mt-1">
                This mine is equipped with the Terra Watchers rockfall prediction system, 
                utilizing advanced sensors and AI-powered analysis to ensure the safety 
                of all personnel. Real-time monitoring operates 24/7 with automated alerts.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default MineInfo;
