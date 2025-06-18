// input.js
// Handles keyboard input for Snake Game

const VALID_KEYS = [
  'ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight',
  'w', 'a', 's', 'd'
];

export function setupInput(onDirection) {
  window.addEventListener('keydown', (e) => {
    if (VALID_KEYS.includes(e.key)) {
      onDirection(e.key);
      e.preventDefault();
    }
  });
} 