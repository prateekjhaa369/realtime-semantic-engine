# filepath: D:\Project 1\realtime-semantic-analytics-stub\app\routers\health.py
from fastapi import APIRouter

router = APIRouter()

@router.get("/")
def health_check():
    return {"status": "ok", "service": "semantic-analytics-engine"}
