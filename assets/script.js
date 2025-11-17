// Create the red square
const redSquare = document.createElement('div');
redSquare.style.width = '50px';
redSquare.style.height = '50px';
redSquare.style.background = 'red';
redSquare.style.position = 'absolute';
redSquare.style.top = '100px';
redSquare.style.left = '100px';
document.body.appendChild(redSquare);

// Create the blue square
const blueSquare = document.createElement('div');
blueSquare.style.width = '50px';
blueSquare.style.height = '50px';
blueSquare.style.background = 'blue';
blueSquare.style.position = 'absolute';
blueSquare.style.top = '300px';
blueSquare.style.left = '300px';
document.body.appendChild(blueSquare);

// Initial positions
let rx = 100, ry = 100; // red square
let bx = 300, by = 300; // blue square
const speed = 5;

// Track pressed keys
const keys = {};

// Key down
document.addEventListener('keydown', (e) => {
  keys[e.key.toLowerCase()] = true;
});

// Key up
document.addEventListener('keyup', (e) => {
  keys[e.key.toLowerCase()] = false;
});

// Animation loop
const loop = () => {
  // Red square (WASD)
  if (keys["w"]) ry -= speed;
  if (keys["s"]) ry += speed;
  if (keys["a"]) rx -= speed;
  if (keys["d"]) rx += speed;

  rx = Math.max(0, Math.min(window.innerWidth - 50, rx));
  ry = Math.max(0, Math.min(window.innerHeight - 50, ry));
  redSquare.style.left = `${rx}px`;
  redSquare.style.top = `${ry}px`;

  // Blue square (Arrow keys)
  if (keys["arrowup"]) by -= speed;
  if (keys["arrowdown"]) by += speed;
  if (keys["arrowleft"]) bx -= speed;
  if (keys["arrowright"]) bx += speed;

  bx = Math.max(0, Math.min(window.innerWidth - 50, bx));
  by = Math.max(0, Math.min(window.innerHeight - 50, by));
  blueSquare.style.left = `${bx}px`;
  blueSquare.style.top = `${by}px`;

  requestAnimationFrame(loop);
}

// Start the loop
requestAnimationFrame(loop);