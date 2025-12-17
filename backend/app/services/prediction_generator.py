import time
import csv
import random
from pathlib import Path
from datetime import datetime
from threading import Thread

from app.models.rockfall_rf import rf_model
from app.api.notifications import push_notification  # 🔔 use your real path

BASE_DIR = Path(__file__).resolve().parent.parent.parent
DATA_DIR = BASE_DIR / "data"

SENSOR_FILE = DATA_DIR / "sensors.csv"
PRED_FILE = DATA_DIR / "prediction.csv"

print("SENSOR_FILE =", SENSOR_FILE.resolve())
print("PRED_FILE   =", PRED_FILE.resolve())

model = rf_model

# ---- state for moving coordinates ----
current_x = 12.5
current_y = 8.3
current_z = -45.0

LAST_COORD_UPDATE = 0
COORD_UPDATE_INTERVAL = 60  # seconds


def _risk_level(prob_percent: float) -> str:
    if prob_percent >= 70:
        return "critical"
    if prob_percent >= 40:
        return "warning"
    return "normal"


def run_prediction_loop():
    global current_x, current_y, current_z, LAST_COORD_UPDATE

    print("Prediction loop started")
    while True:
        try:
            if not SENSOR_FILE.exists():
                print("No sensors.csv yet")
                time.sleep(5)
                continue

            with open(SENSOR_FILE, newline="", encoding="utf-8") as f:
                rows = list(csv.DictReader(f))
                print("Rows read:", len(rows))
                if not rows:
                    time.sleep(5)
                    continue

                last = rows[-1]
                print("Last row:", last)

                features = [
                    float(last["Accelerometer X (g)"]),
                    float(last["Accelerometer Y (g)"]),
                    float(last["Accelerometer Z (g)"]),
                    float(last["Inclinometer (deg)"]),
                    float(last["Extensometer (mm)"]),
                    float(last["Piezometer (kPa)"]),
                ]

                # base probability from model (0–100)
                prob_0_1 = model.predict_probability(features)
                base = max(0.0, min(prob_0_1 * 100, 30.0))
                prob_percent = round(base + random.uniform(-5, 5), 1)
                prob_percent = max(0.0, min(prob_percent, 35.0))
                print("Prob %:", prob_percent)

                risk = _risk_level(prob_percent)

                # 🔔 push notification when a new prediction is generated
                push_notification(
                    risk,
                    f"Rockfall risk is {risk.upper()} ({prob_percent:.1f}%)"
                )

                DATA_DIR.mkdir(exist_ok=True)
                write_header = not PRED_FILE.exists()

                with open(PRED_FILE, "a", newline="", encoding="utf-8") as pf:
                    writer = csv.writer(pf)
                    if write_header:
                        print("Writing header to", PRED_FILE)
                        writer.writerow(
                            [
                                "timestamp",
                                "probability",
                                "next3Hours",
                                "next6Hours",
                                "next12Hours",
                                "next24Hours",
                                "locationX",
                                "locationY",
                                "locationZ",
                            ]
                        )

                    print("Appending row to", PRED_FILE)
                    writer.writerow(
                        [
                            datetime.now().isoformat(),
                            prob_percent,
                            risk,
                            _risk_level(prob_percent + 5),
                            _risk_level(prob_percent + 10),
                            _risk_level(prob_percent + 15),
                            current_x,
                            current_y,
                            current_z,
                        ]
                    )

                # occasionally move the predicted location a bit
                now_ts = time.time()
                if now_ts - LAST_COORD_UPDATE > COORD_UPDATE_INTERVAL:
                    LAST_COORD_UPDATE = now_ts
                    current_x += random.uniform(-1.0, 1.0)
                    current_y += random.uniform(-1.0, 1.0)
                    current_z += random.uniform(-0.5, 0.5)
                    print("Updated coords:", current_x, current_y, current_z)

        except Exception as e:
            print("Prediction error:", e)

        time.sleep(5)


def start_prediction_generator():
    Thread(target=run_prediction_loop, daemon=True).start()
