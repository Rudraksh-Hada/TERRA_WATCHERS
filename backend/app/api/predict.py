from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from pathlib import Path
import csv

router = APIRouter(prefix="/predict", tags=["Prediction"])

# __file__ = backend/app/api/predict.py
BASE_DIR = Path(__file__).resolve().parent.parent.parent  # backend/
DATA_DIR = BASE_DIR / "data"                              # backend/data
PRED_FILE = DATA_DIR / "prediction.csv"


class PredictionResponse(BaseModel):
    timestamp: str
    probability: float
    next3Hours: str
    next6Hours: str
    next12Hours: str
    next24Hours: str
    locationX: float
    locationY: float
    locationZ: float


@router.get("", response_model=PredictionResponse)
def get_prediction():
    if not PRED_FILE.exists():
        raise HTTPException(status_code=404, detail="No predictions yet")

    with open(PRED_FILE, newline="", encoding="utf-8") as f:
        rows = list(csv.DictReader(f))
        if not rows:
            raise HTTPException(status_code=404, detail="No predictions yet")

        last = rows[-1]

    return PredictionResponse(
        timestamp=last["timestamp"],
        probability=float(last["probability"]),
        next3Hours=last["next3Hours"],
        next6Hours=last["next6Hours"],
        next12Hours=last["next12Hours"],
        next24Hours=last["next24Hours"],
        locationX=float(last["locationX"]),
        locationY=float(last["locationY"]),
        locationZ=float(last["locationZ"]),
    )
