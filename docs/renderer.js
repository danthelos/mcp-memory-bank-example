// renderer.js
// Handles rendering the Snake Game state to the canvas and UI

import { GRID_SIZE } from './game.js';

export function render(state, ctx, canvas) {
  // Clear
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  const cellSize = canvas.width / GRID_SIZE;

  // Draw food
  ctx.fillStyle = '#e53935';
  ctx.fillRect(
    state.food.x * cellSize,
    state.food.y * cellSize,
    cellSize, cellSize
  );

  // Draw snake
  ctx.fillStyle = '#4caf50';
  state.snake.forEach((seg, i) => {
    ctx.fillRect(
      seg.x * cellSize,
      seg.y * cellSize,
      cellSize, cellSize
    );
  });
}

export function updateScore(score) {
  document.getElementById('score').textContent = score;
}

export function showGameOver(score) {
  document.getElementById('final-score').textContent = score;
  document.getElementById('game-over-overlay').hidden = false;
}

export function hideGameOver() {
  document.getElementById('game-over-overlay').hidden = true;
} 