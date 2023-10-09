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
let arr = [];
let flag = false;

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
    isMouseDown = true;
    ctx.strokeStyle = "red";
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(50, 380); // start point
    ctx.lineTo(50, startY); // initial lineto position
    ctx.stroke();

    if (flag) {
        clearInterval(drawRec);
        clearInterval(drawRecWhite);
    }
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
    moveRecWhite(40, "white");
    flag = true;
});

function moveRec(x, color) {
    drawRec = setInterval(() => {
        while (x != startX){
            ctx.fillStyle = color;
            ctx.fillRect(5, 360, x, 40);
            x += 1;
        }
    }, 1000);
}

function moveRecWhite(x, color) {
    drawRecWhite = setInterval(() => {
        while (x != startX - 40){
            ctx.fillStyle = color;
            ctx.fillRect(5, 360, x, 40);
            x += 1;
        }
    }, 1000);
}

createFirstPlatform();
playerSpawn();
createPlatform();
createPlatform();
createPlatform();
