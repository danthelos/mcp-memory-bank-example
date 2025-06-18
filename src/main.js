// main.js
import { createInitialState, setDirection, updateState, resetState, getTickInterval } from './game.js';
import { render, updateScore, showGameOver, hideGameOver } from './renderer.js';
import { setupInput } from './input.js';

const canvas = document.getElementById('game-canvas');
const ctx = canvas.getContext('2d');
const restartBtn = document.getElementById('restart-btn');
const difficultySelect = document.getElementById('difficulty');
const leaderboardList = document.getElementById('leaderboard-list');
const nameOverlay = document.getElementById('name-overlay');
const playerNameInput = document.getElementById('player-name');
const submitNameBtn = document.getElementById('submit-name-btn');

let state = createInitialState();
let intervalId = null;
let difficulty = difficultySelect.value;

const LEADERBOARD_KEY = 'snake_leaderboard';
const LEADERBOARD_SIZE = 5;

function getLeaderboard() {
  return JSON.parse(localStorage.getItem(LEADERBOARD_KEY) || '[]');
}

function saveLeaderboard(lb) {
  localStorage.setItem(LEADERBOARD_KEY, JSON.stringify(lb));
}

function updateLeaderboardUI() {
  const lb = getLeaderboard();
  leaderboardList.innerHTML = '';
  lb.forEach(entry => {
    const li = document.createElement('li');
    li.innerHTML = `<span>${entry.name}</span><span>${entry.score}</span>`;
    leaderboardList.appendChild(li);
  });
}

function maybeAddToLeaderboard(score, callback) {
  const lb = getLeaderboard();
  if (lb.length < LEADERBOARD_SIZE || score > lb[lb.length - 1].score) {
    // Qualifies for leaderboard
    nameOverlay.hidden = false;
    playerNameInput.value = '';
    playerNameInput.focus();
    submitNameBtn.onclick = () => {
      const name = playerNameInput.value.trim() || 'Anonymous';
      lb.push({ name, score });
      lb.sort((a, b) => b.score - a.score);
      if (lb.length > LEADERBOARD_SIZE) lb.length = LEADERBOARD_SIZE;
      saveLeaderboard(lb);
      nameOverlay.hidden = true;
      updateLeaderboardUI();
      if (callback) callback();
    };
  } else {
    if (callback) callback();
  }
}

function gameTick() {
  updateState(state);
  render(state, ctx, canvas);
  updateScore(state.score);
  if (state.gameOver) {
    clearInterval(intervalId);
    showGameOver(state.score);
    canvas.blur();
    restartBtn.focus();
    maybeAddToLeaderboard(state.score);
  }
}

function startGame() {
  hideGameOver();
  resetState(state);
  render(state, ctx, canvas);
  updateScore(state.score);
  if (intervalId) clearInterval(intervalId);
  intervalId = setInterval(gameTick, getTickInterval(difficulty));
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

difficultySelect.addEventListener('change', (e) => {
  difficulty = e.target.value;
  startGame();
});

// Start the game on load
window.addEventListener('DOMContentLoaded', () => {
  startGame();
  updateLeaderboardUI();
}); 