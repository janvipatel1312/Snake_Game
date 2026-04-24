const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

let snake = [{x: 300, y: 300}];
let dx = 20;
let dy = 0;

let food = {
  x: Math.floor(Math.random() * 30) * 20,
  y: Math.floor(Math.random() * 30) * 20
};

function draw() {
  ctx.clearRect(0, 0, 600, 600);

  // draw snake
  snake.forEach(part => {
    ctx.fillStyle = "white";
    ctx.fillRect(part.x, part.y, 20, 20);
  });

  // move snake
  let head = {x: snake[0].x + dx, y: snake[0].y + dy};
  snake.unshift(head);

  // food collision
  if (head.x === food.x && head.y === food.y) {
    food = {
      x: Math.floor(Math.random() * 30) * 20,
      y: Math.floor(Math.random() * 30) * 20
    };
  } else {
    snake.pop();
  }

  // draw food
  ctx.fillStyle = "yellow";
  ctx.fillRect(food.x, food.y, 20, 20);

  // wall collision
  if (head.x < 0 || head.x >= 600 || head.y < 0 || head.y >= 600) {
    alert("Game Over");
    document.location.reload();
  }
}

document.addEventListener("keydown", e => {
  if (e.key === "ArrowUp" && dy === 0) { dx = 0; dy = -20; }
  if (e.key === "ArrowDown" && dy === 0) { dx = 0; dy = 20; }
  if (e.key === "ArrowLeft" && dx === 0) { dx = -20; dy = 0; }
  if (e.key === "ArrowRight" && dx === 0) { dx = 20; dy = 0; }
});

setInterval(draw, 100);