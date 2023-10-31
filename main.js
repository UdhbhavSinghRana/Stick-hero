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

const PLATFORM_FIRST_X = 800;
const PLATFORM_FIRST_Y = 400;
const PLATFORM_WIDTH = 50;
const PLATFORM_HEIGHT = 200;

const BOX_DIMENSION = 40;
const BOX_X = PLATFORM_FIRST_X + ((PLATFORM_WIDTH - BOX_DIMENSION) / 2);
let BOX_Y = PLATFORM_FIRST_Y - BOX_DIMENSION;

function playerSpawn() {
    ctx.fillStyle = "blue";

    ctx.fillRect(
        BOX_X,
        BOX_Y,
        BOX_DIMENSION,
        BOX_DIMENSION
    );
}

function createFirstPlatform() {
    const firstPlatform = {
        x: PLATFORM_FIRST_X,
        y: PLATFORM_FIRST_Y,
        width: PLATFORM_WIDTH,
        height: PLATFORM_HEIGHT, 
        color: "black" 
    }

    platforms.push(firstPlatform);
}

function createPlatform() {
    let canvasWidth = canvas.width;

    let minX = PLATFORM_FIRST_X;                // Minimum x-coordinate
    let maxX = canvasWidth - PLATFORM_WIDTH;    // Maximum x-coordinate

    let newPlatformX = minX + Math.random() * (maxX - minX);    // Random x within the specified range

    const newPlatform = {
        x: newPlatformX,
        y: PLATFORM_FIRST_Y,
        width: PLATFORM_WIDTH,
        height: PLATFORM_HEIGHT,
        color: "black"
    }

    platforms.push(newPlatform);
}

// Refactor from here (below)

function createPlatformEnd() {
    let canvasWidth = canvas.width;
    let x = canvasWidth - 50; // Set x to the desired value
    let minWidth = 20; // Minimum width
    let maxWidth = 40; // Maximum width
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

function drawRec(color, y_cordinate) {
    ctx.fillStyle = color;

    ctx.fillRect(
        BOX_X,
        y_cordinate,
        BOX_DIMENSION,
        BOX_DIMENSION
    ); 

}

function deadPlayer() {
    BOX_Y += 1;
    console.log(BOX_Y);
    ctx.clearRect(BOX_X, BOX_Y - 1, BOX_DIMENSION, BOX_DIMENSION);
    drawRec("blue", BOX_Y);
}

function gameEnd() {
    deadPlayer();
    if (BOX_Y < 560) {
        requestAnimationFrame(gameEnd);
    } 
}

function updateScore() {
    // Iterate through the platforms and check if the player is on one
    let gameEndFlag = true;

    platforms.forEach((platform) => {
        const boxRightX = BOX_X + BOX_DIMENSION;
        const platformRightX = platform.x + platform.width;

        if (
            boxRightX >= platform.x &&      // Player's right edge
            BOX_X <= platformRightX         // Player's left edge
        ) {
            // Player has landed on the platform
            score += 10; // Increase the score by 10 
            gameEndFlag = false;
        }

        document.getElementById("score").textContent = score;
    });
     
    if (gameEndFlag === true) {
        gameEnd();
    } 
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
