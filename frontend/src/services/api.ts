import type {
  User,
  SensorReading,
  SensorHealth,
  Prediction,
  Notification,
  MineInfo,
  AppSettings,
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
  if (!res.ok) throw new Error(await res.text());
  return res.json();
}

export async function fetchSensorHealth(): Promise<SensorHealth[]> {
  const res = await fetch(`${BASE_URL}/sensors/health`);
  if (!res.ok) throw new Error(await res.text());
  return res.json();
}

/* ===============================
   PREDICTION APIs
   =============================== */

export async function getPrediction(
  features: number[]
): Promise<Prediction> {
  const res = await fetch(`${BASE_URL}/predict`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(features),
  });

  if (!res.ok) throw new Error(await res.text());
  return res.json();
}

export async function fetchLatestPrediction(): Promise<Prediction | null> {
  const res = await fetch(`${BASE_URL}/predict`);
  if (!res.ok) return null;
  return res.json();
}

export async function fetchPrediction(): Promise<Prediction | null> {
  return fetchLatestPrediction();
}

/* ===============================
   AUTH & USERS
   =============================== */

/** FastAPI /register should return: { "success": true } on success */
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

  if (!res.ok) {
    const error = await res.json().catch(() => ({}));
    throw new Error(error.detail || "Registration failed");
  }

  return res.json();
}

/** FastAPI /login should return: { "success": true } or { "success": true, "user": {...} } */
export async function loginUser(payload: {
  email: string;
  password: string;
}): Promise<{ success: boolean; user?: User }> {
  const res = await fetch(`${BASE_URL}/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    const error = await res.json().catch(() => ({}));
    throw new Error(error.detail || "Login failed");
  }

  return res.json();
}

/* ===============================
   NOTIFICATIONS
   =============================== */

export async function fetchNotifications(): Promise<Notification[]> {
  const res = await fetch(`${BASE_URL}/notifications`);
  if (!res.ok) throw new Error(await res.text());
  return res.json();
}

/* ===============================
   MINE INFO
   =============================== */

export async function fetchMineInfo(): Promise<MineInfo> {
  const res = await fetch(`${BASE_URL}/mine-info`);
  if (!res.ok) throw new Error(await res.text());
  return res.json();
}

/* ===============================
   SETTINGS
   =============================== */

export async function saveAppSettings(
  settings: AppSettings
): Promise<AppSettings> {
  const res = await fetch(`${BASE_URL}/settings`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(settings),
  });

  if (!res.ok) throw new Error(await res.text());
  return res.json();
}
