from fastapi import APIRouter
from pathlib import Path
import csv

from app.api.notifications import push_notification  # 👈 add this import

router = APIRouter(prefix="/predict", tags=["Prediction"])

BASE_DIR = Path(__file__).resolve().parent.parent
DATA_DIR = BASE_DIR / "data"
PRED_FILE = DATA_DIR / "prediction.csv"


@router.get("/latest")
def get_latest_prediction():
    if not PRED_FILE.exists():
        return None

    with open(PRED_FILE, newline="", encoding="utf-8") as f:
        reader = list(csv.DictReader(f))
        if not reader:
            return None

        row = reader[-1]

        prediction = {
            "timestamp": row["timestamp"],
            "probability": float(row["probability"]),
            "next3Hours": row["next3Hours"],
            "next6Hours": row["next6Hours"],
            "next12Hours": row["next12Hours"],
            "next24Hours": row["next24Hours"],
            "locationX": float(row["locationX"]),
            "locationY": float(row["locationY"]),
            "locationZ": float(row["locationZ"]),
        }

        # 👇 Connect prediction -> notifications
        risk = row.get("next3Hours") or row.get("next6Hours") or ""
        risk_upper = risk.upper()

        if risk_upper in ("HIGH", "CRITICAL"):
            push_notification(
                level="critical",
                message=(
                    f"Rockfall risk {risk_upper} detected at "
                    f"({prediction['locationX']}, {prediction['locationY']}, {prediction['locationZ']})"
                ),
            )
        elif risk_upper == "MEDIUM":
            push_notification(
                level="warning",
                message=(
                    f"Rockfall risk MEDIUM detected at "
                    f"({prediction['locationX']}, {prediction['locationY']}, {prediction['locationZ']})"
                ),
            )

        return prediction
