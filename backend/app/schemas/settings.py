from pydantic import BaseModel
from typing import Literal

class AppSettings(BaseModel):
    theme: Literal["light", "dark"]
    layout: Literal["desktop", "mobile"]
    fontSize: Literal["small", "normal", "large"]
    fontStyle: Literal["roboto", "roman", "comic", "opensans"]
