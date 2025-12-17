import csv
import time
import random
from pathlib import Path
from datetime import datetime
import threading

BASE_DIR = Path(__file__).resolve().parent.parent.parent
DATA_DIR = BASE_DIR / "data"
SENSORS_FILE = DATA_DIR / "sensors.csv"

HEADERS = [
    "Timestamp",
    "Accelerometer X (g)",
    "Accelerometer Y (g)",
    "Accelerometer Z (g)",
    "Inclinometer (deg)",
    "Extensometer (mm)",
    "Piezometer (kPa)",
    "Event Type",
]

# ---- stateful baselines for smooth zig-zag ----
_last_ax = random.uniform(0.15, 0.25)
_last_ay = random.uniform(0.15, 0.25)
_last_az = random.uniform(9.7, 9.9)
_last_inc = random.uniform(24, 28)
_last_ext = random.uniform(2.0, 2.5)
_last_piez = random.uniform(150, 180)


def ensure_csv():
    if not SENSORS_FILE.exists():
        DATA_DIR.mkdir(exist_ok=True)
        with open(SENSORS_FILE, "w", newline="", encoding="utf-8") as f:
            writer = csv.writer(f)
            writer.writerow(HEADERS)


def _jitter(value: float, min_v: float, max_v: float, step: float) -> float:
    """Add small random step and clamp to [min_v, max_v]."""
    value += random.uniform(-step, step)
    return max(min_v, min(max_v, value))


def generate_row():
    global _last_ax, _last_ay, _last_az, _last_inc, _last_ext, _last_piez

    # small step changes -> zig-zag but smooth
    _last_ax = _jitter(_last_ax, 0.05, 0.4, 0.03)
    _last_ay = _jitter(_last_ay, 0.05, 0.4, 0.03)
    _last_az = _jitter(_last_az, 9.6, 10.2, 0.05)
    _last_inc = _jitter(_last_inc, 20, 35, 0.5)
    _last_ext = _jitter(_last_ext, 1.5, 3.5, 0.1)
    _last_piez = _jitter(_last_piez, 120, 220, 3)

    return [
        datetime.now().strftime("%Y-%m-%d %H:%M:%S"),
        round(_last_ax, 3),
        round(_last_ay, 3),
        round(_last_az, 3),
        round(_last_inc, 2),
        round(_last_ext, 2),
        round(_last_piez, 1),
        random.choice(["Normal", "Warning", "Critical"]),
    ]


def append_loop():
    ensure_csv()
    while True:
        with open(SENSORS_FILE, "a", newline="", encoding="utf-8") as f:
            writer = csv.writer(f)
            writer.writerow(generate_row())
        time.sleep(5)  # every 5 seconds


def start_sensor_generator():
    thread = threading.Thread(target=append_loop, daemon=True)
    thread.start()
