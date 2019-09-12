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
  height: 10,
  width: 10,
  X: canvas.width / 2,
  Y: canvas.height - 70,
  SpeedX: 2,
  SpeedY: -2,
  Image: ballImage
};
ball.X = ball.X - ball.width / 2;
// Paddle Variables
const paddle = {
  height: 20,
  width: 100,
  X: canvas.width / 2,
  Y: canvas.height - 70 + 15,
  SpeedY: 15,
  Image: paddleImage
};
paddle.X = paddle.X - paddle.width / 2;
// Obstacle Variables (for testing)
const obstacle = {
  height: 100,
  width: 100,
  X: canvas.width / 2,
  Y: canvas.height / 2
};

obstacle.X = obstacle.X - obstacle.height / 2;
obstacle.Y = obstacle.Y - obstacle.width / 2;

//Collision detection

function detectCollisionWallRight(object) {
  return object.X >= canvas.width - object.width;
}
function detectCollisionWallLeft(object) {
  return object.X <= 0;
}
function detectCollisionWallTop(object) {
  return object.Y <= 0;
}
function detectCollisionWallBottom(object) {
  return object.Y > canvas.height;
}
function detectCollisionBetween(firstObject, secondObject) {
  return (
    firstObject.Y >= secondObject.Y - firstObject.height &&
    firstObject.Y <= secondObject.Y + secondObject.height &&
    (firstObject.X + firstObject.width >= secondObject.X &&
      firstObject.X <= secondObject.X + secondObject.width)
  );
}

//Ball Functions
function drawBall() {
  ball.X += ball.SpeedX;
  ball.Y += ball.SpeedY;
  ctx.drawImage(ballImage, ball.X, ball.Y, ball.width, ball.height);
  if (detectCollisionWallLeft(ball) || detectCollisionWallRight(ball)) {
    ball.SpeedX = ball.SpeedX * -1;
  }
  if (detectCollisionWallTop(ball)) {
    ball.SpeedY = ball.SpeedY * -1;
  }
  if (detectCollisionBetween(ball, paddle)) {
    ball.SpeedY = ball.SpeedY * -1;
    ball.SpeedX = ball.SpeedX * 1.25;
    ball.SpeedY = ball.SpeedY * 1.25;
    paddle.SpeedY = paddle.SpeedY * 1.2;
    score = ++score;
  }
  if (detectCollisionWallBottom(ball)) {
    life = life - 1;
    ball.X = canvas.width / 2 - ball.width / 2;
    ball.Y = canvas.height - 70;
    ball.SpeedY = ball.SpeedY * -1;
  }
}

// Paddle Functions
function drawPaddle() {
  ctx.drawImage(paddleImage, paddle.X, paddle.Y, paddle.width, paddle.height);
  if (detectCollisionWallLeft(paddle)) {
    paddle.X = 0;
  }
  if (detectCollisionWallRight(paddle)) {
    paddle.X = canvas.width - paddle.width;
  }
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

function obstacleCollision() {}
function drawObstacle() {
  ctx.fillRect(obstacle.X, obstacle.Y, obstacle.width, obstacle.height);
  const collision = detectCollisionBetween(ball, obstacle);
  if (collision) {
    ball.SpeedX = 0;
    ball.SpeedY = 0;
    // if (
    //   ball.X > obstacle.X &&
    //   ball.X < obstacle.X + obstacle.width &&
    //   ball.SpeedX > 0
    // ) {
    //   ball.SpeedX *= -1;
    // } else if (
    //   ball.Y > obstacle.Y &&
    //   ball.Y < obstacle.Y + obstacle.height &&
    //   ball.SpeedY > 0
    // ) {
    //   ball.SpeedY *= -1;
    // } else if (
    //   ball.X > obstacle.X &&
    //   ball.X < obstacle.X + obstacle.width &&
    //   ball.SpeedX < 0
    // ) {
    //   ball.SpeedX *= -1;
    // } else if (ball.Y < obstacle.Y - ball.height && ball.SpeedY < 0) {
    //   ball.SpeedY *= -1;
    // }
  }
}
//Game function
function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawPaddle();
  drawBall();
  drawObstacle();
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
