let c = document.getElementById("myCanvas");
let ctx = c.getContext("2d");
let isMouseDown = false;
let startY = 400;
let startY2 = 400;
let endY = 400;
let startX = 50;
let startX2 = 50;
let drawInterval;
let rotate = false;
let platforms = [];
let flag = false;

function createFirstPlatform() {
    platforms.push({ x: 0, y: 400, width: 50, height: 200, color: "black" });
}

function createPlatform() {
    let canvasWidth = c.width;
    let x = Math.random() * (canvasWidth - 50);
    platforms.push({ x: x, y: 400, width: 50, height: 200, color: "black" });
}

function drawPlatforms() {
    platforms.forEach((platform) => {
        ctx.fillStyle = platform.color;
        ctx.fillRect(platform.x, platform.y, platform.width, platform.height);
    });
}

function movePlatforms() {
    platforms.forEach((platform) => {
        platform.x -= 1; // Move the platform towards the player in the X direction
    });

    // Remove platforms that are out of the canvas
    platforms = platforms.filter((platform) => platform.x + platform.width > 0);

    // Create new platforms to replace removed ones
    while (platforms.length < 3) {
        createPlatform();
    }
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
            startX += 1;
            ctx.lineTo(50, startY);
            ctx.stroke();
        }
    }, 5); // Adjust the interval for the desired drawing speed
});

window.addEventListener('mouseup', () => {
    isMouseDown = false;
    clearInterval(drawInterval); // Stop the drawing interval

    ctx.strokeStyle = "green";
    ctx.lineWidth = 4;
    ctx.beginPath();
    ctx.moveTo(50, 400); // start point
    ctx.lineTo(startX, 400); // initial lineto position
    ctx.stroke();

    moveRec(40, "blue");
    update(40, startX);
    startX = 50;
    flag = true;
});

function moveRec(x, color) {
    if (x != startX) {
        ctx.fillStyle = color;
        ctx.fillRect(5, 360, x, 40);
        x += 1;
    }
}

function moveRecWhite(x, color) {
    if (x != startX - 40) {
        ctx.fillStyle = color;
        ctx.fillRect(5, 360, x, 40);
        x += 1;
    }
}

function update(x, startX) {
    if (x != startX) {
        clearCanvas(); // Clear the canvas only once at the beginning of each frame
        movePlatforms(); // Move the platforms
        drawPlatforms(); // Redraw the platforms
        playerSpawn(); // Redraw the player character
        x += 1;
        console.log(startX);
        requestAnimationFrame(() => update(x, startX)); // Request the next frame
    }
}


playerSpawn();
createFirstPlatform();
createPlatform();
createPlatform();
createPlatform();
drawPlatforms();
