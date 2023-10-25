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
    setTimeout(() => update(40), 500);
    flag = true;
});

function update(x) {
    if (x !== startX + 10) {
        clearCanvas(); // Clear the canvas only once at the beginning of each frame
        movePlatforms(); // Move the platforms
        drawPlatforms(); // Redraw the platforms
        playerSpawn(); // Redraw the player character
        x += 1;
        if (x !== startX) {
            requestAnimationFrame(() => {
                console.log(startX);
                update(x, startX); // Continue the animation
            });   
        }
        else {
            startX = 50;
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
