import random
from datetime import datetime

def generate_sensor_reading():
    return {
        "timestamp": datetime.utcnow(),
        "accelerometerX": random.uniform(0, 2),
        "accelerometerY": random.uniform(0, 2),
        "accelerometerZ": random.uniform(0, 2),
        "inclinometer": random.uniform(0, 3),
        "extensometer": random.uniform(0, 3),
        "piezometer": random.uniform(0, 100),
    }
