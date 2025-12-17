from pydantic import BaseModel
from datetime import datetime

class SensorReading(BaseModel):
    timestamp: datetime
    accelerometerX: float
    accelerometerY: float
    accelerometerZ: float
    inclinometer: float
    extensometer: float
    piezometer: float

class SensorHealth(BaseModel):
    sensorName: str
    batteryLife: int
    accuracy: int
    lastUpdated: datetime
