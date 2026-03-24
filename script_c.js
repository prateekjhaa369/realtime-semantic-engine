// Logic for Option C (Threat Node Network Graph)
function initGraphC() {
    const container = document.getElementById('graphViz');
    
    // Generate random network data simulating vectors
    const N = 50;
    const gData = {
      nodes: [...Array(N).keys()].map(i => ({ id: i, group: Math.floor(Math.random() * 3) })),
      links: [...Array(N).keys()].filter(id => id).map(id => ({
        source: id,
        target: Math.floor(Math.random() * id) // Create a tree-like network
      }))
    };

    const Graph = ForceGraph()(container)
      .backgroundColor('rgba(0,0,0,0)')
      .nodeRelSize(6)
      .nodeColor(node => node.group === 0 ? '#FF1744' : '#00E5FF')
      .linkColor(() => 'rgba(0, 191, 255, 0.2)')
      .linkWidth(1.5)
      .linkDirectionalParticles(2)
      .linkDirectionalParticleSpeed(d => Math.random() * 0.01 + 0.005)
      .graphData(gData);

    // Fit Graph to container
    setTimeout(() => {
        Graph.width(container.clientWidth).height(container.clientHeight);
        Graph.zoomToFit(400);
    }, 100);

    // Pulse red anomaly nodes
    setInterval(() => {
        const { nodes, links } = Graph.graphData();
        const randomNode = nodes[Math.floor(Math.random() * nodes.length)];
        randomNode.group = 0; // Turn node red
        Graph.graphData({ nodes, links }); // trigger update
    }, 2000);
}

const locations = ["London, UK", "Tokyo, JP", "New York, US", "Frankfurt, DE", "Singapore, SG"];
function addEventToStreamC() {
    const stream = document.getElementById('event-stream-c');
    const el = document.createElement('div');
    el.className = `event-item`;
    el.innerHTML = `<div class="event-meta"><span>${locations[Math.floor(Math.random()*5)]}</span></div><div class="event-desc">Vector Node Connected</div>`;
    stream.prepend(el);
    if(stream.children.length > 20) stream.removeChild(stream.lastChild);
}

document.addEventListener('DOMContentLoaded', () => {
    setTimeout(initGraphC, 500);
    setInterval(addEventToStreamC, 1000);
});
