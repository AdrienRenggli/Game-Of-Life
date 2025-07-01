const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");
const playPauseBtn = document.getElementById("playPauseBtn");
const speedBtn = document.getElementById("speedBtn");
const randomBtn = document.getElementById("randomBtn");
const resetBtn = document.getElementById("resetBtn");
const stepBtn = document.getElementById("stepBtn");
const toggleTorusBtn = document.getElementById("toggleTorusBtn");
const input = document.getElementById("input");
const applyGridSizeBtn = document.getElementById("applyGridSizeBtn");

const generationDisplay = document.getElementById("generationDisplay");
let generation = 0;

let torusMode = false;

const presets = {
    glider: [
        [0, 1, 0],
        [0, 0, 1],
        [1, 1, 1],
    ],
    copperhead: [
        [0, 0, 0, 0, 0, 1, 0, 1, 1, 0, 0, 0],
        [0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1],
        [0, 0, 0, 1, 1, 0, 0, 0, 1, 0, 0, 1],
        [1, 1, 0, 1, 0, 0, 0, 0, 0, 1, 1, 0],
        [1, 1, 0, 1, 0, 0, 0, 0, 0, 1, 1, 0],
        [0, 0, 0, 1, 1, 0, 0, 0, 1, 0, 0, 1],
        [0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1],
        [0, 0, 0, 0, 0, 1, 0, 1, 1, 0, 0, 0],
    ],
    lwss: [
        [0, 1, 1, 1, 1],
        [1, 0, 0, 0, 1],
        [0, 0, 0, 0, 1],
        [1, 0, 0, 1, 0],
    ],
    mwss: [
        [0, 1, 1, 1, 1, 1],
        [1, 0, 0, 0, 0, 1],
        [0, 0, 0, 0, 0, 1],
        [1, 0, 0, 0, 1, 0],
        [0, 0, 1, 0, 0, 0],
    ],
    hwss: [
        [0, 1, 1, 1, 1, 1, 1],
        [1, 0, 0, 0, 0, 0, 1],
        [0, 0, 0, 0, 0, 0, 1],
        [1, 0, 0, 0, 0, 1, 0],
        [0, 0, 1, 1, 0, 0, 0],
    ],
    gosperGliderGun: [
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1],
        [1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 1, 1, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    ],
    pufferfish: [
        [0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0],
        [0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0],
        [0, 1, 1, 0, 0, 1, 0, 0, 0, 1, 0, 0, 1, 1, 0],
        [0, 0, 0, 1, 1, 1, 0, 0, 0, 1, 1, 1, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0],
        [0, 0, 1, 0, 0, 1, 0, 0, 0, 1, 0, 0, 1, 0, 0],
        [1, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 1],
        [1, 1, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 1, 1],
        [0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 1, 0, 1, 0, 0, 0, 1, 0, 1, 0, 0, 0],
        [0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0],
    ],
    blooming: [
        [0, 1, 1, 1, 0],
        [1, 0, 1, 0, 1],
        [0, 1, 1, 1, 0],
    ],
    blinker: [
        [1, 1, 1],
    ],
    toad: [
        [0, 1, 1, 1],
        [1, 1, 1, 0],
    ],
    beacon: [
        [1, 1, 0, 0],
        [1, 1, 0, 0],
        [0, 0, 1, 1],
        [0, 0, 1, 1],
    ],
    pulsar: [
        [0, 0, 1, 1, 1, 0, 0, 0, 1, 1, 1, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [1, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 1],
        [1, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 1],
        [1, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 1],
        [0, 0, 1, 1, 1, 0, 0, 0, 1, 1, 1, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 1, 1, 1, 0, 0, 0, 1, 1, 1, 0, 0],
        [1, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 1],
        [1, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 1],
        [1, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 1],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 1, 1, 1, 0, 0, 0, 1, 1, 1, 0, 0],
    ],
    penthadecathlon: [
        [1, 1, 1],
        [1, 0, 1],
        [1, 1, 1],
        [1, 1, 1],
        [1, 1, 1],
        [1, 1, 1],
        [1, 0, 1],
        [1, 1, 1],
    ]
    // Add more patterns here
};

let rows = 60;
let cols = 60;

const cellSize = 10;
let grid = createGrid(rows, cols);
let isPlaying = false;
let interval = null;
let speed = 1; // 1x, 2x, 4x

function createGrid(r, c) {
    return Array.from({ length: r }, () => Array(c).fill(0));
}

function drawGrid() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (let y = 0; y < rows; y++) {
        for (let x = 0; x < cols; x++) {
            if (grid[y][x]) {
                ctx.fillStyle = "#00ff99";
                ctx.fillRect(x * cellSize, y * cellSize, cellSize, cellSize);
                ctx.strokeStyle = "#222"; // grid line color
                ctx.strokeRect(x * cellSize, y * cellSize, cellSize, cellSize);
            }
        }
    }
}

