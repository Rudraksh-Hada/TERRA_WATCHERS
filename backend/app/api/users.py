from fastapi import APIRouter, HTTPException
from pydantic import BaseModel, EmailStr
from pathlib import Path
import csv

router = APIRouter()

BASE_DIR = Path(__file__).resolve().parent.parent.parent  # backend/
DATA_DIR = BASE_DIR / "data"
USERS_FILE = DATA_DIR / "users.csv"


class RegisterUser(BaseModel):
    firstName: str
    lastName: str
    email: EmailStr
    password: str
    employeeId: str


@router.post("/register")
def register_user(user: RegisterUser):
    DATA_DIR.mkdir(exist_ok=True)
    write_header = not USERS_FILE.exists()

    try:
        with open(USERS_FILE, "a", newline="", encoding="utf-8") as f:
            writer = csv.writer(f)
            if write_header:
                writer.writerow(
                    ["firstName", "lastName", "email", "password", "employeeId"]
                )
            writer.writerow(
                [
                    user.firstName,
                    user.lastName,
                    user.email,
                    user.password,
                    user.employeeId,
                ]
            )
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to write user: {e}")

    return {"success": True}
