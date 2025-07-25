const canvas = document.getElementById("pong");
const ctx = canvas.getContext("2d");

// --- Game Settings ---
const PADDLE_WIDTH = 12;
const PADDLE_HEIGHT = 80;
const BALL_SIZE = 14;
const PLAYER_X = 20;
const AI_X = canvas.width - PLAYER_X - PADDLE_WIDTH;
const WIN_SCORE = 5;
const POWERUP_SIZE = 22; // Powerup width/height
const POWERUP_TYPES = ["speed", "bigpaddle", "multiball"]; // Available powerups

// --- Blocks (Obstacles) ---
const BLOCKS = [
    // Example: Place blocks in the middle and sides
    { x: 200, y: 120, w: 24, h: 70 },
    { x: 340, y: 180, w: 24, h: 70 },
    { x: 480, y: 100, w: 24, h: 70 },
    { x: 340, y: 40,  w: 24, h: 70 },
    { x: 340, y: 300, w: 24, h: 70 }
];

// --- Game State ---
let playerY = (canvas.height - PADDLE_HEIGHT) / 2;
let aiY = (canvas.height - PADDLE_HEIGHT) / 2;
let playerScore = 0;
let aiScore = 0;
let isGamePaused = true; // Start paused
let isGameOver = false;
let winner = "";

// --- Ball State (supporting multiball) ---
let balls = [
    {
        x: canvas.width / 2 - BALL_SIZE / 2,
        y: canvas.height / 2 - BALL_SIZE / 2,
        speedX: 5 * (Math.random() > 0.5 ? 1 : -1),
        speedY: 4 * (Math.random() > 0.5 ? 1 : -1),
        color: "#fff"
    }
];

// --- Powerups State ---
let powerups = [];
let playerPaddleSize = PADDLE_HEIGHT;
let aiPaddleSize = PADDLE_HEIGHT;
let powerupTimers = {
    playerBig: 0,
    aiBig: 0,
    playerSpeed: 0,
    aiSpeed: 0
};
const POWERUP_DURATION = 600; // frames (~10 seconds at 60fps)

// --- Keyboard Control State ---
let upPressed = false;
let downPressed = false;
const KEYBOARD_SPEED = 7;

// --- Utility Draw Functions ---
function drawRect(x, y, w, h, color = "#fff") {
    ctx.fillStyle = color;
    ctx.fillRect(x, y, w, h);
}

function drawText(text, x, y, color = "#fff", font = "32px Arial") {
    ctx.fillStyle = color;
    ctx.font = font;
    ctx.fillText(text, x, y);
}

function drawNet() {
    for (let i = 0; i < canvas.height; i += 26) {
        drawRect(canvas.width / 2 - 1, i, 2, 16, "#aaa");
    }
}

function drawPowerup(p) {
    let color;
    if (p.type === "speed") color = "#FFC107";
    else if (p.type === "bigpaddle") color = "#03A9F4";
    else if (p.type === "multiball") color = "#FF4081";
    drawRect(p.x, p.y, POWERUP_SIZE, POWERUP_SIZE, color);
    drawText(p.type[0].toUpperCase(), p.x + 4, p.y + 18, "#222", "bold 18px Arial");
}

function drawBlocks() {
    for (let block of BLOCKS) {
        drawRect(block.x, block.y, block.w, block.h, "#7C4DFF");
    }
}

// --- Game Logic ---
function resetBall() {
    balls = [
        {
            x: canvas.width / 2 - BALL_SIZE / 2,
            y: canvas.height / 2 - BALL_SIZE / 2,
            speedX: 5 * (Math.random() > 0.5 ? 1 : -1),
            speedY: 4 * (Math.random() > 0.5 ? 1 : -1),
            color: "#fff"
        }
    ];
}

function resetGame() {
    playerScore = 0;
    aiScore = 0;
    winner = "";
    isGameOver = false;
    playerPaddleSize = PADDLE_HEIGHT;
    aiPaddleSize = PADDLE_HEIGHT;
    powerupTimers = {playerBig: 0, aiBig: 0, playerSpeed: 0, aiSpeed: 0};
    balls = [
        {
            x: canvas.width / 2 - BALL_SIZE / 2,
            y: canvas.height / 2 - BALL_SIZE / 2,
            speedX: 5 * (Math.random() > 0.5 ? 1 : -1),
            speedY: 4 * (Math.random() > 0.5 ? 1 : -1),
            color: "#fff"
        }
    ];
    powerups = [];
    isGamePaused = true; // Start paused
}

