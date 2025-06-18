# System Patterns: Browser-based Snake Game (MVP)

## System Architecture
- Modular ES6+ codebase separating game logic, rendering, and input handling
- Central game loop managing state updates and rendering
- Canvas-based rendering for performance and scalability
- Local static server (Python HTTP server) used for development and testing

## Key Technical Decisions
- Use of ES6+ modules for maintainability
- Game state managed as a single object
- Rendering and logic decoupled for clarity
- Serve app with Python HTTP server for simplicity

## Design Patterns in Use
- Observer pattern for input event handling
- State pattern for managing game states (playing, game over)

## Component Relationships
- Game loop interacts with state, rendering, and input modules
- Input module updates direction in game state
- Rendering module draws current state to canvas

## Critical Implementation Paths
- Game loop timing and tick management
- Collision detection and game over flow
- Food spawning and snake growth logic 