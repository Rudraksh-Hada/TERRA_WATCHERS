import csv
import json
from datetime import datetime
from pathlib import Path
from typing import List

from app.schemas.sensor import SensorReading, SensorHealth
from app.schemas.user import User
from app.schemas.mine import MineInfo
from app.schemas.settings import AppSettings
from app.schemas.prediction import Prediction


# ===============================
# BASE DATA PATH
# ===============================

BASE_DIR = Path(__file__).resolve().parent.parent.parent
DATA_DIR = BASE_DIR / "data"

# ===============================
# SENSOR DATA
# ===============================

def load_sensor_readings() -> List[SensorReading]:
    """
    Load sensor readings from CSV.
    """
    file_path = DATA_DIR / "sensors.csv"
    readings: List[SensorReading] = []

    if not file_path.exists():
        return readings

    with open(file_path, newline="", encoding="utf-8") as file:
        reader = csv.DictReader(file)
        for row in reader:
            readings.append(
                SensorReading(
                    timestamp=datetime.fromisoformat(row["timestamp"]),
                    accelerometerX=float(row["accelerometerX"]),
                    accelerometerY=float(row["accelerometerY"]),
                    accelerometerZ=float(row["accelerometerZ"]),
                    inclinometer=float(row["inclinometer"]),
                    extensometer=float(row["extensometer"]),
                    piezometer=float(row["piezometer"]),
                )
            )
    return readings


def load_sensor_health() -> List[SensorHealth]:
    """
    Load sensor health information.
    """
    file_path = DATA_DIR / "sensor_health.csv"
    health_list: List[SensorHealth] = []

    if not file_path.exists():
        return health_list

    with open(file_path, newline="", encoding="utf-8") as file:
        reader = csv.DictReader(file)
        for row in reader:
            health_list.append(
                SensorHealth(
                    sensorName=row["sensorName"],
                    batteryLife=int(row["batteryLife"]),
                    accuracy=int(row["accuracy"]),
                    lastUpdated=datetime.fromisoformat(row["lastUpdated"]),
                )
            )
    return health_list

# ===============================
# USER DATA
# ===============================

def load_users() -> List[User]:
    """
    Load users from CSV.
    """
    file_path = DATA_DIR / "users.csv"
    users: List[User] = []

    if not file_path.exists():
        return users

    with open(file_path, newline="", encoding="utf-8") as file:
        reader = csv.DictReader(file)
        for row in reader:
            users.append(
                User(
                    id=row["id"],
                    firstName=row["firstName"],
                    lastName=row["lastName"],
                    email=row["email"],
                    password=row["password"],
                    employeeId=row["employeeId"],
                    jobRole=row["jobRole"],
                    createdAt=datetime.fromisoformat(row["createdAt"]),
                )
            )
    return users

# ===============================
# MINE INFO
# ===============================

def load_mine_info() -> MineInfo:
    """
    Load mine information from JSON.
    """
    file_path = DATA_DIR / "mine_info.json"

    if not file_path.exists():
        raise FileNotFoundError("mine_info.json not found")

    with open(file_path, encoding="utf-8") as file:
        data = json.load(file)
        return MineInfo(**data)

# ===============================
# SETTINGS
# ===============================

def load_settings() -> AppSettings:
    """
    Load application settings.
    """
    file_path = DATA_DIR / "settings.json"

    if not file_path.exists():
        return AppSettings(
            theme="light",
            layout="desktop",
            fontSize="normal",
            fontStyle="roboto",
        )

    with open(file_path, encoding="utf-8") as file:
        data = json.load(file)
        return AppSettings(**data)


def save_settings(settings: AppSettings) -> None:
    """
    Save application settings.
    """
    file_path = DATA_DIR / "settings.json"
    with open(file_path, "w", encoding="utf-8") as file:
        json.dump(settings.dict(), file, indent=2)


# ===============================
# PREDICTIONS
# ===============================

def load_predictions() -> list[Prediction]:
    """
    Load historical predictions from CSV.
    """
    file_path = DATA_DIR / "predictions.csv"
    predictions: list[Prediction] = []

    if not file_path.exists():
        return predictions

    with open(file_path, newline="", encoding="utf-8") as file:
        reader = csv.DictReader(file)
        for row in reader:
            predictions.append(
                Prediction(
                    timestamp=datetime.fromisoformat(
                        row["timestamp"].replace("Z", "")
                    ),
                    locationX=float(row["locationX"]),
                    locationY=float(row["locationY"]),
                    locationZ=float(row["locationZ"]),
                    probability=float(row["probability"]),
                    next3Hours=row["next3Hours"],
                    next6Hours=row["next6Hours"],
                    next12Hours=row["next12Hours"],
                    next24Hours=row["next24Hours"],
                )
            )
    return predictions