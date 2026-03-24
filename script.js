// Initialize 3D Globe
function initGlobe() {
    const container = document.getElementById('globeViz');

    const globe = Globe()(container)
        .globeImageUrl('earth-dark.jpg')
        .bumpImageUrl('earth-topology.png')
        .backgroundColor('rgba(0,0,0,0)')
        .width(container.clientWidth)
        .height(container.clientHeight)
        .pointOfView({ lat: 20, lng: 0, altitude: 2 });

    const N = 20;
    const arcsData = [...Array(N).keys()].map(() => ({
        startLat: (Math.random() - 0.5) * 180,
        startLng: (Math.random() - 0.5) * 360,
        endLat: (Math.random() - 0.5) * 180,
        endLng: (Math.random() - 0.5) * 360,
        color: Math.random() > 0.8 ? '#FF1744' : '#00E5FF'
    }));

    globe.arcsData(arcsData)
        .arcColor('color')
        .arcDashLength(0.4)
        .arcDashGap(4)
        .arcDashInitialGap(() => Math.random() * 5)
        .arcDashAnimateTime(2000)
        .arcStroke(1);

    globe.controls().autoRotate = true;
    globe.controls().autoRotateSpeed = 0.5;

    window.addEventListener('resize', () => {
        globe.width(container.clientWidth);
        globe.height(container.clientHeight);
    });

    setInterval(() => {
        const newArc = {
            startLat: (Math.random() - 0.5) * 180,
            startLng: (Math.random() - 0.5) * 360,
            endLat: (Math.random() - 0.5) * 180,
            endLng: (Math.random() - 0.5) * 360,
            color: Math.random() > 0.9 ? '#FF1744' : '#00E5FF'
        };
        const currentData = globe.arcsData();
        if (currentData.length > 50) currentData.shift();
        globe.arcsData([...currentData, newArc]);
    }, 1500);
}

// Initialize Anomaly Chart
function initChart() {
    const ctx = document.getElementById('anomalyChart').getContext('2d');
    const gradient = ctx.createLinearGradient(0, 0, 0, 200);
    gradient.addColorStop(0, 'rgba(0, 229, 255, 0.5)');
    gradient.addColorStop(1, 'rgba(0, 229, 255, 0.0)');

    const chart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: ['10m', '8m', '6m', '4m', '2m', 'Now'],
            datasets: [{
                label: 'Vector Distance Score',
                data: [12, 19, 15, 25, 22, 45],
                borderColor: '#00E5FF',
                backgroundColor: gradient,
                borderWidth: 2,
                pointBackgroundColor: '#00BFFF',
                fill: true,
                tension: 0.4
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: { legend: { display: false } },
            scales: {
                x: { grid: { color: 'rgba(0, 191, 255, 0.1)' }, ticks: { color: '#80DEEA' } },
                y: { grid: { color: 'rgba(0, 191, 255, 0.1)' }, ticks: { color: '#80DEEA' } }
            }
        }
    });

    setInterval(() => {
        const data = chart.data.datasets[0].data;
        data.shift();
        const nextVal = Math.random() > 0.8 ? 40 + Math.random() * 20 : 10 + Math.random() * 15;
        data.push(nextVal);
        chart.update('none');
    }, 2000);
}

// Simulate Live Ingestion Stream
const locations = ["London, UK", "Tokyo, JP", "New York, US", "Frankfurt, DE", "Singapore, SG"];
const actions = ["Offshore Wire Transfer", "Crypto Liquidation", "High-Frequency Trade", "Logistics Payment"];

function addEventToStream(isAnomaly = false) {
    const stream = document.getElementById('event-stream');
    const el = document.createElement('div');
    el.className = `event-item ${isAnomaly ? 'anomaly' : ''}`;

    const time = new Date().toISOString().split('T')[1].slice(0, 8);
    const loc = locations[Math.floor(Math.random() * locations.length)];
    const act = actions[Math.floor(Math.random() * actions.length)];
    const amount = (Math.random() * 90000 + 1000).toLocaleString('en-US', { style: 'currency', currency: 'USD' });

    el.innerHTML = `
        <div class="event-meta">
            <span>[${time}] ${loc}</span>
            <span>SIM: 0.${Math.floor(Math.random() * 900 + 100)}</span>
        </div>
        <div class="event-desc">
            ${isAnomaly ? 'DETECTED: ' : ''}${act} - ${amount}
        </div>
    `;

    stream.prepend(el);
    if (stream.children.length > 15) stream.removeChild(stream.lastChild);
}

setInterval(() => addEventToStream(false), 800);
setInterval(() => {
    addEventToStream(true);
    const counter = document.getElementById('anomaly-count');
    counter.innerText = parseInt(counter.innerText) + 1;
}, 5000);

// Semantic Search UI
const searchInput = document.getElementById('semantic-search');
const resultsContainer = document.getElementById('search-results');

searchInput.addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
        const query = this.value;
        if (!query) {
            resultsContainer.classList.add('hidden');
            return;
        }

        resultsContainer.classList.remove('hidden');
        resultsContainer.innerHTML = `<div style="color: var(--cyan); text-align: center; padding: 1rem;">
            Vectorizing Query & Searching Pinecone Index... <span class="pulse-dot" style="display:inline-block; width:8px; height:8px; margin-left:5px;"></span>
        </div>`;

        // Simulate API call delay
        setTimeout(() => {
            fetch('http://localhost:8000/search', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ query_text: query, limit: 3 })
            }).then(resp => resp.json())
                .then(data => {
                    resultsContainer.innerHTML = `
                      <div style="font-family: var(--font-headers); color: var(--text-muted); font-size: 0.8rem; margin-bottom: 0.5rem; border-bottom: 1px solid var(--panel-border); padding-bottom:0.2rem;">
                          Top Semantic Matches:
                      </div>
                  `;
                    // Display mock results dynamically based on user query
                    data.semantic_matches.forEach(item => {
                        resultsContainer.innerHTML += `
                          <div class="event-item anomaly" style="margin-bottom: 0.5rem;">
                              <div class="event-meta"><span>[Match] Similarity: 0.942</span></div>
                              <div class="event-desc">${item.metadata.description} - $${item.metadata.amount}</div>
                          </div>
                      `;
                    });
                })
                .catch(err => {
                    // Fallback if backend is not running
                    resultsContainer.innerHTML = `
                    <div style="font-family: var(--font-headers); color: var(--text-muted); font-size: 0.8rem; margin-bottom: 0.5rem; border-bottom: 1px solid var(--panel-border); padding-bottom:0.2rem;">
                        Top Semantic Matches (Mocked - API Offline):
                    </div>
                    <div class="event-item anomaly" style="margin-bottom: 0.5rem;">
                        <div class="event-meta"><span>[14:23:01] Moscow, RU -> Cayman Islands</span><span>SIM: 0.942</span></div>
                        <div class="event-desc">Offshore Wire Transfer matched by vector coordinates.</div>
                    </div>
                  `;
                });
        }, 800);
    }
});

// Init
document.addEventListener('DOMContentLoaded', () => {
    initChart();
    setTimeout(initGlobe, 1000);
    setInterval(() => {
        document.getElementById('ingest-rate').innerText = `${Math.floor(1000 + Math.random() * 500)} ev/s`;
    }, 1000);
});
