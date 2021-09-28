// The attributes of the player.
var player = {
    x: 200,
    y: 200,
    x_v: 0,
    y_v: 0,
    jump: true,
    height: 20,
    width: 20
};
// The status of the arrow keys
var keys = {
    right: false,
    left: false,
    up: false,
};
// The friction and gravity to show realistic movements    
var gravity = 0.4;
var friction = 0.7;
// The number of platforms
var num = 5;
// The platforms
var platforms = [];
// The height and width of the platforms
var platWidth = 110;
var platHeight = 15;
// Function to render the canvas
function rendercanvas() {
    ctx.fillStyle = "#eeeeff";
    ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);
}
// Function to render the player
function renderplayer() {
    ctx.fillStyle = "#F08080";
    ctx.fillRect((player.x) - 20, (player.y) - 20, player.width, player.height);
}
// Function to create platforms
function createplat() {
    for (i = 0; i < num; i++) {
        platforms.push(
            {
                x: 100 * i,
                y: 200 + (30 * i),
                width: platWidth,
                height: platHeight
            }
        );
    }
}
// Function to render platforms
function renderplat() {
    ctx.fillStyle = "#45597E";

    for (i = 0; i < platforms.length; i++) {
        ctx.fillRect(platforms[i].x, platforms[i].y, platforms[i].width - 20, platforms[i].height);
    }
}
// This function will be called when a key on the keyboard is pressed
function keydown(e) {
    // 37 is the code for the left arrow key
    if (e.keyCode == 37) {
        keys.left = true;
    }
    // 37 is the code for the up arrow key
    if (e.keyCode == 38) {
        if (player.jump == false) {
            player.y_v = -10;
        }
    }
    // 39 is the code for the right arrow key
    if (e.keyCode == 39) {
        keys.right = true;
    }
}
// This function is called when the pressed key is released
function keyup(e) {
    if (e.keyCode == 37) {
        keys.left = false;
    }
    if (e.keyCode == 38) {
        if (player.y_v < -2) {
            player.y_v = -3;
        }
    }
    if (e.keyCode == 39) {
        keys.right = false;
    }
}
function loop() {
    // If the player is not jumping apply the effect of frictiom
    if (player.jump == false) {
        player.x_v *= friction;
    } else {
        // If the player is in the air then apply the effect of gravity
        player.y_v += gravity;
    }
    player.jump = true;
    // If the left key is pressed increase the relevant horizontal velocity
    if (keys.left) {
        player.x_v = -2.5;
    }
    if (keys.right) {
        player.x_v = 2.5;
    }
    // Updating the y and x coordinates of the player
    player.y += player.y_v;
    player.x += player.x_v;
    // A simple code that checks for collions with the platform
    let i = -1;
    for (j = 0; j < platforms.length; j++) {
        if (platforms[j].x < player.x && player.x < platforms[j].x + platforms[j].width &&
            platforms[j].y < player.y && player.y < platforms[j].y + platforms[j].height) {
            i = j;
        }
    }
    // Makes sure that the player doesn't fall through the platform and that it stays on the platform
    if (i > -1) {
        player.jump = false;
        player.y = platforms[i].y;
        player.x -= 1;
    }
    // Teleports the platforms to the other side
    for (i = 0; i < platforms.length; i++) {
        platforms[i].x -= 1;
        if (platforms[i].x == -platWidth) {
            platforms[i].x = ctx.canvas.width;
            platforms[i].y = Math.floor(Math.random() * 150) + 200
        }
    }

    if (player.x > ctx.canvas.width - 50) {
        platforms.x -= 10;
    }
    // Rendering the canvas, the player and the platforms
    rendercanvas();
    renderplayer();
    renderplat();
}
canvas = document.getElementById("canvas");
ctx = canvas.getContext("2d");
ctx.canvas.height = 400;
ctx.canvas.width = 400;
createplat();
// Adding the event listeners
document.addEventListener("keydown", keydown);
document.addEventListener("keyup", keyup);
setInterval(loop, 18);