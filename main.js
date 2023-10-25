let canvas = document.getElementById("myCanvas");
let ctx = canvas.getContext("2d");
let isMouseDown = false;
let startY = 400;
let startY2 = 400;
let endY = 400;
let startX = 850;
let startX2 = 850;
let drawInterval;
let rotate = false;
let platforms = [];
let flag = false;
let score = 0;

function createFirstPlatform() {
    platforms.push({ x: 800, y: 400, width: 50, height: 200, color: "black" });
}

function createPlatform() {
    let canvasWidth = canvas.width;
    let minX = 800;  // Minimum x-coordinate
    let maxX = canvasWidth - 50;  // Maximum x-coordinate
    let x = minX + Math.random() * (maxX - minX); // Random x within the specified range

    platforms.push({ x: x, y: 400, width: 50, height: 200, color: "black" });
}

function createPlatformEnd() {
    let canvasWidth = canvas.width;
    let x = canvasWidth - 50; // Set x to the desired value
    let minWidth = 20; // Minimum width
    let maxWidth = 100; // Maximum width
    let width = minWidth + Math.random() * (maxWidth - minWidth); // Random width within the specified range

    platforms.push({ x: x, y: 400, width: width, height: 200, color: "black" });
}


function drawPlatforms() {
    platforms.forEach((platform) => {
        ctx.fillStyle = platform.color;
        ctx.fillRect(platform.x, platform.y, platform.width, platform.height);
    });
}

function movePlatforms() {
    // Move the platforms towards the player in the X direction
    platforms.forEach((platform) => {
        platform.x -= 1;
    });

    // Filter out platforms that are out of the canvas
    platforms = platforms.filter((platform) => platform.x + platform.width > 0);

    // Create a new platform if the last platform is far enough to the left
    if (platforms.length === 0 || platforms[platforms.length - 1].x + platforms[platforms.length - 1].width <= canvas.width - 100) {
        createPlatformEnd();
    }
}


function playerSpawn() {
    ctx.fillStyle = "blue";
    let canvasWidth = canvas.width;
    ctx.fillRect(805, 360, 40, 40);
}

function clearCanvas() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}

window.addEventListener('mousedown', () => {
    isMouseDown = true;
    ctx.strokeStyle = "red";
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(850, 380); // start point
    ctx.lineTo(850, startY); // initial lineto position
    ctx.stroke();

    // Start a continuous drawing loop
    drawInterval = setInterval(() => {
        if (isMouseDown) {
            // Continuously increase the lineTo position
            startY -= 1; // You can adjust the speed by changing the increment
            startX += 1;
            ctx.lineTo(850, startY);
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
    ctx.moveTo(850, 400); // start point
    ctx.lineTo(startX, 400); // initial lineto position
    ctx.stroke();
    setTimeout(() => update(840), 500);
    flag = true;
});

function updateScore() {
    // Iterate through the platforms and check if the player is on one
    platforms.forEach((platform) => {
        if (
            startX + 40 >= platform.x && // Player's right edge
            startX <= platform.x + platform.width  // Player's left edge
        ) {
            // Player has landed on the platform
           score += 10; // Increase the score by 10 (adjust as needed)
        }
        console.log(score);
        document.getElementById("score").textContent = score;
    });
}

function update(x) {
    if (x !== startX + 10) {
        clearCanvas(); // Clear the canvas only once at the beginning of each frame
        movePlatforms(); // Move the platforms
        drawPlatforms(); // Redraw the platforms
        playerSpawn(); // Redraw the player character
        x += 1;
        if (x !== startX) {
            requestAnimationFrame(() => {
                update(x, startX); // Continue the animation
            });   
        }
        else {
            updateScore();
            startX = 850;
            console.log(startX);
            startY = 400;
        }
    }
}

playerSpawn();
createFirstPlatform();
createPlatform();
createPlatform();
createPlatform();
drawPlatforms();
