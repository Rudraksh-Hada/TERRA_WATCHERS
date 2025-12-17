from pydantic import BaseModel
from typing import List

class MineInfo(BaseModel):
    name: str
    location: str
    latitude: float
    longitude: float
    elements: List[str]
    depth: int
    established: str
    employees: int
    dailyProduction: str
