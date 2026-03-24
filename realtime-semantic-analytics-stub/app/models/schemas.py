# filepath: D:\Project 1\realtime-semantic-analytics-stub\app\models\schemas.py
from pydantic import BaseModel

class EventIn(BaseModel):
    event_id: str
    source: str
    amount: float
    timestamp: str
    description: str | None = None
