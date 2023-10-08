let c = document.getElementById("myCanvas");
let ctx = c.getContext("2d");
let isMouseDown = false;
let startY = 400;

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
    let canvasWidht = c.widht;
    
    ctx.fillRect(5, 360, 40, 40);
}

window.addEventListener('mousedown', () => {
        isMouseDown = true;
        ctx.strokeStyle = "blue";
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(40, 380); // Start point
        ctx.lineTo(40, startY); // Initial lineTo position
        ctx.stroke();

        // Start a continuous drawing loop
        drawInterval = setInterval(() => {
            if (isMouseDown) {
                // Continuously increase the lineTo position
                startY -= 1; // You can adjust the speed by changing the increment
                ctx.lineTo(40, startY);
                ctx.stroke();
            }
        }, 10); // Adjust the interval for the desired drawing speed
    });

window.addEventListener('mouseup', () => {
    isMouseDown = false;

    // Stop the continuous drawing loop
    clearInterval(drawInterval);
});

createFirstPlatform();
playerSpawn();
createPlatform();
createPlatform();
createPlatform();
