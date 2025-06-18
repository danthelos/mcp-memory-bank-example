# Snake Game (MVP)

A minimal, fully playable Snake game for modern browsers. This project delivers the essential features for a classic Snake experience, with a focus on accessibility, responsiveness, and cross-browser compatibility.

## How to Play
- Use the **Arrow keys** or **WASD** to control the snake's direction.
- The snake cannot reverse direction 180° (e.g., left → right).
- Eat food to grow the snake and increase your score.
- The game ends if the snake hits a wall or itself.
- After game over, enter your name to record your score on the leaderboard.
- Press the **Restart** button to play again.
- Use the **Difficulty** selector to change the snake's speed (easy, medium, hard).
- Press the **Space** key to pause or resume the game at any time.

## Features
- 20×20 grid with a snake of length 3 starting at the center
- Food spawns at random empty cells
- Real-time score display
- Game loop updates every 150 ms (medium difficulty by default)
- Responsive canvas that scales to fit your device
- Accessible UI: all controls are keyboard-navigable and ARIA-labeled
- Leaderboard: top 5 scores are saved in your browser
- Works in Chrome, Firefox, Edge, Brave, and Safari

## Browser Compatibility
This game is tested and works in the latest versions of Chrome, Firefox, Edge, Brave, and Safari. It is responsive and works on different screen sizes.

## Technical Details & Documentation
For developers and advanced users, detailed technical documentation and project context can be found in the `memory-bank/` directory. This includes:
- Project requirements and goals
- System architecture and design patterns
- Technical context and dependencies
- Progress tracking and decision history

Refer to the files in `memory-bank/` for in-depth information about the codebase, architecture, and development process.

## License
This project is open source. See the LICENSE file for details. 