"use strict";

console.log("I am loaded!");

const canvas = document.querySelector("#screen");
const ctx = canvas.getContext("2d");
let life = 2;
let score = 0;

// adjust life and score display
const lifeDisplay = document.querySelector("#lifes");
const scoreDisplay = document.querySelector("#score");

function adjustLife() {
  lifeDisplay.innerHTML = `You have ${life} lifes remaining.`;
}
function adjustScore() {
  scoreDisplay.innerHTML = `Score: ${score}`;
}

// Ball Variables
let ballHeight = 10;
let ballWidth = 10;
let ballX = canvas.width / 2 - ballWidth / 2;
let ballY = canvas.height - 70;
let ballSpeedX = 2;
let ballSpeedY = -2;

// loading images
const ball = new Image();
ball.src = "sprites/ball.jpg";
const paddle = new Image();
paddle.src = "sprites/paddle.jpg";

//Ball Functions
function drawBall() {
  ballX += ballSpeedX;
  ballY += ballSpeedY;
  ctx.drawImage(ball, ballX, ballY, ballWidth, ballHeight);
  if (ballX >= canvas.width - ballWidth / 2 || ballX <= 0 - ballHeight / 2) {
    ballSpeedX = ballSpeedX * -1;
  }
  if (ballY <= 0 - ballHeight / 2) {
    ballSpeedY = ballSpeedY * -1;
  }
  if (
    ballY >= paddleY - ballHeight &&
    ballY <= paddleY + paddleHeight + ballHeight &&
    (ballX >= paddleX && ballX <= paddleX + paddleWidth)
  ) {
    ballSpeedY = ballSpeedY * -1;
    ballSpeedX = ballSpeedX * 1.3;
    ballSpeedY = ballSpeedY * 1.3;
    score = ++score;
  }
  if (ballY > canvas.height) {
    life = life - 1;
    ballX = canvas.width / 2 - ballWidth / 2;
    ballY = canvas.height - 70;
    ballSpeedY = ballSpeedY * -1;
  }
}

// Paddle Variables
let paddleHeight = 20;
let paddleWidth = 100;
let paddleX = canvas.width / 2 - paddleWidth / 2;
let paddleY = canvas.height - 70 + 15;
let paddleSpeedY = 15;

// Paddle Functions
function drawPaddle() {
  ctx.drawImage(paddle, paddleX, paddleY, paddleWidth, paddleHeight);
}
function movePaddleRight() {
  paddleX += paddleSpeedY;
}
function movePaddleLeft() {
  paddleX -= paddleSpeedY;
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
  adjustLife();
  adjustScore();
  if (life > 0) {
    requestAnimationFrame(draw);
  } else {
    // change alert to confirm to ask for restart.
    // first, include storage
    if (score < 5) {
      adjustLife();
      alert(`Game Over :(. You hit the ball: ${score} times... meh.`);
    } else if (score > 5 && score < 10) {
      adjustLife();
      alert(`Game Over :(. You hit the ball: ${score} times. Well done!`);
    } else if (score < 10) {
      adjustLife();
      alert(`Game Over :(. You hit the ball: ${score} times. Shibedisheesh!`);
    }
  }
}

draw();