// -- Block Collision Helper
function ballBlockCollision(ball, block) {
    // Ball rectangle
    let bx = ball.x, by = ball.y, bw = BALL_SIZE, bh = BALL_SIZE;
    let overlapX = bx < block.x + block.w && bx + bw > block.x;
    let overlapY = by < block.y + block.h && by + bh > block.y;
    if (overlapX && overlapY) {
        // Figure out which side the collision is from
        let prevX = bx - ball.speedX;
        let prevY = by - ball.speedY;
        let collidedFromLeft = prevX + bw <= block.x;
        let collidedFromRight = prevX >= block.x + block.w;
        let collidedFromTop = prevY + bh <= block.y;
        let collidedFromBottom = prevY >= block.y + block.h;

        // Reverse velocity accordingly
        if ((collidedFromLeft && ball.speedX > 0) || (collidedFromRight && ball.speedX < 0)) {
            ball.speedX = -ball.speedX;
            ball.x = collidedFromLeft ? block.x - bw : block.x + block.w;
        } else if ((collidedFromTop && ball.speedY > 0) || (collidedFromBottom && ball.speedY < 0)) {
            ball.speedY = -ball.speedY;
            ball.y = collidedFromTop ? block.y - bh : block.y + block.h;
        } else {
            // If unsure, reverse both
            ball.speedX = -ball.speedX;
            ball.speedY = -ball.speedY;
        }
        // Ball color blink
        ball.color = "#7C4DFF";
        setTimeout(() => { ball.color = "#fff"; }, 180);
    }
}

function spawnPowerup() {
    // Randomly spawn powerups if none exist
    if (powerups.length < 1 && Math.random() < 0.008) {
        let type = POWERUP_TYPES[Math.floor(Math.random() * POWERUP_TYPES.length)];
        let px = Math.random() * (canvas.width - 2 * POWERUP_SIZE - 60) + 60;
        let py = Math.random() * (canvas.height - POWERUP_SIZE);
        powerups.push({
            x: px,
            y: py,
            type: type
        });
    }
}

function updatePowerups() {
    // Timers for paddle size and speed
    if (powerupTimers.playerBig > 0) {
        powerupTimers.playerBig--;
        if (powerupTimers.playerBig === 0) playerPaddleSize = PADDLE_HEIGHT;
    }
    if (powerupTimers.aiBig > 0) {
        powerupTimers.aiBig--;
        if (powerupTimers.aiBig === 0) aiPaddleSize = PADDLE_HEIGHT;
    }
    if (powerupTimers.playerSpeed > 0) powerupTimers.playerSpeed--;
    if (powerupTimers.aiSpeed > 0) powerupTimers.aiSpeed--;
}

function applyPowerup(type, side) {
    if (type === "bigpaddle") {
        if (side === "player") {
            playerPaddleSize = PADDLE_HEIGHT * 1.7;
            powerupTimers.playerBig = POWERUP_DURATION;
        } else {
            aiPaddleSize = PADDLE_HEIGHT * 1.7;
            powerupTimers.aiBig = POWERUP_DURATION;
        }
    }
    if (type === "speed") {
        if (side === "player") {
            powerupTimers.playerSpeed = POWERUP_DURATION;
        } else {
            powerupTimers.aiSpeed = POWERUP_DURATION;
        }
    }
    if (type === "multiball" && balls.length < 3) {
        // Add another ball
        balls.push({
            x: canvas.width / 2 - BALL_SIZE / 2,
            y: canvas.height / 2 - BALL_SIZE / 2,
            speedX: 5 * (Math.random() > 0.5 ? 1 : -1),
            speedY: 4 * (Math.random() > 0.5 ? 1 : -1),
            color: "#fff"
        });
    }
}

