let c = document.getElementById("myCanvas");
let ctx = c.getContext("2d");

function createPlatform() {
    ctx.fillStyle = "black";
    let canvasWidth = c.width; 
    let x = Math.random() * (canvasWidth - 50); 
    ctx.fillRect(x, 400, 50, 200);
}


createPlatform();
