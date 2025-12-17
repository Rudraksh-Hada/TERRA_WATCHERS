def risk_level(p: float):
    if p < 0.3:
        return "normal"
    if p < 0.6:
        return "warning"
    return "critical"