function update() {
    if (isGamePaused || isGameOver) return;

    spawnPowerup();
    updatePowerups();

    // Keyboard controls override mouse if pressed
    if (upPressed) {
        playerY -= KEYBOARD_SPEED;
    }
    if (downPressed) {
        playerY += KEYBOARD_SPEED;
    }
    // Clamp player paddle
    if (playerY < 0) playerY = 0;
    if (playerY + playerPaddleSize > canvas.height) playerY = canvas.height - playerPaddleSize;

    // Move all balls
    for (let b = balls.length - 1; b >= 0; b--) {
        let ball = balls[b];
        // Ball speed multiplier for powerup
        let speedMult = 1;
        if (ball.lastHit === "player" && powerupTimers.playerSpeed > 0) speedMult = 1.6;
        if (ball.lastHit === "ai" && powerupTimers.aiSpeed > 0) speedMult = 1.6;
        ball.x += ball.speedX * speedMult;
        ball.y += ball.speedY * speedMult;

        // Block collisions
        for (let block of BLOCKS) {
            ballBlockCollision(ball, block);
        }

        // Top/bottom collision
        if (ball.y < 0) {
            ball.y = 0;
            ball.speedY = -ball.speedY;
        }
        if (ball.y + BALL_SIZE > canvas.height) {
            ball.y = canvas.height - BALL_SIZE;
            ball.speedY = -ball.speedY;
        }

        // Paddle collision - Left (Player)
        if (
            ball.x < PLAYER_X + PADDLE_WIDTH &&
            ball.y + BALL_SIZE > playerY &&
            ball.y < playerY + playerPaddleSize
        ) {
            ball.x = PLAYER_X + PADDLE_WIDTH;
            ball.speedX = -ball.speedX;
            // Ball changes color for a moment
            ball.color = "#4CAF50";
            setTimeout(() => (ball.color = "#fff"), 180);
            ball.lastHit = "player";
            // Add some randomness
            ball.speedY += (Math.random() - 0.5) * 2;
        }

        // Paddle collision - Right (AI)
        if (
            ball.x + BALL_SIZE > AI_X &&
            ball.y + BALL_SIZE > aiY &&
            ball.y < aiY + aiPaddleSize
        ) {
            ball.x = AI_X - BALL_SIZE;
            ball.speedX = -ball.speedX;
            ball.color = "#F44336";
            setTimeout(() => (ball.color = "#fff"), 180);
            ball.lastHit = "ai";
            ball.speedY += (Math.random() - 0.5) * 2;
        }

        // Score
        if (ball.x < 0) {
            aiScore++;
            balls.splice(b, 1);
            if (balls.length === 0) resetBall();
            continue;
        }
        if (ball.x + BALL_SIZE > canvas.width) {
            playerScore++;
            balls.splice(b, 1);
            if (balls.length === 0) resetBall();
            continue;
        }

        // Powerup collision
        for (let p = powerups.length - 1; p >= 0; p--) {
            let power = powerups[p];
            if (
                ball.x < power.x + POWERUP_SIZE &&
                ball.x + BALL_SIZE > power.x &&
                ball.y < power.y + POWERUP_SIZE &&
                ball.y + BALL_SIZE > power.y
            ) {
                // Assign to whoever last hit the ball, default player if undefined
                let who = ball.speedX < 0 ? "player" : "ai";
                if (typeof ball.lastHit !== "undefined") who = ball.lastHit;
                applyPowerup(power.type, who);
                powerups.splice(p, 1);
            }
        }
    }

    // Win condition
    if (playerScore >= WIN_SCORE) {
        isGameOver = true;
        winner = "Player";
    } else if (aiScore >= WIN_SCORE) {
        isGameOver = true;
        winner = "AI";
    }

    // AI movement (basic, try to follow closest ball)
    let aiTarget = balls.reduce(
        (min, ball) => (Math.abs(ball.x - AI_X) < Math.abs(min.x - AI_X) ? ball : min),
        balls[0]
    );
    let aiCenter = aiY + aiPaddleSize / 2;
    let aiSpeed = powerupTimers.aiSpeed > 0 ? 8 : 4.5;
    if (aiCenter < aiTarget.y + BALL_SIZE / 2 - 12) {
        aiY += aiSpeed;
    } else if (aiCenter > aiTarget.y + BALL_SIZE / 2 + 12) {
        aiY -= aiSpeed;
    }
    // Clamp AI paddle within canvas
    if (aiY < 0) aiY = 0;
    if (aiY + aiPaddleSize > canvas.height) aiY = canvas.height - aiPaddleSize;
}

