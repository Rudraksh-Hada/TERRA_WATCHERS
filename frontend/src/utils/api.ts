import type {
  SensorReading,
  SensorHealth,
  Prediction,
  Notification,
  MineInfo,
  AppSettings,
  User,
} from "@/types";

/* ===============================
   BASE CONFIG
   =============================== */

const BASE_URL =
  import.meta.env.VITE_API_URL || "http://127.0.0.1:8000";

/* ===============================
   SENSOR APIs
   =============================== */

export async function fetchSensorReadings(): Promise<SensorReading[]> {
  const res = await fetch(`${BASE_URL}/sensors/readings`);
  if (!res.ok) throw new Error("Failed to fetch sensor readings");
  return res.json();
}

export async function fetchSensorHealth(): Promise<SensorHealth[]> {
  const res = await fetch(`${BASE_URL}/sensors/health`);
  if (!res.ok) throw new Error("Failed to fetch sensor health");
  return res.json();
}

/* ===============================
   PREDICTION
   =============================== */

export async function getPrediction(
  features: number[]
): Promise<Prediction> {
  const res = await fetch(`${BASE_URL}/predict`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(features),
  });

  if (!res.ok) throw new Error("Prediction failed");
  return res.json();
}

// ✅ NEW: read from prediction.csv via GET /predict
export async function fetchPrediction(): Promise<Prediction | null> {
  const res = await fetch(`${BASE_URL}/predict`);
  if (!res.ok) return null;
  return res.json();
}

/* ===============================
   AUTH
   =============================== */

export async function registerUser(payload: {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  employeeId: string;
}): Promise<{ success: boolean }> {
  const res = await fetch(`${BASE_URL}/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  if (!res.ok) throw new Error("Registration failed");
  return res.json();
}

/* ===============================
   MISC
   =============================== */

export async function fetchMineInfo(): Promise<MineInfo> {
  const res = await fetch(`${BASE_URL}/mine-info`);
  if (!res.ok) throw new Error("Failed to fetch mine info");
  return res.json();
}

export async function fetchNotifications(): Promise<Notification[]> {
  const res = await fetch(`${BASE_URL}/notifications`);
  if (!res.ok) throw new Error("Failed to fetch notifications");
  return res.json();
}

export async function saveAppSettings(
  settings: AppSettings
): Promise<AppSettings> {
  const res = await fetch(`${BASE_URL}/settings`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(settings),
  });

  if (!res.ok) throw new Error("Failed to save settings");
  return res.json();
}
