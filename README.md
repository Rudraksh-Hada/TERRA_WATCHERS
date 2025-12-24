TERRA WATCHERS – ROCKFALL PREDICTION & MONITORING DASHBOARD
==========================================================

Terra Watchers is a full-stack web application designed for open-pit mine
safety monitoring and rockfall risk prediction.

It combines a FastAPI backend (sensor simulation + machine learning)
with a React (Vite) dashboard for mine operators, supervisors, and safety
managers.

The system focuses on real-time risk awareness, role-based access, and
data-driven decision making for safer and more sustainable mining
operations.


FEATURES
--------

• Real-time sensor simulation
  - Accelerometer
  - Inclinometer
  - Extensometer
  - Piezometer
  - Sensor data stored in CSV files

• ML-based rockfall risk prediction
  - Continuous prediction updates
  - Risk probability and trend visualization

• Role-based user management
  - Administrator
  - Supervisor
  - Safety Manager
  - Operator

• Authenticated dashboard
  - System status and latest sensor readings
  - Rockfall risk probability and trends
  - Sensor health monitoring
  - Mine information overview

• Deployed backend
  https://terra-watchers-pqh9.onrender.com


TECH STACK
----------

Frontend : React, TypeScript, Vite  
Backend  : FastAPI, Uvicorn, Pydantic  
ML       : scikit-learn, NumPy, pandas  
Storage  : CSV-based data handling  
DevOps   : Git, GitHub, Render  


PROJECT STRUCTURE
-----------------

.
|-- backend/
|   |-- app/
|   |   |-- api/
|   |   |   |-- auth.py          (login & registration)
|   |   |   |-- sensors.py       (sensor readings & health)
|   |   |   |-- predict.py       (rockfall prediction)
|   |   |   |-- mine_info.py     (mine metadata)
|   |   |   |-- settings.py      (app settings)
|   |   |-- models/
|   |   |   |-- rockfall_rf.py   (ML utilities)
|   |   |-- main.py              (FastAPI entry point)
|   |-- data/
|   |   |-- sensors.csv
|   |   |-- sensor_health.csv
|   |   |-- prediction.csv
|   |   |-- users.csv
|   |-- requirements.txt
|
|-- frontend/
    |-- src/
    |   |-- components/
    |   |-- contexts/
    |   |-- pages/
    |   |-- main.tsx
    |   |-- App.tsx
    |-- index.html
    |-- vite.config.ts


LOCAL DEVELOPMENT
-----------------

Backend:
cd backend
pip install -r requirements.txt
uvicorn app.main:app --reload

API URL:
http://127.0.0.1:8000


Frontend:
cd frontend
npm install
npm run dev

App URL:
http://localhost:5173


DEPLOYMENT (RENDER)
-------------------

Backend:
- Root directory: backend
- Build command:
  pip install -r requirements.txt
- Start command:
  uvicorn app.main:app --host 0.0.0.0 --port $PORT

Frontend:
- Root directory: frontend
- Build command:
  npm install && npm run build
- Publish directory: dist
- Environment variable:
  VITE_API_URL=https://terra-watchers-pqh9.onrender.com


USE CASES
---------

• Early warning for rockfall hazards
• Continuous mine safety monitoring
• Sensor health diagnostics
• Decision support for mine safety teams


FUTURE ENHANCEMENTS
-------------------

• Integration with real IoT sensors
• Advanced ML models (LSTM, time-series forecasting)
• Environmental impact analysis using satellite data
• Real-time alerts and notifications

