const redSize = 100;
const blueSize = 50;

// Create the timer display
const timerDisplay = document.createElement('div');
timerDisplay.style.position = 'absolute';
timerDisplay.style.top = '10px';
timerDisplay.style.left = '50%';
timerDisplay.style.transform = 'translateX(-50%)';
timerDisplay.style.fontSize = '24px';
timerDisplay.style.fontWeight = 'bold';
timerDisplay.style.color = 'black';
timerDisplay.textContent = 'Time Left: 30s';
document.body.appendChild(timerDisplay);

// Create the red square
const redSquare = document.createElement('div');
redSquare.style.width = `${redSize}px`;
redSquare.style.height = `${redSize}px`;
redSquare.style.background = 'red';
redSquare.style.position = 'absolute';
redSquare.style.top = '100px';
redSquare.style.left = '100px';
redSquare.style.border = 'solid black 5px';
redSquare.style.borderRadius = '8px';
document.body.appendChild(redSquare);

// Create the blue square
const blueSquare = document.createElement('div');
blueSquare.style.width = `${blueSize}px`;
blueSquare.style.height = `${blueSize}px`;
blueSquare.style.background = 'blue';
blueSquare.style.position = 'absolute';
blueSquare.style.top = '500px';
blueSquare.style.left = '500px';
blueSquare.style.border = 'solid black 5px';
blueSquare.style.borderRadius = '8px';
document.body.appendChild(blueSquare);

// Initial positions
let rx = 100, ry = 100; // red square
let bx = 500, by = 500; // blue square
const redSpeed = 5;
const blueSpeed = 9;

// Track pressed keys
const keys = {};

// Game timer
let startTime = null;
const gameDuration = 30000; // 30 seconds
let gameOver = false;
let gameStarted = false;

// Key down/up
document.addEventListener('keydown', e => {
  keys[e.key.toLowerCase()] = true;

  // Start the timer on first key press
  if (!gameStarted) {
    startTime = Date.now();
    gameStarted = true;
  }
});
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

  // Update timer only if game started
  if (gameStarted) {
    const elapsed = Date.now() - startTime;
    const remaining = Math.max(0, Math.ceil((gameDuration - elapsed) / 1000));
    timerDisplay.textContent = `Time Left: ${remaining}s`;

    if (checkCollision()) {
      alert("Red wins!");
      gameOver = true;
      return;
    }

    if (elapsed >= gameDuration) {
      alert("Blue wins!");
      gameOver = true;
      return;
    }
  }

  requestAnimationFrame(loop);
};

// Start the loop
requestAnimationFrame(loop);
