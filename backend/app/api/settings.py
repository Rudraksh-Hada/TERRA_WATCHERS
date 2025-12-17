from fastapi import APIRouter
from app.schemas.settings import AppSettings

router = APIRouter()

@router.post("/settings")
def save_settings(settings: AppSettings):
    return settings
