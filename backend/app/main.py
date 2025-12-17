import pandas as pd
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.api import sensors, predict, mine_info, users, settings, auth, notifications
from app.services.sensor_generator import start_sensor_generator
from app.services.prediction_generator import start_prediction_generator


app = FastAPI(title="Terra Watchers API")

# CORS (required for frontend)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# REGISTER ROUTERS
app.include_router(sensors.router)
app.include_router(predict.router)
app.include_router(mine_info.router)
app.include_router(users.router)
app.include_router(settings.router)
app.include_router(auth.router)          # /login, /register
app.include_router(notifications.router) # /notifications  ✅

# 🔥 start background generators when app imports
start_sensor_generator()
start_prediction_generator()

CSV_PATH = "data/sensors.csv"

def load_csv():
    df = pd.read_csv(CSV_PATH)
    df["Timestamp"] = pd.to_datetime(df["Timestamp"])
    return df

@app.get("/")
def root():
    return {"status": "Backend running"}
