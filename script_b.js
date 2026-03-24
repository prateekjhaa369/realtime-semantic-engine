// Logic for Option B (Wireframe Globe)
function initGlobeB() {
    const container = document.getElementById('globeVizB');
    const globe = Globe()(container)
        .globeImageUrl('earth-dark.jpg')
        .backgroundColor('rgba(0,0,0,0)')
        .showAtmosphere(true)
        .atmosphereColor('#00E5FF')
        .atmosphereAltitude(0.2)
        .width(container.clientWidth)
        .height(container.clientHeight);

    // Generate random hex polygons to look like a wireframe/data globe
    const N = 300;
    const gData = [...Array(N).keys()].map(() => ({
      lat: (Math.random() - 0.5) * 180,
      lng: (Math.random() - 0.5) * 360,
      size: Math.random() * 0.3,
      color: ['#00BFFF', '#00E5FF', '#ffffff'][Math.floor(Math.random() * 3)]
    }));

    globe.hexPolygonData(gData)
      .hexPolygonColor(d => d.color)
      .hexPolygonResolution(3)
      .hexPolygonMargin(0.3)
      .hexPolygonAltitude(d => d.size);

    globe.controls().autoRotate = true;
    globe.controls().autoRotateSpeed = 1.0;
}

const locations = ["London, UK", "Tokyo, JP", "New York, US", "Frankfurt, DE", "Singapore, SG"];
function addEventToStreamB() {
    const stream = document.getElementById('event-stream-b');
    const el = document.createElement('div');
    el.className = `event-item`;
    el.innerHTML = `<div class="event-meta"><span>${locations[Math.floor(Math.random()*5)]}</span></div><div class="event-desc">Polygon Updated</div>`;
    stream.prepend(el);
    if(stream.children.length > 20) stream.removeChild(stream.lastChild);
}

document.addEventListener('DOMContentLoaded', () => {
    setTimeout(initGlobeB, 500);
    setInterval(addEventToStreamB, 1000);
});
