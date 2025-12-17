from fastapi import APIRouter
import csv
from pathlib import Path
from datetime import datetime

router = APIRouter(prefix="/notifications", tags=["Notifications"])

FILE = Path("data/notifications.csv")
FILE.parent.mkdir(exist_ok=True)

def ensure_file():
    if not FILE.exists():
        with open(FILE, "w", newline="", encoding="utf-8") as f:
            csv.writer(f).writerow(["timestamp", "level", "message"])


@router.get("")
def get_notifications():
    ensure_file()
    with open(FILE, newline="", encoding="utf-8") as f:
        return list(csv.DictReader(f))


def push_notification(level: str, message: str):
    ensure_file()
    with open(FILE, "a", newline="", encoding="utf-8") as f:
        csv.writer(f).writerow([
            datetime.now().isoformat(),
            level,
            message
        ])
