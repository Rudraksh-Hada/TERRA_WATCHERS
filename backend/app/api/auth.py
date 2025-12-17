from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from pathlib import Path
import csv

router = APIRouter(prefix="", tags=["Auth"])

USERS_CSV = Path("data/users.csv")  # adjust path if needed


# ==== REQUEST MODELS MATCH FRONTEND ====

class LoginRequest(BaseModel):
    email: str
    password: str


class RegisterRequest(BaseModel):
    firstName: str
    lastName: str
    email: str
    password: str
    employeeId: str


# ==== RESPONSE MODELS USED BY FRONTEND ====

class User(BaseModel):
    firstName: str
    lastName: str
    email: str
    employeeId: str
    jobRole: str | None = None


class AuthResponse(BaseModel):
    success: bool
    user: User | None = None


# ====== HELPERS ======

ROLE_MAP = {
    "AD": "Administrator",
    "SV": "Supervisor",
    "SM": "Safety Manager",
    "OP": "Operator",
}


def map_role(employee_id: str) -> str:
    prefix = employee_id[:2]
    return ROLE_MAP.get(prefix, "Employee")


# ====== ROUTES ======

@router.post("/register", response_model=AuthResponse)
def register(req: RegisterRequest):
    """
    Append user to data/users.csv with columns:
    firstName,lastName,email,password,employeeId
    """
    try:
        USERS_CSV.parent.mkdir(parents=True, exist_ok=True)
        file_exists = USERS_CSV.exists()

        with USERS_CSV.open("a", newline="") as f:
            writer = csv.writer(f)

            # optional: write header once
            if not file_exists:
                writer.writerow(
                    ["firstName", "lastName", "email", "password", "employeeId"]
                )

            writer.writerow(
                [
                    req.firstName,
                    req.lastName,
                    req.email,
                    req.password,
                    req.employeeId,
                ]
            )
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to save user: {e}")

    user = User(
        firstName=req.firstName,
        lastName=req.lastName,
        email=req.email,
        employeeId=req.employeeId,
        jobRole=map_role(req.employeeId),
    )
    return AuthResponse(success=True, user=user)


@router.post("/login", response_model=AuthResponse)
def login(req: LoginRequest):
    """
    Validate email+password against data/users.csv.
    """
    if not USERS_CSV.exists():
        raise HTTPException(status_code=401, detail="Invalid email or password")

    try:
        with USERS_CSV.open(newline="") as f:
            reader = csv.reader(f)
            rows = list(reader)

            # skip header if present
            if rows and rows[0] and rows[0][0] == "firstName":
                rows = rows[1:]

            for row in rows:
                # must match the order written in /register
                first_name, last_name, row_email, row_password, employee_id = row
                if row_email == req.email and row_password == req.password:
                    user = User(
                        firstName=first_name,
                        lastName=last_name,
                        email=row_email,
                        employeeId=employee_id,
                        jobRole=map_role(employee_id),
                    )
                    return AuthResponse(success=True, user=user)
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Auth error: {e}")

    # no matching row
    raise HTTPException(status_code=401, detail="Invalid email or password")
