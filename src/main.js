// main.js
// Entry point and UI logic for Snake Game (MVP)
import { createInitialState, setDirection, updateState, resetState, getTickInterval, togglePause } from './game.js';
import { render, updateScore, showGameOver, hideGameOver } from './renderer.js';
import { setupInput } from './input.js';

// --- DOM Elements ---
const canvas = document.getElementById('game-canvas');
const ctx = canvas.getContext('2d');
const restartBtn = document.getElementById('restart-btn');
const difficultySelect = document.getElementById('difficulty');
const leaderboardList = document.getElementById('leaderboard-list');
const nameOverlay = document.getElementById('name-overlay');
const playerNameInput = document.getElementById('player-name');
const submitNameBtn = document.getElementById('submit-name-btn');

// --- State ---
let state = createInitialState();
let intervalId = null;
let difficulty = difficultySelect.value;

// --- Leaderboard Constants ---
const LEADERBOARD_KEY = 'snake_leaderboard';
const LEADERBOARD_SIZE = 5;

// --- Pause Overlay ---
const pauseOverlay = document.createElement('div');
pauseOverlay.id = 'pause-overlay';
pauseOverlay.setAttribute('role', 'dialog');
pauseOverlay.setAttribute('aria-modal', 'true');
pauseOverlay.setAttribute('aria-label', 'Game Paused');
pauseOverlay.hidden = true;
pauseOverlay.innerHTML = '<h2>Paused</h2><p>Press Space to resume</p>';
document.body.appendChild(pauseOverlay);

// --- Leaderboard Logic ---
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

// Prompt for name after every game over, update leaderboard if score qualifies
function maybeAddToLeaderboard(score, callback) {
  nameOverlay.hidden = false;
  playerNameInput.value = '';
  playerNameInput.focus();
  submitNameBtn.onclick = () => {
    const name = playerNameInput.value.trim() || 'Anonymous';
    const lb = getLeaderboard();
    lb.push({ name, score });
    lb.sort((a, b) => b.score - a.score);
    if (lb.length > LEADERBOARD_SIZE) lb.length = LEADERBOARD_SIZE;
    if (lb.some(entry => entry.name === name && entry.score === score)) {
      saveLeaderboard(lb);
    }
    nameOverlay.hidden = true;
    updateLeaderboardUI();
    if (callback) callback();
  };
}

// --- Overlay Helpers ---
function showPauseOverlay() { pauseOverlay.hidden = false; }
function hidePauseOverlay() { pauseOverlay.hidden = true; }

// --- Game Loop Control ---
function setGameInterval() {
  if (intervalId) clearInterval(intervalId);
  intervalId = setInterval(gameTick, getTickInterval(difficulty));
}
function pauseGame() {
  if (intervalId) clearInterval(intervalId);
  showPauseOverlay();
}
function resumeGame() {
  setGameInterval();
  hidePauseOverlay();
}

// --- Main Game Loop ---
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
    hidePauseOverlay();
  }
}

// --- Game Start/Restart ---
function startGame() {
  hideGameOver();
  resetState(state);
  render(state, ctx, canvas);
  updateScore(state.score);
  setGameInterval();
  canvas.focus();
  hidePauseOverlay();
}

// --- Input Setup ---
setupInput((key) => {
  setDirection(state, key);
});

// --- Event Handlers ---
restartBtn.addEventListener('click', startGame);
restartBtn.addEventListener('keydown', (e) => {
  if (e.key === 'Enter' || e.key === ' ') {
    startGame();
  }
});
difficultySelect.addEventListener('change', (e) => {
  difficulty = e.target.value;
  startGame();
});

// Pause/resume with space key (except when name overlay is open)
window.addEventListener('keydown', (e) => {
  if (e.key === ' ' && !nameOverlay.hidden) return;
  if (e.key === ' ') {
    togglePause(state);
    if (state.paused) {
      pauseGame();
    } else {
      resumeGame();
    }
  }
});

// --- Initialization ---
window.addEventListener('DOMContentLoaded', () => {
  startGame();
  updateLeaderboardUI();
}); 