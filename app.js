console.log("I am loaded!");

const canvas = document.querySelector("#screen");
const ctx = canvas.getContext("2d");

// //Ball Variables
let ballHeight = 10;
let ballWidth = 10;
let ballX = canvas.width / 2 - ballWidth / 2;
let ballY = canvas.height - 70;
let ballSpeedX = 2;
let ballSpeedY = -2;

function drawBall() {
  ballX += ballSpeedX;
  ballY += ballSpeedY;
  ctx.fillRect(ballX, ballY, ballWidth, ballWidth);
  if (ballX >= canvas.width - ballWidth / 2 || ballX <= 0 - ballHeight / 2) {
    ballSpeedX = ballSpeedX * -1;
  }
  if (ballY >= canvas.height - ballHeight / 2 || ballY <= 0 - ballHeight / 2) {
    ballSpeedY = ballSpeedY * -1;
  }
}

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawBall();
  requestAnimationFrame(draw);
}

draw();
