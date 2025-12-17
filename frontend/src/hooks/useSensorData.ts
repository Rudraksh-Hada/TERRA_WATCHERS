import { useEffect, useState } from "react";
import {
  fetchSensorReadings,
  fetchSensorHealth,
  fetchPrediction,
} from "@/utils/api";
import type { SensorReading, SensorHealth, Prediction } from "@/types";

export function useSensorData() {
  const [readings, setReadings] = useState<SensorReading[]>([]);
  const [sensorHealth, setSensorHealth] = useState<SensorHealth[]>([]);
  const [prediction, setPrediction] = useState<Prediction | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let alive = true;

    const loadData = async () => {
      try {
        const readingsData = await fetchSensorReadings();
        const healthData = await fetchSensorHealth();

        const validReadings = readingsData.filter(
          (r) =>
            r.timestamp &&
            Number.isFinite(r.accelerometerX) &&
            Number.isFinite(r.accelerometerY) &&
            Number.isFinite(r.accelerometerZ) &&
            Number.isFinite(r.inclinometer) &&
            Number.isFinite(r.extensometer) &&
            Number.isFinite(r.piezometer)
        );

        if (!alive) return;

        setReadings(validReadings);
        setSensorHealth(healthData);

        if (validReadings.length > 0) {
          const pred = await fetchPrediction(); // GET /predict
          setPrediction(pred);
        } else {
          setPrediction(null);
        }
      } catch (err) {
        console.error("Sensor hook error:", err);
      } finally {
        if (alive) setIsLoading(false);
      }
    };

    loadData();
    const timer = setInterval(loadData, 5000);

    return () => {
      alive = false;
      clearInterval(timer);
    };
  }, []);

  return {
    readings,
    sensorHealth,
    prediction,
    latestReading: readings.length ? readings[readings.length - 1] : null,
    isLoading,
  };
}