canvas.addEventListener("click", (e) => {
if (isPlaying) return; // Only allow editing while paused
const rect = canvas.getBoundingClientRect();
const x = Math.floor((e.clientX - rect.left) / cellSize);
const y = Math.floor((e.clientY - rect.top) / cellSize);
grid[y][x] = grid[y][x] ? 0 : 1;
drawGrid();
});

function nextGeneration() {
    const newGrid = createGrid(rows, cols);
    for (let y = 0; y < rows; y++) {
        for (let x = 0; x < cols; x++) {
            let neighbors = 0;
            for (let dy = -1; dy <= 1; dy++) {
                for (let dx = -1; dx <= 1; dx++) {
                    if (dx === 0 && dy === 0) continue;
                    let nx = x + dx;
                    let ny = y + dy;

                    if (torusMode) {
                        nx = (nx + cols) % cols;
                        ny = (ny + rows) % rows;
                        neighbors += grid[ny][nx];
                    } else {
                        if (nx >= 0 && nx < cols && ny >= 0 && ny < rows) {
                            neighbors += grid[ny][nx];
                        }
                    }
                }
            }

            if (grid[y][x] === 1) {
                newGrid[y][x] = neighbors === 2 || neighbors === 3 ? 1 : 0;
            } else {
                newGrid[y][x] = neighbors === 3 ? 1 : 0;
            }
        }
    }

    grid = newGrid;
    generation++;
    generationDisplay.textContent = `Generation: ${generation}`;
    drawGrid();
}

function startGame() {
    if (interval) clearInterval(interval);
    interval = setInterval(nextGeneration, 500 / speed);
}

function loadPattern(pattern) {
    const patRows = pattern.length;
    const patCols = pattern[0].length;
    const offsetY = Math.floor((rows - patRows) / 2);
    const offsetX = Math.floor((cols - patCols) / 2);

    // Clear grid first
    grid = createGrid(rows, cols);

    // Copy pattern into grid
    for (let y = 0; y < patRows; y++) {
        for (let x = 0; x < patCols; x++) {
            grid[offsetY + y][offsetX + x] = pattern[y][x];
        }
    }

    generation = 0;
    generationDisplay.textContent = `Generation: ${generation}`;
    drawGrid();
}

playPauseBtn.addEventListener("click", () => {
    isPlaying = !isPlaying;
    playPauseBtn.textContent = isPlaying ? "Pause" : "Play";
    if (isPlaying) {
        startGame();
    } else {
        clearInterval(interval);
    }
});

speedBtn.addEventListener("click", () => {
    speed = speed === 1 ? 2 : speed === 2 ? 4 : 1;
    speedBtn.textContent = `${speed}x`;
    if (isPlaying) startGame(); // Restart interval with new speed
});

randomBtn.addEventListener("click", () => {
    for (let y = 0; y < rows; y++) {
        for (let x = 0; x < cols; x++) {
            grid[y][x] = Math.random() > 0.7 ? 1 : 0; // ~30% alive
        }
    }
    generation = 0;
    generationDisplay.textContent = `Generation: ${generation}`;
    drawGrid();
});

resetBtn.addEventListener("click", () => {
    grid = createGrid(rows, cols);
    generation = 0;
    generationDisplay.textContent = `Generation: ${generation}`;
    drawGrid();
});

stepBtn.addEventListener("click", () => {
    if (!isPlaying) {
        nextGeneration();
    }
});

toggleTorusBtn.addEventListener("click", () => {
    torusMode = !torusMode;
    toggleTorusBtn.textContent = `Torus: ${torusMode ? "On" : "Off"}`;
});


document.addEventListener("keydown", (e) => {
    if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;

    switch (e.code) {
        case "Space":
            e.preventDefault();
            playPauseBtn.click();
            break;
        case "KeyR":
            e.preventDefault();
            randomBtn.click();
            break;
        case "KeyC":
            e.preventDefault();
            resetBtn.click();
            break;
        case "Period":
            e.preventDefault();
            stepBtn.click();
            break;
        case "KeyS":
            e.preventDefault();
            speedBtn.click();
            break;
    }
});

document.getElementById("presetSelector").addEventListener("change", (e) => {
    const pattern = presets[e.target.value];
    if (pattern) loadPattern(pattern);
});

applyGridSizeBtn.addEventListener("click", () => {
    const inputSize = parseInt(input.value);

    if (isNaN(inputSize) || inputSize < 10 || inputSize > 100) {
        alert("Grid size must be between 10 and 100.");
        return;
    }

    rows = inputSize;
    cols = inputSize;

    canvas.width = cols * cellSize;
    canvas.height = rows * cellSize;

    grid = createGrid(rows, cols);
    generation = 0;
    generationDisplay.textContent = `Generation: ${generation}`;
    drawGrid();
});

drawGrid();
