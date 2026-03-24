import os
from fastapi import FastAPI, BackgroundTasks
from pydantic import BaseModel, Field
from typing import List
from fastapi.middleware.cors import CORSMiddleware
import time
import random

app = FastAPI(title="Real-Time Semantic Intelligence Engine")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class TransactionEvent(BaseModel):
    user_id: str
    amount: float
    description: str
    location: str
    timestamp: str

class SearchQuery(BaseModel):
    query_text: str
    limit: int = 5

REDIS_QUEUE = []
PINECONE_MOCK_DB = [
    {
        "id": "mock_1", 
        "values": [0.1, 0.2], 
        "metadata": {"description": "Suspicious large offshore transfer", "amount": 4500000, "user_id": "u_9912"}
    },
    {
        "id": "mock_2", 
        "values": [0.1, 0.2], 
        "metadata": {"description": "Structured daily crypto liquidation", "amount": 9500, "user_id": "u_8821"}
    }
]

def generate_embedding(text: str) -> List[float]:
    return [0.1, 0.2, 0.3, 0.4, 0.5]

def process_event_from_queue():
    if not REDIS_QUEUE:
        return
    event = REDIS_QUEUE.pop(0)
    vector = generate_embedding(event["description"])
    vector_record = {"id": f"evt_{event['timestamp']}", "values": vector, "metadata": event}
    PINECONE_MOCK_DB.append(vector_record)

@app.post("/ingest")
async def ingest_event(event: TransactionEvent, background_tasks: BackgroundTasks):
    event_dict = event.model_dump()
    REDIS_QUEUE.append(event_dict)
    background_tasks.add_task(process_event_from_queue)
    return {"status": "success"}

@app.post("/search")
async def semantic_search(query: SearchQuery):
    # Mocking vector search logic and simulating Pinecone DB Response
    query_vector = generate_embedding(query.query_text)
    results = PINECONE_MOCK_DB[:query.limit] 
    return {"query": query.query_text, "semantic_matches": results}

@app.get("/analytics/trends")
async def get_trends():
    return {"status": "success", "data": {"total_volume_1h": "$1.4M", "anomaly_spikes": 3, "top_category": "Electronics"}}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
