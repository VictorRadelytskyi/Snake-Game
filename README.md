# 🐍 KamaSnake

> **⚠️ Work in Progress** - This project is currently under active development

A modern Snake game built with ASP.NET Core backend and React TypeScript frontend.

## 🚧 Current Status

**✅ Frontend Game (Completed)**
- ✅ Full Snake game implementation with React + TypeScript
- ✅ Smooth movement controls (arrow keys)
- ✅ Food consumption and snake growth
- ✅ Collision detection and game over logic
- ✅ Speed control (adjustable game speed)
- ✅ Modern, responsive UI design
- ✅ Score tracking and game statistics

**🔄 Backend Integration (In Progress)**
- 🔄 ASP.NET Core Web API (.NET 7.0)
- 🔄 High score persistence
- 🔄 Player statistics
- 🔄 Game session tracking
- ⏳ Leaderboard functionality (planned)
- ⏳ Multiplayer features (planned)

## 🎮 Features

### Current Game Features
- **Classic Snake Gameplay**: Navigate the snake to eat food and grow longer
- **Boundary Wrapping**: Snake wraps around screen edges
- **Real-time Statistics**: Live display of length, score, and speed
- **Speed Control**: Adjustable game speed (50ms - 1000ms)
- **Modern UI**: Beautiful gradients, animations, and responsive design
- **Game Over Handling**: Play again or return to menu

### Planned Features
- 🔄 **High Score System**: Save and display top scores
- 🔄 **Player Profiles**: Track individual player statistics
- ⏳ **Online Leaderboards**: Compete with other players
- ⏳ **Different Game Modes**: Classic, timed, survival modes
- ⏳ **Achievements System**: Unlock achievements for various milestones

## 🏗️ Tech Stack

### Frontend
- **React 19** with TypeScript
- **CSS3** with modern styling (gradients, animations)
- **Responsive Design** for mobile and desktop

### Backend
- **ASP.NET Core 7.0** Web API

## 🚀 Getting Started

### Prerequisites
- **Node.js** (v16+ recommended)
- **.NET 7.0 SDK**
- **Visual Studio 2022** or **VS Code**

### Running the Application

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd KamaSnake
   ```

2. **Install frontend dependencies**
   ```bash
   cd KamaSnake/Client
   npm install
   ```

3. **Run the application**
   ```bash
   # From the root directory
   dotnet run
   ```

4. **Open your browser**
   - Navigate to `https://localhost:5001` or the port shown in your terminal
   - The React frontend should load automatically

### Development Mode

For development with hot reload:

```bash
# Terminal 1: Run the backend
dotnet run

# Terminal 2: Run the frontend separately (if needed)
cd KamaSnake/Client
npm start
```

## 🎯 How to Play

1. **Start the Game**: Click the "START" button from the main menu
2. **Control the Snake**: Use arrow keys (↑ ↓ ← →) to move
3. **Eat Food**: Navigate to the red apple to grow longer
4. **Avoid Collision**: Don't hit the snake's own body
5. **Adjust Speed**: Use the speed control to make the game easier or harder
6. **Game Over**: When you collide, choose to play again or return to menu

## 📁 Project Structure

```
KamaSnake/
├── Controllers/           # ASP.NET Core API controllers
├── KamaSnake/Client/     # React TypeScript frontend
│   ├── src/
│   │   ├── game/         # Snake game components
│   │   └── start-menu/   # Menu components
├── Pages/                # Razor pages (if any)
├── Properties/           # Launch settings
├── appsettings.json      # Configuration
└── Program.cs            # Application entry point
```

## 🤝 Contributing

This project is currently in early development. Contributions, suggestions, and feedback are welcome!

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

---

**🎮 Enjoy playing KamaSnake!**

*Built with ❤️ using ASP.NET Core and React*
