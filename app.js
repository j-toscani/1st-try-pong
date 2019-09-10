"use strict";

console.log("I am loaded!");

const canvas = document.querySelector("#screen");
const ctx = canvas.getContext("2d");
let life = 2;
let score = 0;

// adjust life and score display
const lifeDisplay = document.querySelector("#lifes");
const scoreDisplay = document.querySelector("#score");

function createUserInfo() {
  lifeDisplay.innerHTML = `You have ${life} lifes remaining.`;
  scoreDisplay.innerHTML = `Score: ${score}`;
}

// loading images
const ballImage = new Image();
ballImage.src = "sprites/ball.jpg";
const paddleImage = new Image();
paddleImage.src = "./sprites/paddle.jpg";

// Ball Variables
const ball = {
  Height: 10,
  Width: 10,
  X: canvas.width / 2,
  Y: canvas.height - 70,
  SpeedX: 2,
  SpeedY: -2,
  Image: ballImage
};

ball.X = ball.X - ball.Width / 2;

//Ball Functions
function drawBall() {
  ball.X += ball.SpeedX;
  ball.Y += ball.SpeedY;
  ctx.drawImage(ballImage, ball.X, ball.Y, ball.Width, ball.Height);
  if (
    ball.X >= canvas.width - ball.Width / 2 ||
    ball.X <= 0 - ball.Height / 2
  ) {
    ball.SpeedX = ball.SpeedX * -1;
  }
  if (ball.Y <= 0 - ball.Height / 2) {
    ball.SpeedY = ball.SpeedY * -1;
  }
  if (
    ball.Y >= paddle.Y - ball.Height &&
    ball.Y <= paddle.Y + paddle.Height + ball.Height &&
    (ball.X >= paddle.X && ball.X <= paddle.X + paddle.Width)
  ) {
    ball.SpeedY = ball.SpeedY * -1;
    ball.SpeedX = ball.SpeedX * 1.25;
    ball.SpeedY = ball.SpeedY * 1.25;
    paddle.SpeedY = paddle.SpeedY * 1.2;
    score = ++score;
  }
  if (ball.Y > canvas.height) {
    life = life - 1;
    ball.X = canvas.width / 2 - ball.Width / 2;
    ball.Y = canvas.height - 70;
    ball.SpeedY = ball.SpeedY * -1;
  }
}

const paddle = {
  Height: 20,
  Width: 100,
  X: canvas.width / 2,
  Y: canvas.height - 70 + 15,
  SpeedY: 15,
  Image: paddleImage
};

paddle.X = paddle.X - paddle.Width / 2;

// Paddle Functions
function drawPaddle() {
  ctx.drawImage(paddleImage, paddle.X, paddle.Y, paddle.Width, paddle.Height);
}
function movePaddleRight() {
  paddle.X += paddle.SpeedY;
}
function movePaddleLeft() {
  paddle.X -= paddle.SpeedY;
}
//Paddle interaction
// https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/key
window.addEventListener("keydown", function(e) {
  if (e.key === "ArrowRight") {
    movePaddleRight();
  }
  if (e.key === "ArrowLeft") {
    movePaddleLeft();
  }
});

//Game function
function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawPaddle();
  drawBall();
  createUserInfo();
  if (life > 0) {
    requestAnimationFrame(draw);
  } else {
    // change alert to confirm to ask for restart.
    // first, include storage
    if (score < 5) {
      alert(`Game Over :(. You hit the ball.: ${score} times... meh.`);
    } else if (score > 5 && score < 10) {
      alert(`Game Over :(. You hit the ball: ${score} times. Well done!`);
    } else if (score >= 10) {
      alert(`Game Over :(. You hit the ball: ${score} times. Shibedisheesh!`);
    }
  }
}

draw();
