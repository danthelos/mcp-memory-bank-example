# Active Context: Browser-based Snake Game (MVP)

## Current Work Focus
Added a persistent leaderboard feature. After each game over, the player is always prompted for their name and the score is considered for the leaderboard (top 5, stored in localStorage). The leaderboard is displayed in the UI and updates automatically.

Added pause functionality: the game can be paused and resumed with the space key. The game loop is now fully stopped while paused, so the snake does not move. A pause overlay is shown when paused, and all overlays are accessible.

## Recent Changes
- Implemented leaderboard logic using localStorage
- Added UI for leaderboard and name input overlay
- Leaderboard displays top 5 scores (name + score)
- Player is always prompted for name after game over
- Added pause/resume with space key and accessible pause overlay
- Fixed pause so the game loop is stopped and resumed correctly

## Next Steps
- Test leaderboard and pause functionality across browsers
- Gather feedback on UX and polish as needed

## Active Decisions and Considerations
- Leaderboard is limited to top 5 scores
- Player is always prompted for name after game over
- Data is stored locally in the browser
- Game can be paused/resumed with space key except during overlays

## Important Patterns and Preferences
- Modular ES6+ codebase
- Clear separation of logic, rendering, and input
- UI elements are accessible and keyboard-navigable
- Persistent data via localStorage
- Overlays use ARIA roles and labels for accessibility

## Learnings and Project Insights
- Leaderboard adds replay value and engagement
- Using localStorage is a simple, effective way to persist scores client-side
- Pause functionality improves usability and accessibility
- Always prompting for name after game over improves user experience and clarity
- Stopping the game loop on pause is essential for correct gameplay 