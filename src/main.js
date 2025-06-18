// main.js
import { createInitialState, setDirection, updateState, resetState, TICK_INTERVAL } from './game.js';
import { render, updateScore, showGameOver, hideGameOver } from './renderer.js';
import { setupInput } from './input.js';

const canvas = document.getElementById('game-canvas');
const ctx = canvas.getContext('2d');
const restartBtn = document.getElementById('restart-btn');

let state = createInitialState();
let intervalId = null;

function gameTick() {
  updateState(state);
  render(state, ctx, canvas);
  updateScore(state.score);
  if (state.gameOver) {
    clearInterval(intervalId);
    showGameOver(state.score);
    canvas.blur();
    restartBtn.focus();
  }
}

function startGame() {
  hideGameOver();
  resetState(state);
  render(state, ctx, canvas);
  updateScore(state.score);
  if (intervalId) clearInterval(intervalId);
  intervalId = setInterval(gameTick, TICK_INTERVAL);
  canvas.focus();
}

setupInput((key) => {
  setDirection(state, key);
});

restartBtn.addEventListener('click', startGame);

// Accessibility: allow Enter/Space to trigger restart
restartBtn.addEventListener('keydown', (e) => {
  if (e.key === 'Enter' || e.key === ' ') {
    startGame();
  }
});

// Start the game on load
window.addEventListener('DOMContentLoaded', () => {
  startGame();
}); 