function render() {
    drawRect(0, 0, canvas.width, canvas.height, "#212121");
    drawNet();

    // Draw blocks
    drawBlocks();

    // Draw paddles
    drawRect(PLAYER_X, playerY, PADDLE_WIDTH, playerPaddleSize, "#4CAF50");
    drawRect(AI_X, aiY, PADDLE_WIDTH, aiPaddleSize, "#F44336");

    // Draw balls
    for (const ball of balls) {
        drawRect(ball.x, ball.y, BALL_SIZE, BALL_SIZE, ball.color);
    }

    // Draw powerups
    for (const p of powerups) drawPowerup(p);

    // Draw score
    drawText(playerScore, canvas.width / 4, 50);
    drawText(aiScore, (canvas.width * 3) / 4, 50);

    // Pause message
    if (isGamePaused && !isGameOver) {
        ctx.fillStyle = "rgba(0,0,0,0.5)";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        drawText("PAUSED", canvas.width / 2 - 70, canvas.height / 2);
        ctx.font = "20px Arial";
        ctx.fillStyle = "#fff";
        ctx.fillText("Click the Pause/Resume button or press 'P' to start", canvas.width / 2 - 170, canvas.height / 2 + 36);
        ctx.fillText("Use mouse or \u2191/\u2193 arrow keys to move", canvas.width / 2 - 120, canvas.height / 2 + 70);
    }

    // Win message
    if (isGameOver) {
        ctx.fillStyle = "rgba(0,0,0,0.7)";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        drawText(`${winner} Wins!`, canvas.width / 2 - 100, canvas.height / 2 - 20);
        ctx.font = "24px Arial";
        ctx.fillStyle = "#fff";
        ctx.fillText("Press 'R' to Restart", canvas.width / 2 - 90, canvas.height / 2 + 30);
    }
}

function gameLoop() {
    update();
    render();
    requestAnimationFrame(gameLoop);
}

// Mouse controls (disabled if keyboard is being used)
canvas.addEventListener("mousemove", function (evt) {
    if (isGameOver) return;
    if (upPressed || downPressed) return; // Keyboard takes priority
    const rect = canvas.getBoundingClientRect();
    const root = document.documentElement;
    const mouseY = evt.clientY - rect.top - root.scrollTop;
    playerY = mouseY - playerPaddleSize / 2;
    // Clamp
    if (playerY < 0) playerY = 0;
    if (playerY + playerPaddleSize > canvas.height) playerY = canvas.height - playerPaddleSize;
});

// Keyboard controls
document.addEventListener("keydown", function (evt) {
    if (evt.key === "p" || evt.key === "P") {
        if (!isGameOver) {
            isGamePaused = !isGamePaused;
            pauseBtn.textContent = isGamePaused ? "Resume" : "Pause";
        }
    }
    if (evt.key === "r" || evt.key === "R") {
        resetGame();
        pauseBtn.textContent = "Resume";
    }
    if (evt.key === "ArrowUp") {
        upPressed = true;
    }
    if (evt.key === "ArrowDown") {
        downPressed = true;
    }
});
document.addEventListener("keyup", function (evt) {
    if (evt.key === "ArrowUp") {
        upPressed = false;
    }
    if (evt.key === "ArrowDown") {
        downPressed = false;
    }
});

// --- Pause Button UI ---
const pauseBtn = document.createElement("button");
pauseBtn.textContent = "Resume";
pauseBtn.id = "pauseBtn";
pauseBtn.style.position = "absolute";
pauseBtn.style.top = (canvas.offsetTop + 20) + "px";
pauseBtn.style.left = (canvas.offsetLeft + canvas.width + 20) + "px";
pauseBtn.style.padding = "10px 20px";
pauseBtn.style.fontSize = "1rem";
pauseBtn.style.background = "#333";
pauseBtn.style.color = "#fff";
pauseBtn.style.border = "none";
pauseBtn.style.borderRadius = "6px";
pauseBtn.style.cursor = "pointer";
pauseBtn.style.zIndex = 2;

document.body.appendChild(pauseBtn);

pauseBtn.addEventListener("click", function () {
    if (!isGameOver) {
        isGamePaused = !isGamePaused;
        pauseBtn.textContent = isGamePaused ? "Resume" : "Pause";
    }
});

// Adjust pause button position if window resizes
window.addEventListener("resize", function () {
    pauseBtn.style.top = (canvas.offsetTop + 20) + "px";
    pauseBtn.style.left = (canvas.offsetLeft + canvas.width + 20) + "px";
});

gameLoop();