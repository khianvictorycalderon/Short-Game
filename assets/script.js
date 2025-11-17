const redSize = 100;
const blueSize = 50;

// Create the red square
const redSquare = document.createElement('div');
redSquare.style.width = `${redSize}px`;
redSquare.style.height = `${redSize}px`;
redSquare.style.background = 'red';
redSquare.style.position = 'absolute';
redSquare.style.top = '100px';
redSquare.style.left = '100px';
document.body.appendChild(redSquare);

// Create the blue square
const blueSquare = document.createElement('div');
blueSquare.style.width = `${blueSize}px`;
blueSquare.style.height = `${blueSize}px`;
blueSquare.style.background = 'blue';
blueSquare.style.position = 'absolute';
blueSquare.style.top = '500px';
blueSquare.style.left = '500px';
document.body.appendChild(blueSquare);

// Initial positions
let rx = 100, ry = 100; // red square
let bx = 500, by = 500; // blue square
const redSpeed = 5;      // red speed
const blueSpeed = 7;     // blue speed (slightly faster)

// Track pressed keys
const keys = {};

// Game timer
const startTime = Date.now();
const gameDuration = 60000; // 60 seconds
let gameOver = false;

// Key down/up
document.addEventListener('keydown', e => keys[e.key.toLowerCase()] = true);
document.addEventListener('keyup', e => keys[e.key.toLowerCase()] = false);

// Collision detection
const checkCollision = () => {
  return !(rx + redSize < bx || rx > bx + blueSize || ry + redSize < by || ry > by + blueSize);
};

// Animation loop
const loop = () => {
  if (gameOver) return;

  // Red square (WASD)
  if (keys["w"]) ry -= redSpeed;
  if (keys["s"]) ry += redSpeed;
  if (keys["a"]) rx -= redSpeed;
  if (keys["d"]) rx += redSpeed;

  rx = Math.max(0, Math.min(window.innerWidth - redSize, rx));
  ry = Math.max(0, Math.min(window.innerHeight - redSize, ry));
  redSquare.style.left = `${rx}px`;
  redSquare.style.top = `${ry}px`;

  // Blue square (Arrow keys)
  if (keys["arrowup"]) by -= blueSpeed;
  if (keys["arrowdown"]) by += blueSpeed;
  if (keys["arrowleft"]) bx -= blueSpeed;
  if (keys["arrowright"]) bx += blueSpeed;

  bx = Math.max(0, Math.min(window.innerWidth - blueSize, bx));
  by = Math.max(0, Math.min(window.innerHeight - blueSize, by));
  blueSquare.style.left = `${bx}px`;
  blueSquare.style.top = `${by}px`;

  // Check collision
  if (checkCollision()) {
    alert("Red wins!");
    gameOver = true;
    return;
  }

  // Check timer
  if (Date.now() - startTime >= gameDuration) {
    alert("Blue wins!");
    gameOver = true;
    return;
  }

  requestAnimationFrame(loop);
};

// Start the loop
requestAnimationFrame(loop);
