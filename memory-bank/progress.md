# Progress: Browser-based Snake Game (MVP)

## What Works
- App runs and is accessible at http://localhost:5173
- All MVP features implemented (game loop, input, collision, scoring, restart)
- Difficulty levels (easy, medium, hard) implemented and tested
- UI and accessibility features in place
- Application works in Chrome, Brave, and Edge browsers
- App tested on different screen sizes – works fine
- All interactive elements are keyboard-accessible

## What's Left to Build
- Further user testing and browser compatibility checks (Safari)
- Bug fixes and polish

## Known Issues and Limitations
- favicon.ico 404 (non-critical)
- Further testing needed for edge cases and accessibility

## Evolution of Project Decisions
- Adopted Python HTTP server for local development
- Maintained focus on modular, accessible MVP
- Added difficulty levels for replay value and accessibility

## Deployment Instructions (GitHub Pages)

1. Commit all your changes to your repository.
2. In your project root, move or copy all files from the `src/` directory to the root (or configure GitHub Pages to use `/src` as the source).
3. Push your changes to GitHub.
4. On GitHub, go to your repository settings > Pages.
5. Under "Source", select the branch (usually `main`) and set the folder to `/ (root)` or `/src` if you want to serve from the `src` directory.
6. Save. Your site will be available at `https://<your-username>.github.io/<repo-name>/`.
7. Update your README and documentation with the live link. 