// User Types
export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  employeeId: string;
  jobRole: string;
  createdAt: string;
}

// Sensor Reading Types
export interface SensorReading {
  timestamp: string;
  accelerometerX: number;
  accelerometerY: number;
  accelerometerZ: number;
  inclinometer: number;
  extensometer: number;
  piezometer: number;
}

// Sensor Health Types
export interface SensorHealth {
  sensorName: string;
  batteryLife: number;
  accuracy: number;
  lastUpdated: string;
}

// Prediction Types
export interface Prediction {
  locationX: number;
  locationY: number;
  locationZ: number;
  probability: number;
  next3Hours: 'normal' | 'critical' | 'warning';
  next6Hours: 'normal' | 'critical' | 'warning';
  next12Hours: 'normal' | 'critical' | 'warning';
  next24Hours: 'normal' | 'critical' | 'warning';
  timestamp: string;
}

// Notification Types
export interface Notification {
  id: string;
  type: 'critical' | 'warning' | 'info';
  title: string;
  message: string;
  timestamp: string;
  read: boolean;
}

// Mine Info Types
export interface MineInfo {
  name: string;
  location: string;
  latitude: number;
  longitude: number;
  elements: string[];
  depth: number;
  established: string;
  employees: number;
  dailyProduction: string;
}

// Settings Types
export interface AppSettings {
  theme: 'light' | 'dark';
  layout: 'desktop' | 'mobile';
  fontSize: 'small' | 'normal' | 'large';
  fontStyle: 'roboto' | 'roman' | 'comic' | 'opensans';
}
