// Contribution Grid
const grid = document.getElementById('contribution-grid');
const dots = [];
const rows = 7, cols = 52;

for (let i = 0; i < rows * cols; i++) {
    const dot = document.createElement('div');
    dot.className = 'dot';
    grid.appendChild(dot);
    dots.push(dot);
}

function jdVisualizer() {
    dots.forEach(d => d.classList.remove('jd-active'));
    for (let c = 0; c < cols; c++) {
        const h = Math.floor(Math.random() * rows);
        for (let r = 0; r <= h; r++) {
            const idx = (rows - 1 - r) * cols + c;
            if (dots[idx]) dots[idx].classList.add('jd-active');
        }
    }
}

setInterval(jdVisualizer, 130);