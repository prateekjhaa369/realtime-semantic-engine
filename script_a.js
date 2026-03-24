// Logic for Option A (Globe in Background)
function initGlobeA() {
    const container = document.getElementById('globeBg');
    const globe = Globe()(container)
        .globeImageUrl('earth-dark.jpg')
        .bumpImageUrl('earth-topology.png')
        .backgroundColor('rgba(0,0,0,0)')
        .width(window.innerWidth)
        .height(window.innerHeight)
        .pointOfView({ lat: 20, lng: 0, altitude: 2 });

    // Slower, more majestic rotation for background
    globe.controls().autoRotate = true;
    globe.controls().autoRotateSpeed = 0.2;
    globe.controls().enableZoom = false;

    window.addEventListener('resize', () => {
        globe.width(window.innerWidth);
        globe.height(window.innerHeight);
    });
}

const locations = ["London, UK", "Tokyo, JP", "New York, US", "Frankfurt, DE", "Singapore, SG"];
function addEventToStreamA() {
    const stream = document.getElementById('event-stream-a');
    const el = document.createElement('div');
    el.className = `event-item`;
    el.innerHTML = `<div class="event-meta"><span>${locations[Math.floor(Math.random()*5)]}</span></div><div class="event-desc">Event Processed</div>`;
    stream.prepend(el);
    if(stream.children.length > 20) stream.removeChild(stream.lastChild);
}

document.addEventListener('DOMContentLoaded', () => {
    setTimeout(initGlobeA, 500);
    setInterval(addEventToStreamA, 1000);
});
