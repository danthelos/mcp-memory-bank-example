# Active Context: Browser-based Snake Game (MVP)

## Current Work Focus
Added a persistent leaderboard feature. After each game over, if the score qualifies for the top 5, the player is prompted for their name and the score is saved in browser localStorage. The leaderboard is displayed in the UI and updates automatically.

## Recent Changes
- Implemented leaderboard logic using localStorage
- Added UI for leaderboard and name input overlay
- Leaderboard displays top 5 scores (name + score)

## Next Steps
- Test leaderboard functionality across browsers
- Gather feedback on UX and polish as needed

## Active Decisions and Considerations
- Leaderboard is limited to top 5 scores
- Player is prompted for name only if score qualifies
- Data is stored locally in the browser

## Important Patterns and Preferences
- Modular ES6+ codebase
- Clear separation of logic, rendering, and input
- UI elements are accessible and keyboard-navigable
- Persistent data via localStorage

## Learnings and Project Insights
- Leaderboard adds replay value and engagement
- Using localStorage is a simple, effective way to persist scores client-side 