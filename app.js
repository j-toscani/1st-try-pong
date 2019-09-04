"use strict";

console.log("I am loaded!");

const canvas = document.querySelector("#screen");
const ctx = canvas.getContext("2d");

// Ball Variables
let ballHeight = 10;
let ballWidth = 10;
let ballX = canvas.width / 2 - ballWidth / 2;
let ballY = canvas.height - 70;
let ballSpeedX = 2;
let ballSpeedY = -2;

// Paddle Variables
let paddleHeight = 20;
let paddleWidth = 100;
let paddleX = canvas.width / 2 - paddleWidth / 2;
let paddleY = canvas.height - 70 + 15;

function drawPaddle() {
  ctx.fillRect(paddleX, paddleY, paddleWidth, paddleHeight);
}

function drawBall() {
  ballX += ballSpeedX;
  ballY += ballSpeedY;
  ctx.fillRect(ballX, ballY, ballWidth, ballHeight);
  if (ballX >= canvas.width - ballWidth / 2 || ballX <= 0 - ballHeight / 2) {
    ballSpeedX = ballSpeedX * -1;
  }
  if (
    ballY <= 0 + ballHeight / 2 ||
    (ballY >= paddleY - ballHeight / 2 &&
      (ballX >= paddleX && ballX <= paddleX + paddleWidth))
  ) {
    ballSpeedY = ballSpeedY * -1;
  }
}

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawPaddle();
  drawBall();
  requestAnimationFrame(draw);
}

draw();
