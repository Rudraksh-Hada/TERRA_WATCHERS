from pydantic import BaseModel
from datetime import datetime

class User(BaseModel):
    id: str
    firstName: str
    lastName: str
    email: str
    password: str
    employeeId: str
    jobRole: str
    createdAt: datetime
