let c = document.getElementById("myCanvas");
let ctx = c.getContext("2d");
let isMouseDown = false;
let startY = 400;
let endY = 400;
let startX = 40;
let drawInterval;
let rotate = false;

function createFirstPlatform() {
    ctx.fillStyle = "black";
    let canvasWidth = c.width;
    ctx.fillRect(0, 400, 50, 200);
}

function createPlatform() {
    ctx.fillStyle = "black";
    let canvasWidth = c.width;
    let x = Math.random() * (canvasWidth - 50);
    ctx.fillRect(x, 400, 50, 200);
}

function playerSpawn() {
    ctx.fillStyle = "blue";
    let canvasWidth = c.width;
    ctx.fillRect(5, 360, 40, 40);
}

function clearCanvas() {
    ctx.clearRect(0, 0, c.width, c.height);
}

window.addEventListener('mousedown', () => {
    if (!rotate) {
        isMouseDown = true;
        ctx.strokeStyle = "red";
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(50, 380); // start point
        ctx.lineTo(50, startY); // initial lineto position
        ctx.stroke();

        // Start a continuous drawing loop
        drawInterval = setInterval(() => {
            if (isMouseDown) {
                // Continuously increase the lineTo position
                startY -= 1; // You can adjust the speed by changing the increment
                startX += 1.15;
                ctx.lineTo(50, startY);
                ctx.stroke();
            }
        }, 5); // Adjust the interval for the desired drawing speed
    }
    else {
        isMouseDown = true;
        ctx.strokeStyle = "black";
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(50, 380); // start point
        ctx.lineTo(startX, 380); // initial lineto position
        ctx.stroke();
    }
    rotate = !rotate;
});

window.addEventListener('mouseup', () => {
    isMouseDown = false;
    clearInterval(drawInterval); // Stop the drawing interval
});

createFirstPlatform();
playerSpawn();
createPlatform();
createPlatform();
createPlatform();
