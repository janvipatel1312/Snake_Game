const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

// Snake setup
let snake = [{ x: 200, y: 200 }];
let dx = 0;
let dy = 0;

// Score
let score = 0;

// Food
let food = {
  x: Math.floor(Math.random() * 30) * 20,
  y: Math.floor(Math.random() * 30) * 20
};

// Controls
document.addEventListener("keydown", e => {
  if (e.key === "ArrowUp" && dy === 0) {
    dx = 0; dy = -20;
  } else if (e.key === "ArrowDown" && dy === 0) {
    dx = 0; dy = 20;
  } else if (e.key === "ArrowLeft" && dx === 0) {
    dx = -20; dy = 0;
  } else if (e.key === "ArrowRight" && dx === 0) {
    dx = 20; dy = 0;
  }
});

function draw() {
  // Black background (clears screen)
  ctx.fillStyle = "black";
  ctx.fillRect(0, 0, 600, 600);

  // Move snake
  let head = {
    x: snake[0].x + dx,
    y: snake[0].y + dy
  };

  // Prevent movement before key press
  if (dx !== 0 || dy !== 0) {
    snake.unshift(head);
  }

  // Food collision
  if (head.x === food.x && head.y === food.y) {
    score++;

    food = {
      x: Math.floor(Math.random() * 30) * 20,
      y: Math.floor(Math.random() * 30) * 20
    };
  } else {
    snake.pop();
  }

  // Wall collision
  if (
    head.x < 0 || head.x >= 600 ||
    head.y < 0 || head.y >= 600
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

  // Draw snake
  ctx.fillStyle = "white";
  snake.forEach(part => {
    ctx.fillRect(part.x, part.y, 20, 20);
  });

  // Draw food
  ctx.fillStyle = "yellow";
  ctx.fillRect(food.x, food.y, 20, 20);

  // Draw score (must redraw every frame)
  ctx.fillStyle = "white";
  ctx.font = "20px Arial";
  ctx.fillText("Score: " + score, 10, 25);
}

// Game loop
setInterval(draw, 100);
