from pydantic import BaseModel
from datetime import datetime
from typing import Literal

RiskLevel = Literal["normal", "warning", "critical"]

class Prediction(BaseModel):
    locationX: float
    locationY: float
    locationZ: float
    probability: float
    next3Hours: RiskLevel
    next6Hours: RiskLevel
    next12Hours: RiskLevel
    next24Hours: RiskLevel
    timestamp: datetime
