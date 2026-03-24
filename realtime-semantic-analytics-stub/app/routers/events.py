# filepath: D:\Project 1\realtime-semantic-analytics-stub\app\routers\events.py
from fastapi import APIRouter
from app.models.schemas import EventIn

router = APIRouter()

@router.post("/")
def ingest_event(event: EventIn):
    # Dummy placeholder
    return {
        "message": "Event ingested (dummy)",
        "event_id": event.event_id,
        "source": event.source
    }
