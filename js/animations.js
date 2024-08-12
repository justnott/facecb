const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
let width, height;
let dots = [];
const mouse = { x: null, y: null };

function resizeCanvas() {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
    createDots();
}

function createDots() {
    dots = [];
    const numberOfDots = Math.floor((width * height) / 10000);
    for (let i = 0; i < numberOfDots; i++) {
        dots.push({
            x: Math.random() * width,
            y: Math.random() * height,
            vx: (Math.random() - 0.5) * 0.5,
            vy: (Math.random() - 0.5) * 0.5,
            radius: 2
        });
    }
}

function drawDots() {
    ctx.clearRect(0, 0, width, height);
    dots.forEach(dot => {
        dot.x += dot.vx;
        dot.y += dot.vy;

        if (dot.x < 0 || dot.x > width) dot.vx *= -1;
        if (dot.y < 0 || dot.y > height) dot.vy *= -1;

        ctx.beginPath();
        ctx.arc(dot.x, dot.y, dot.radius, 0, Math.PI * 2);
        ctx.fillStyle = 'white';
        ctx.fill();
    });
}

function drawLines() {
    for (let i = 0; i < dots.length; i++) {
        for (let j = i + 1; j < dots.length; j++) {
            const dx = dots[i].x - dots[j].x;
            const dy = dots[i].y - dots[j].y;
            const distance = Math.sqrt(dx * dx + dy * dy);

            if (distance < 100) {
                ctx.beginPath();
                ctx.moveTo(dots[i].x, dots[i].y);
                ctx.lineTo(dots[j].x, dots[j].y);
                ctx.strokeStyle = 'rgba(255, 255, 255, 0.1)';
                ctx.stroke();
            }
        }
    }
}

function drawMouseLines() {
    if (mouse.x && mouse.y) {
        dots.forEach(dot => {
            const dx = dot.x - mouse.x;
            const dy = dot.y - mouse.y;
            const distance = Math.sqrt(dx * dx + dy * dy);

            if (distance < 150) {
                ctx.beginPath();
                ctx.moveTo(dot.x, dot.y);
                ctx.lineTo(mouse.x, mouse.y);
                ctx.strokeStyle = 'rgba(255, 255, 255, 0.2)';
                ctx.stroke();
            }
        });
    }
}

function animate() {
    drawDots();
    drawLines();
    drawMouseLines();
    requestAnimationFrame(animate);
}

window.addEventListener('resize', resizeCanvas);
window.addEventListener('mousemove', (e) => {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
});

resizeCanvas();
createDots();
animate();
