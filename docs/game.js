// game.js
// Core game logic for Snake Game (MVP)

export const GRID_SIZE = 20;

// Direction vectors for movement
const DIRECTIONS = {
  ArrowUp: { x: 0, y: -1 },
  ArrowDown: { x: 0, y: 1 },
  ArrowLeft: { x: -1, y: 0 },
  ArrowRight: { x: 1, y: 0 },
  w: { x: 0, y: -1 },
  s: { x: 0, y: 1 },
  a: { x: -1, y: 0 },
  d: { x: 1, y: 0 },
};

// Returns the initial snake (length 3, centered)
function getInitialSnake() {
  const mid = Math.floor(GRID_SIZE / 2);
  return [
    { x: mid, y: mid },
    { x: mid - 1, y: mid },
    { x: mid - 2, y: mid },
  ];
}

// Returns a random empty cell not occupied by the snake
function randomEmptyCell(snake) {
  let empty = [];
  for (let y = 0; y < GRID_SIZE; y++) {
    for (let x = 0; x < GRID_SIZE; x++) {
      if (!snake.some(seg => seg.x === x && seg.y === y)) {
        empty.push({ x, y });
      }
    }
  }
  return empty[Math.floor(Math.random() * empty.length)];
}

// Creates the initial game state
export function createInitialState() {
  const snake = getInitialSnake();
  return {
    snake,
    direction: { x: 1, y: 0 },
    nextDirection: { x: 1, y: 0 },
    food: randomEmptyCell(snake),
    score: 0,
    gameOver: false,
    paused: false,
  };
}

// Sets the next direction if valid (no 180° reversal)
export function setDirection(state, dirKey) {
  if (!(dirKey in DIRECTIONS)) return;
  const newDir = DIRECTIONS[dirKey];
  if (
    state.direction.x + newDir.x === 0 &&
    state.direction.y + newDir.y === 0
  ) {
    return;
  }
  state.nextDirection = newDir;
}

// Advances the game state by one tick
export function updateState(state) {
  if (state.gameOver || state.paused) return;
  // Move snake
  const newDir = state.nextDirection;
  const newHead = {
    x: state.snake[0].x + newDir.x,
    y: state.snake[0].y + newDir.y,
  };
  // Wall collision
  if (
    newHead.x < 0 || newHead.x >= GRID_SIZE ||
    newHead.y < 0 || newHead.y >= GRID_SIZE
  ) {
    state.gameOver = true;
    return;
  }
  // Self collision
  if (state.snake.some(seg => seg.x === newHead.x && seg.y === newHead.y)) {
    state.gameOver = true;
    return;
  }
  // Move snake
  state.snake.unshift(newHead);
  // Food eaten
  if (newHead.x === state.food.x && newHead.y === state.food.y) {
    state.score++;
    state.food = randomEmptyCell(state.snake);
  } else {
    state.snake.pop();
  }
  state.direction = newDir;
}

// Resets the state object to a new game
export function resetState(state) {
  const newState = createInitialState();
  Object.assign(state, newState);
}

// Returns the tick interval (ms) for a given difficulty
export function getTickInterval(difficulty) {
  switch (difficulty) {
    case 'easy': return 250;
    case 'hard': return 80;
    case 'medium':
    default: return 150;
  }
}

// Toggles the paused state (if not game over)
export function togglePause(state) {
  if (!state.gameOver) {
    state.paused = !state.paused;
  }
} 