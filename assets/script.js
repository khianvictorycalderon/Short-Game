// Create the square
const square = document.createElement('div');
square.style.width = '50px';
square.style.height = '50px';
square.style.background = 'red';
square.style.position = 'absolute';
square.style.top = '100px';
square.style.left = '100px';
document.body.appendChild(square);

// Initial position
let x = 100;
let y = 100;
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
  if (keys["w"]) y -= speed;
  if (keys["s"]) y += speed;
  if (keys["a"]) x -= speed;
  if (keys["d"]) x += speed;

  x = Math.max(0, Math.min(window.innerWidth - 50, x));
  y = Math.max(0, Math.min(window.innerHeight - 50, y));

  square.style.left = `${x}px`;
  square.style.top = `${y}px`;

  // Repeats the loop
  requestAnimationFrame(loop);
}

// Starts the loop
requestAnimationFrame(loop);