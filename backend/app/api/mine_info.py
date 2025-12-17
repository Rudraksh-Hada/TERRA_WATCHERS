from fastapi import APIRouter

router = APIRouter(prefix="/mine-info", tags=["Mine Info"])

@router.get("")
def get_mine_info():
    return {
        "name": "Terra Alpha Mine",
        "location": "Rajasthan, India",
        "latitude": 26.9124,
        "longitude": 75.7873,
        "elements": ["Iron", "Copper", "Bauxite"],
        "depth": 320,
        "established": "1998",
        "employees": 1240,
        "dailyProduction": "850 tons"
    }
