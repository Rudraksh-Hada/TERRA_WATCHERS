from pydantic import BaseModel
from datetime import datetime
from typing import Literal

class Notification(BaseModel):
    id: str
    type: Literal["critical", "warning", "info"]
    title: str
    message: str
    timestamp: datetime
    read: bool
