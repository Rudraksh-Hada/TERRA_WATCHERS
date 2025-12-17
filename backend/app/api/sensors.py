from fastapi import APIRouter
from pathlib import Path
import csv
from datetime import datetime

router = APIRouter(prefix="/sensors", tags=["Sensors"])

BASE_DIR = Path(__file__).resolve().parent.parent.parent
DATA_DIR = BASE_DIR / "data"

SENSORS_FILE = DATA_DIR / "sensors.csv"
SENSOR_HEALTH_FILE = DATA_DIR / "sensor_health.csv"


def parse_float(value):
    try:
        return float(str(value).strip())
    except Exception:
        return None


def parse_timestamp(value):
    try:
        return datetime.strptime(value, "%Y-%m-%d %H:%M:%S").isoformat()
    except Exception:
        return None


@router.get("/readings")
def get_sensor_readings():
    if not SENSORS_FILE.exists():
        return []

    data = []

    with open(SENSORS_FILE, newline="", encoding="utf-8") as f:
        reader = csv.DictReader(f)

        for row in reader:
            timestamp = parse_timestamp(row.get("Timestamp"))

            if not timestamp:
                continue

            ax = parse_float(row.get("Accelerometer X (g)"))
            ay = parse_float(row.get("Accelerometer Y (g)"))
            az = parse_float(row.get("Accelerometer Z (g)"))
            inc = parse_float(row.get("Inclinometer (deg)"))
            ext = parse_float(row.get("Extensometer (mm)"))
            piezo = parse_float(row.get("Piezometer (kPa)"))

            if None in (ax, ay, az, inc, ext, piezo):
                continue

            data.append({
                "timestamp": timestamp,
                "accelerometerX": ax,
                "accelerometerY": ay,
                "accelerometerZ": az,
                "inclinometer": inc,
                "extensometer": ext,
                "piezometer": piezo,
            })

    return data


@router.get("/health")
def get_sensor_health():
    if not SENSOR_HEALTH_FILE.exists():
        return []

    data = []

    with open(SENSOR_HEALTH_FILE, newline="", encoding="utf-8") as f:
        reader = csv.DictReader(f)

        for row in reader:
            battery = parse_float(row.get("batteryLife"))
            accuracy = parse_float(row.get("accuracy"))

            if battery is None or accuracy is None:
                continue

            data.append({
                "sensorName": row.get("sensorName", "Unknown"),
                "batteryLife": battery,
                "accuracy": accuracy,
                "lastUpdated": row.get("lastUpdated", ""),
            })

    return data
