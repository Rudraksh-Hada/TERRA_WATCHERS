import numpy as np
from sklearn.ensemble import RandomForestRegressor


class RockfallRF:
    def __init__(self):
        self.model = RandomForestRegressor(
            n_estimators=120,
            random_state=42,
        )

        # 🔒 dummy training ONLY ONCE
        X = np.random.rand(500, 6)
        y = np.random.rand(500)  # already in [0, 1]
        self.model.fit(X, y)

    def predict_probability(self, features):
        """Return probability in [0, 1]."""
        raw = float(self.model.predict([features])[0])

        # ✅ clamp to 0–1
        raw = max(0.0, min(1.0, raw))

        # keep as 0–1 probability
        return round(raw, 3)


# ✅ singleton (IMPORTANT)
rf_model = RockfallRF()
