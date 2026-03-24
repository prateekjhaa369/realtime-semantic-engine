# filepath: D:\Project 1\realtime-semantic-analytics-stub\app\main.py
from fastapi import FastAPI
from app.routers.health import router as health_router
from app.routers.events import router as events_router
from app.routers.query import router as query_router

app = FastAPI(
    title="Real-Time Semantic Intelligence & Analytics Engine",
    version="0.1.0"
)

app.include_router(health_router, prefix="/health", tags=["health"])
app.include_router(events_router, prefix="/events", tags=["events"])
app.include_router(query_router, prefix="/query", tags=["query"])
