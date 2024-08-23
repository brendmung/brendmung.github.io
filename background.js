const canvas = document.getElementById('background');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const nodes = [];
const maxNodes = 100;
const maxDistance = 200;
let cameraSpeed = 0.001; // Controls the speed of the camera moving forward

// Node constructor
function Node(x, y, z) {
    this.x = x;
    this.y = y;
    this.z = z;

    this.update = function() {
        this.z -= cameraSpeed;

        // If a node moves past the camera (z <= 0), reset it to the background
        if (this.z <= 0) {
            this.z = 1;
            this.x = (Math.random() - 0.5) * canvas.width;
            this.y = (Math.random() - 0.5) * canvas.height;
        }
    };

    this.draw = function() {
        const scale = 1 / this.z;
        const x2d = (this.x * scale) + canvas.width / 2;
        const y2d = (this.y * scale) + canvas.height / 2;

        ctx.beginPath();
        ctx.arc(x2d, y2d, 2 * scale, 0, Math.PI * 2, false);
        ctx.fillStyle = '#ffffff';
        ctx.fill();
    };
}

// Initialize nodes with a random depth (z-coordinate)
for (let i = 0; i < maxNodes; i++) {
    let x = (Math.random() - 0.5) * canvas.width;
    let y = (Math.random() - 0.5) * canvas.height;
    let z = Math.random();
    nodes.push(new Node(x, y, z));
}

// Connect nodes with lines, adjusting for perspective
function connectNodes() {
    for (let i = 0; i < maxNodes; i++) {
        for (let j = i + 1; j < maxNodes; j++) {
            const scale1 = 1 / nodes[i].z;
            const scale2 = 1 / nodes[j].z;
            const x1 = (nodes[i].x * scale1) + canvas.width / 2;
            const y1 = (nodes[i].y * scale1) + canvas.height / 2;
            const x2 = (nodes[j].x * scale2) + canvas.width / 2;
            const y2 = (nodes[j].y * scale2) + canvas.height / 2;

            const distance = Math.sqrt((x1 - x2) ** 2 + (y1 - y2) ** 2);

            if (distance < maxDistance) {
                ctx.strokeStyle = `rgba(255, 255, 255, ${(1 - distance / maxDistance) * 0.5})`;
                ctx.lineWidth = 0.5 * ((scale1 + scale2) / 2);
                ctx.beginPath();
                ctx.moveTo(x1, y1);
                ctx.lineTo(x2, y2);
                ctx.stroke();
            }
        }
    }
}

// Animation loop
function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    nodes.forEach(node => {
        node.update();
        node.draw();
    });
    connectNodes();
    requestAnimationFrame(animate);
}

animate();