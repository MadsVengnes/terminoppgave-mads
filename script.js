// The attributes of the player.
var player = {
    x: screen.width / 6,
    y: screen.width / 6,
    x_v: 0,
    y_v: 0,
    jump: true,
    height: screen.width / 60,
    width: screen.width / 60
};
// The atributes of the canon.
var canon = {
    x: 310,
    y: 50,
    width: screen.width / 15,
    height: screen.width / 60
}
// The status of the arrow keys
var keys = {
    right: false,
    left: false,
    up: false,
};

var fullScreen = false;
// The friction and gravity to show realistic movements    
var gravity = screen.width / 3000;
var friction = screen.width / screen.width / 1500;
// The number of platforms
var num = 10;
// The platforms
var platforms = [];
// The clouds
var clouds = [];
// The speed
var speed = screen.width / 1920;
// The height and width of the platforms
var platWidth = screen.width / 10;
var platHeight = screen.width / 70;
// Function to render the canvas
function rendercanvas() {
    ctx.fillStyle = "#eeeeff";
    ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);
}
// Function to render the player
function renderplayer() {
    ctx.fillStyle = "#F08080";
    ctx.fillRect((player.x) - player.width, (player.y) - player.height, player.width, player.height);
}

function renderCanon() {
    ctx.fillStyle = "#F08080";
    ctx.fillRect(canon.x, canon.y, canon.width, canon.height)

}
// Function to create platforms
function createplat() {
    for (i = 0; i < num; i++) {
        platforms.push(
            {
                x: screen.width / 10 * i,
                y: screen.width / 6 + (screen.width / 45 * i),
                width: platWidth,
                height: platHeight
            }
        );
        //platforms[i].y = Math.floor(Math.random() * 150) + 200
    }
}

function createCloud() {
    for (i = 0; i < num; i++) {
        clouds.push(
            {
                x: screen.width / 10 * i,
                y: screen.width / 55 * i,
                width: platWidth,
                height: platHeight
            }
        );
    }
}

function renderCloud() {

    ctx.fillStyle = "#eeeeee";
    ctx.strokeStyle = "black";
    for (i = 0; i < clouds.length; i++) {
        ctx.strokeRect(clouds[i].x, clouds[i].y, clouds[i].width - screen.width / 60, clouds[i].height);
        ctx.fillRect(clouds[i].x, clouds[i].y, clouds[i].width - screen.width / 60, clouds[i].height);
    }

}

// Function to render platforms
function renderplat() {
    ctx.fillStyle = "#45597E";

    for (i = 0; i < platforms.length; i++) {
        ctx.fillRect(platforms[i].x, platforms[i].y, platforms[i].width - screen.width / 60, platforms[i].height);
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
            player.y_v = -screen.width / 120;
        }
    }
    // 39 is the code for the right arrow key
    if (e.keyCode == 39) {
        keys.right = true;
    }
    if (e.keyCode == 13) {
        activateFullscreen(document.documentElement);
    }
    if (e.keyCode == 122) {
        if (fullScreen == false) {
            img.src = "noFullscreen.svg";
            fullScreen = true;
        } else if (fullScreen == true) {
            img.src = "fullscreen.svg";
            fullScreen = false;
        }

    }
}
// This function is called when the pressed key is released
function keyup(e) {
    if (e.keyCode == 37) {
        keys.left = false;
    }
    if (e.keyCode == 38) {
        if (player.y_v < -screen.width / 600) {
            player.y_v = -screen.width / 900;
        }
    }
    if (e.keyCode == 39) {
        keys.right = false;
    }

}
function activateFullscreen(element) {
    img = document.getElementById("img");

    if (fullScreen == false) {
        img.src = "noFullscreen.svg";
        if (element.requestFullscreen) {
            element.requestFullscreen();        // W3C spec
        }
        else if (element.mozRequestFullScreen) {
            element.mozRequestFullScreen();     // Firefox
        }
        else if (element.webkitRequestFullscreen) {
            element.webkitRequestFullscreen();  // Safari
        }
        else if (element.msRequestFullscreen) {
            element.msRequestFullscreen();      // IE/Edge
        }
        fullScreen = true;
    } else if (fullScreen == true) {
        img.src = "fullscreen.svg";
        if (document.exitFullscreen) {
            document.exitFullscreen();
        } else if (document.mozCancelFullScreen) {
            document.mozCancelFullScreen();
        } else if (document.webkitExitFullscreen) {
            document.webkitExitFullscreen();
        }
        fullScreen = false;
    }




};
function loop() {
    // If the player is not jumping apply the effect of frictiom
    if (player.jump == false) {
        player.x_v *= friction;
    } else {
        // If the player is in the air then apply the effect of gravity
        player.y_v += gravity;
        // Makes the player reach terminal velocity
        if (player.y_v > screen.width / 40) {
            player.y_v = screen.width / 40;
        }
    }
    player.jump = true;
    // If the left key is pressed increase the relevant horizontal velocity
    if (keys.left) {
        player.x_v = -screen.width / 600;
    }
    if (keys.right) {
        player.x_v = screen.width / 600;
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
        player.x -= speed;
    }

    let k = -1;
    for (j = 0; j < clouds.length; j++) {
        if (clouds[j].x < player.x && player.x < clouds[j].x + clouds[j].width &&
            clouds[j].y < player.y && player.y < clouds[j].y + clouds[j].height) {
            k = j;
        }
    }
    // Makes sure that the player doesn't fall through the platform and that it stays on the platform
    if (k > -1) {
        player.jump = false;
        player.y = clouds[k].y;
        player.x -= speed;
    }
    // Teleports the platforms to the other side
    for (i = 0; i < platforms.length; i++) {
        platforms[i].x -= speed;
        clouds[i].x -= speed;
        if (platforms[i].x < -platWidth) {
            platforms[i].x = ctx.canvas.width;
            platforms[i].y = Math.floor(Math.random() * screen.width / 8) + screen.width / 6
        }
        if (clouds[i].x < -platWidth) {
            clouds[i].x = ctx.canvas.width;
            clouds[i].y = Math.floor(Math.random() * screen.width / 8) + screen.width / 25
        }
    }

    // Stops the player at the edge
    if (player.x > ctx.canvas.width) {
        player.x = ctx.canvas.width;
    } else if (player.x < 0) {
        player.x = 0;
    }


    // Rendering the canvas, the player and the platforms
    rendercanvas();
    renderplayer();
    renderCanon();
    renderplat();
    renderCloud();
}
canvas = document.getElementById("canvas");
ctx = canvas.getContext("2d");
ctx.canvas.height = screen.height;
ctx.canvas.width = window.innerWidth;
createplat();
createCloud();
// Adding the event listeners
document.addEventListener("keydown", keydown);
document.addEventListener("keyup", keyup);
setInterval(loop, 20);