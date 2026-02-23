# Ludo Game - React + Vite + Context API

A modern, responsive implementation of the classic Ludo board game built with React, Vite, and Context API for state management.

## 📋 Overview

This project implements a fully functional Ludo (also known as Pachisi) board game with support for 4 players (Red, Green, Blue, Yellow). The game features a custom-built interactive board, token movement mechanics, capturing rules, and turn-based gameplay.

[https://via.placeholder.com/800x400?text=Ludo+Board+Game](https://via.placeholder.com/800x400?text=Ludo+Board+Game)

## Features

-   Classic 4-Player Ludo: Support for Red, Green, Blue, and Yellow players
    
-   Interactive Game Board: Visually distinct board with colored paths, safe spots, and home areas
    
-   Token Movement: Smooth animations for token movement across the board
    
-   Dice Rolling: Random dice rolling mechanism with visual feedback
    
-   Capture Mechanics: Tokens can capture opponent tokens when landing on occupied cells
    
-   Safe Zones: Protected cells where tokens cannot be captured
    
-   Extra Turn: Rolling a 6 grants an additional turn
    
-   Token Exit: Tokens can only leave home when a 6 is rolled
    
-   Winning Condition: First player to get all 4 tokens to the center wins
    
-   Responsive Design: Playable on desktop and tablet devices
    

## Tech Stack

-   React 18 - UI library
    
-   Vite - Build tool and development server
    
-   Context API - State management
    
-   Tailwind CSS - Styling and responsive design
    
-   React Icons - Icon library for game pieces
    

## Project Structure

text

ludo-game/
├── public/
│   ├── favicon.svg
│   └── manifest.json
├── src/
│   ├── components/
│   │   ├── LudoBoard.jsx        # Main board component
│   │   ├── Square.jsx            # Player home squares with tokens
│   │   ├── Cells.jsx             # Path cells on the board
│   │   ├── Dise.jsx              # Dice component
│   │   └── index.js              # Component exports
│   ├── Context/
│   │   ├── LudoContext.js        # Context definition and reducer
│   │   └── index.js              # Context exports
│   ├── Hooks/
│   │   ├── useMove.js            # Dice rolling and movement logic
│   │   └── useMultuStepsMoving.js # Multi-step token movement
│   ├── lib/
│   │   ├── AutoMove.js           # Automatic movement logic
│   │   ├── CellChecker.js        # Cell occupation checking
│   │   ├── Exterminable.js       # Capture eligibility checking
│   │   ├── KillingHandler.js     # Token capture handling
│   │   ├── MovmentHandler.js     # Main movement controller
│   │   └── MultiStepsHandler.js  # Step-by-step movement
│   ├── style/
│   │   ├── Cells.css
│   │   ├── dise.css
│   │   ├── LudoBoard.css
│   │   └── Square.css
│   ├── Utility/
│   │   └── pathsClasess.json     # Board path definitions
│   ├── App.js                    # Root component
│   ├── main.jsx                  # Entry point
│   └── index.css                  # Global styles with Tailwind
├── .gitignore
├── index.html
├── package.json
├── postcss.config.js
├── tailwind.config.js
├── vite.config.js
└── README.md

## Getting Started

### Prerequisites

-   Node.js (v14 or higher)
    
-   npm or yarn
    

### Installation

1.  Clone the repository:
    

bash

git clone https://github.com/yourusername/ludo-game.git
cd ludo-game

2.  Install dependencies:
    

bash

npm install
\# or
yarn install

3.  Start the development server:
    

bash

npm run dev
\# or
yarn dev

4.  Open [http://localhost:3000](http://localhost:3000/) to view it in the browser.
    

## Game Rules

### Basic Rules

-   Each player has 4 tokens of the same color
    
-   Players take turns rolling the dice
    
-   A token can only leave the home area when a 6 is rolled
    
-   Rolling a 6 gives an extra turn
    
-   Tokens move clockwise around the board according to the dice value
    

### Movement Rules

-   Tokens move along the colored path specific to each player
    
-   Safe spots (star cells) protect tokens from being captured
    
-   Landing on an opponent's token sends it back to its home
    
-   Multiple tokens can occupy the same cell (stacking)
    
-   Tokens must reach the center exactly (no overshooting)
    

### Winning Conditions

-   First player to get all 4 tokens to the center wins
    
-   The game ends when a player achieves this
    

## State Management with Context API

The game uses React Context API for state management with a reducer pattern.

### Game State Structure

javascript

const initState \= {
  playersData: \[\],     // Array of player data (paths, tokens, etc.)
  tokens: \[\],          // Current player's tokens
  path: \[\],            // Current player's path cells
  tokensParents: \[\],   // Token container elements
  tknsInHome: \[\],      // Tokens currently in home
  tknsInCell: null,    // Tokens in the same cell
  color: null,         // Current player's color
  home: null,          // Current player's home element
  diceValue: 0,        // Current dice value (1-6)
  active: 0,           // Active player index (0-3)
  isRolled: false,     // Whether dice has been rolled this turn
  isLoading: true,     // Initial loading state
  isMoving: false      // Whether token movement is in progress
};

### Key Actions

| Action Type | Description |
| --- | --- |
| `INIT` | Initialize game with DOM elements |
| `ROLL_DICE` | Set dice value after rolling |
| `SET_ISROLLED` | Toggle dice rolled state |
| `ACTIVE` | Switch to next player |
| `SET_IN_CELL` | Track tokens sharing a cell |
| `SET_IN_HOME` | Update tokens in home |
| `FINISH` | Mark player as finished |
| `ISMOVING` | Set movement state |

## Key Components

### LudoBoard Component

The main board component that renders the entire game interface:

-   Arranges player squares and path cells in a 3x3 grid
    
-   Extracts game elements from the DOM on initialization
    
-   Manages the center area with colored triangles for each player
    

### Square Component

Represents each player's home area where tokens start:

-   Contains 4 token positions
    
-   Displays the dice for the active player
    
-   Handles token click events for movement
    
-   Visual feedback for movable tokens (animation)
    

### Cells Component

Renders the path cells that tokens move along:

-   18 cells per side (top, bottom, left, right)
    
-   Color-coded based on player ownership
    
-   Special cells (protected/star) with visual indicators
    

### Dise Component

Simple dice display showing the current value:

-   Highlighted for the active player
    
-   Visual feedback when rolled
    

## Game Logic Flow

### Turn Sequence

1.  Active player clicks on their dice
    
2.  `useMove.js` generates random dice value (1-6)
    
3.  Game checks if tokens can move:
    
    -   If all tokens are home and dice = 6: auto-exit one token
        
    -   If all tokens are home and dice < 6: turn ends
        
    -   Otherwise: enable movement for eligible tokens
        
4.  Player clicks on a token to move
    
5.  `useMultuStepsMoving.js` animates token movement step-by-step
    
6.  After movement, check for captures or win condition
    
7.  If dice ≠ 6, switch to next player
    

### Token Movement

javascript

// Multi-step movement with animation
const MultiStepsHandler \= (token, diceValue) \=> {
  // Move token cell by cell with interval
  // Check for captures at destination
  // Handle reaching home (finish)
  // Update game state
};

### Capture Mechanism

When a token lands on a cell containing opponent tokens:

1.  Check if cell is protected (star)
    
2.  If not protected, opponent tokens are sent back home
    
3.  Animation shows tokens retreating step-by-step
    

## Styling

### Tailwind CSS Configuration

The project uses Tailwind CSS with custom extensions:

-   Custom spacing values (320px, 190px, etc.)
    
-   Extended color palette
    
-   Custom animations (slide-in, slide-fwd)
    
-   Responsive breakpoints
    

### CSS Modules

Component-specific styles are defined in CSS files:

-   `Square.css`: Token animations and hover effects
    
-   `Cells.css`: Cell positioning and special cell styling
    
-   `dise.css`: Dice styling and states
    
-   `LudoBoard.css`: Board layout and triangle shapes
    

### Board Geometry

The board uses CSS clip-path to create triangular home areas:

css

.triangle.red {
  clip-path: polygon(0% 0%, 50% 50%, 0% 100%);
}
.triangle.green {
  clip-path: polygon(100% 0%, 50% 50%, 0% 0%);
}
/\* etc. \*/

## Key Dependencies

json

{
  "react": "^18.2.0",
  "react-dom": "^18.2.0",
  "react-icons": "^5.5.0",
  "tailwind-scrollbar-hide": "^2.0.0",
  "@vitejs/plugin-react": "^5.1.1",
  "tailwindcss": "^3.4.17",
  "vite": "^7.2.2"
}

## Configuration Files

### Vite Configuration

javascript

// vite.config.js
export default defineConfig({
  plugins: \[react()\],
  esbuild: {
    loader: 'jsx',
    include: /src\\/.\*\\.jsx?$/,
  },
  server: {
    port: 3000,
    open: true
  }
});

### Tailwind Configuration

Extended with custom values for game board dimensions:

-   Custom widths (300px, 340px, 508px, etc.)
    
-   Custom heights (340px, 420px, 510px, etc.)
    
-   Animation keyframes for token movement
    

## Game Path Definition

The board paths are defined in `pathsClasess.json` with 56 cells per player:

json

\[
  {
    "color": "red",
    "path": \[
      "red-1", "red-2", ..., "red-11"
    \]
  },
  // Other players...
\]

Each cell is identified by color-index combination (e.g., "red-1", "green-15").

## Game States

| State | Description |
| --- | --- |
| `isLoading` | Initial board setup in progress |
| `isRolled` | Dice has been rolled this turn |
| `isMoving` | Token animation in progress |
| `active` | Current player index |
| `diceValue` | Last rolled dice value |

##  Testing

While not currently implemented, the project structure supports adding tests:

bash

\# Run tests (when implemented)
npm run test
\# or
yarn test

## Responsive Design

The game board adapts to different screen sizes:

-   Desktop: Full board with comfortable token sizes
    
-   Tablet: Scaled down board with maintained proportions
    
-   Mobile: Touch-friendly token controls (future enhancement)
    

## Deployment

Build for production:

bash

npm run build
\# or
yarn build

Preview production build:

bash

npm run preview
\# or
yarn preview

### Deploy to Netlify/Vercel

The project is configured for easy deployment with zero configuration.

## Contributing

1.  Fork the repository
    
2.  Create your feature branch (`git checkout -b feature/AmazingFeature`)
    
3.  Commit your changes (`git commit -m 'Add some AmazingFeature'`)
    
4.  Push to the branch (`git push origin feature/AmazingFeature`)
    
5.  Open a Pull Request
    

### Development Guidelines

-   Follow existing code style
    
-   Test movement logic thoroughly
    
-   Ensure responsive design works
    
-   Document new features
    

## Future Enhancements

-   AI opponents for single-player mode
    
-   Sound effects for dice rolling and token movement
    
-   Online multiplayer with WebSockets
    
-   Game history and replay feature
    
-   Customizable board themes
    
-   Mobile touch optimization
    
-   Tournament mode with multiple games
    
.

## Acknowledgments

-   Classic Ludo game for inspiration
    
-   React community for excellent tools
    
-   Tailwind CSS for utility-first styling
    



Made with ❤️ using React + Vite + Tailwind CSS