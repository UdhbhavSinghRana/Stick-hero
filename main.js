let c = document.getElementById("myCanvas");
let ctx = c.getContext("2d");

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

createFirstPlatform();
playerSpawn();
createPlatform();
createPlatform();
createPlatform();

