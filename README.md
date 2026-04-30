# 🍎 Poly Apple - Frontend

This is the client-side repository for **Poly Apple** - an educational and highly competitive game where players use their math skills (writing polynomial equations) to draw graphs and eat apples on the screen as fast as possible.

## 🛠 Tech Stack & Versions

- **Core:** Vanilla JavaScript (ES6+), HTML5 Canvas, CSS3. (No UI frameworks used to ensure maximum game rendering performance).
- **Bundler:** Vite (`^5.0.0`) - Provides lightning-fast local development and Hot Module Replacement (HMR).
- **Real-time Engine:** Socket.io-client (`^4.8.1`).

## 🚀 How to Run (Local Development)

1. Open a terminal in the `frontend/` directory.
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```
4. Open your browser and navigate to the provided URL (usually `http://localhost:5173`). 
*(Note: You must also have the Backend server running to play the game).*

## 📂 File Structure

```text
frontend/
├── index.html       # The main entry point containing the UI layout (Lobby, Game Screen, Summary).
├── style.css        # Custom CSS styling with a bouncy, glassmorphism game UI aesthetic.
├── script.js        # The core of the frontend. Handles game logic, Canvas rendering, and Socket events.
├── package.json     # Manages frontend dependencies (Vite, socket.io-client).
└── README.md        # The documentation file you are currently reading.
```

## ⚙️ Core Functionality

- **UI Rendering (DOM Manipulation):** Uses Vanilla JS to toggle screens (`lobbyScreen`, `gameScreen`, `summaryScreen`) based on the current game state.
- **Canvas Graphing (`gameCanvas`):** The coordinate system is drawn manually. When a user inputs an equation (e.g., `x^2 + 2x`), the frontend parses this string and calculates Y coordinates based on X to draw a continuous curve.
- **Collision Detection:** Constantly checks the coordinates of the mathematical curve against the coordinates of the apples. If an intersection occurs, it emits an `updateGameState` event to the server.
- **Real-time Syncing:** Listens to server events (`playerJoined`, `gameStart`, `gameStateUpdated`) to instantly synchronize eaten apples and opponent trajectories on the screen.
