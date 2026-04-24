const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

// Snake setup
let snake = [{ x: 200, y: 200 }];
let dx = 0;
let dy = 0;

// Prevent fast reverse
let changingDirection = false;

// Score
let score = 0;

// Generate food safely (NOT on snake)
function generateFood() {
  let newFood;

  while (true) {
    newFood = {
      x: Math.floor(Math.random() * (canvas.width / 20)) * 20,
      y: Math.floor(Math.random() * (canvas.height / 20)) * 20
    };

    let collision = snake.some(part => part.x === newFood.x && part.y === newFood.y);

    if (!collision) break;
  }

  return newFood;
}

let food = generateFood();

// Controls
document.addEventListener("keydown", e => {
  if (changingDirection) return;

  if (e.key === "ArrowUp" && dy === 0) {
    dx = 0; dy = -20;
  } else if (e.key === "ArrowDown" && dy === 0) {
    dx = 0; dy = 20;
  } else if (e.key === "ArrowLeft" && dx === 0) {
    dx = -20; dy = 0;
  } else if (e.key === "ArrowRight" && dx === 0) {
    dx = 20; dy = 0;
  }

  changingDirection = true;
});

function draw() {
  // Reset direction lock
  changingDirection = false;

  // Background
  ctx.fillStyle = "black";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // If game not started → just draw
  if (dx === 0 && dy === 0) {
    drawElements();
    return;
  }

  // Move snake
  let head = {
    x: snake[0].x + dx,
    y: snake[0].y + dy
  };

  snake.unshift(head);

  // Food collision
  if (head.x === food.x && head.y === food.y) {
    score++;
    food = generateFood();
  } else {
    snake.pop();
  }

  // Wall collision (FIXED)
  if (
    head.x < 0 || head.x >= canvas.width ||
    head.y < 0 || head.y >= canvas.height
  ) {
    alert("Game Over");
    document.location.reload();
  }

  // Tail collision
  for (let i = 1; i < snake.length; i++) {
    if (head.x === snake[i].x && head.y === snake[i].y) {
      alert("Game Over");
      document.location.reload();
    }
  }

  // Draw everything
  drawElements();
}

// Drawing function
function drawElements() {
  // Snake
  ctx.fillStyle = "white";
  snake.forEach(part => {
    ctx.fillRect(part.x, part.y, 20, 20);
  });

  // Food
  ctx.fillStyle = "yellow";
  ctx.fillRect(food.x, food.y, 20, 20);

  // Scoreboard
  ctx.fillStyle = "white";
  ctx.font = "20px Arial";
  ctx.fillText("Score: " + score, 10, 25);
}

// Game loop
setInterval(draw, 100);
