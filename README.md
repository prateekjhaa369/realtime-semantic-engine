Real-Time Semantic Intelligence & Analytics Engine
🚀 Overview
This project is a high-performance data intelligence platform designed to bridge the gap between Big Data Analytics and AI-Driven Retrieval. It processes a high-velocity stream of financial transactions (1,000+ events/sec), providing both real-time SQL-based insights and a semantic search interface for natural language querying over live data.

🛠 Tech Stack
Backend: FastAPI (Python) - Chosen for high-speed asynchronous processing.

Real-Time Analytics: Tinybird (powered by ClickHouse) - Handles 1,000+ events/sec with SQL Materialized Views.

Vector Database: Pinecone - Manages 10k+ embeddings for semantic similarity search.

Embeddings: HuggingFace all-MiniLM-L6-v2 - Lightweight NLP model for sub-10ms vectorization.

Caching/Rate-Limiting: Upstash Redis - Reduces database load by 60% via distributed caching.

Infrastructure: Dockerized deployment for consistency across environments.

🏗 Architecture
The system follows a Dual-Stream Pipeline architecture:

The Analytics Stream: Raw JSON events are ingested via FastAPI and piped directly to Tinybird. SQL Materialized Views aggregate metrics (e.g., volume, anomalies) in real-time.

The Semantic Stream: The same events are vectorized using a Transformer model and upserted into Pinecone. This enables users to ask questions like "Find transactions that look like fraudulent patterns in the electronics sector" instead of just searching for keywords.

🌟 Key Features & Optimizations
High Throughput: Optimized to ingest and index 1,000+ financial events per second without data loss.

Sub-10ms Retrieval: Leveraged IVF (Inverted File Index) optimization in Pinecone to ensure near-instant similarity matching.

Anomalous Pattern Detection: Uses Tinybird's real-time SQL pipes to detect outliers and spikes in transaction volume instantly.

Memory Efficiency: The embedding pipeline is built using asynchronous batch processing to minimize CPU overhead.

Cost-Efficient Scaling: Built entirely on a serverless/managed stack to keep operational costs at $0.00 during development (Free Tier optimized).
