import { useEffect, useRef, useState } from "react";
import "./snake-game.css";
import GameOver from './GameOver';
const BOARD_SIZE: number = 20;
const GAME_SPEED_MS: number = 200;

enum SquareType {
    EMPTY,
    SNAKE,
    FOOD
}

type Square = {
    x: number;
    y: number;
    squareType: SquareType;
}

interface BackToMenu{
    onBackToMenu: ()=>void;
}

function generateRandomSquare(squareType: SquareType = SquareType.EMPTY) {
    return {
        x: Math.floor(Math.random() * BOARD_SIZE),
        y: Math.floor(Math.random() * BOARD_SIZE),
        squareType
    }
}

function renderSquare(square: Square) {
    switch (square.squareType) {
        case SquareType.SNAKE:
            return (
                <div className="square square-snake" key={`${square.x}-${square.y}`} >
                    
                </div>
            )

        case SquareType.FOOD:
            return (
                <div className="square square-food" key={`${square.x}-${square.y}` }>
                    <svg viewBox="0 0 20 20" width="16" height="16">
                        {/* Apple body */}
                        <path
                            d="M10 3
                       C12 3, 15 5, 15 9
                       C15 13, 12 17, 10 17
                       C8 17, 5 13, 5 9
                       C5 5, 8 3, 10 3
                       Z"
                            fill="#d32f2f"
                            stroke="#b71c1c"
                            strokeWidth="0.5"
                        />
                        {/* Apple stem */}
                        <rect x="9" y="2" width="2" height="4" fill="#795548" rx="1" />
                        {/* Apple leaf */}
                        <path
                            d="M12 3 Q13 2, 14 4 Q12.5 4, 12 3"
                            fill="#388e3c"
                        />
                    </svg>
                </div>
            )

        case SquareType.EMPTY:
            return (
                <div className="square empty-square" key={`${square.x}-${square.y}`}>
                    
                </div>
            )

        default:
            return (
                <div className="square empty-square" key={`${square.x}-${square.y}`}>
                    
                </div>
            )
    }
}

function renderSquares(squares: Square[]) {
    const renderedSquares = [];
    if (!squares || squares.length === 0) return null;
    for (let square of squares) {
        renderedSquares.push(renderSquare(square));
    }
    return renderedSquares;
}

export default function SnakeGame({onBackToMenu}: BackToMenu) {
    const [snake, setSnake] = useState([generateRandomSquare(SquareType.SNAKE)]);
    const [food, setFood] = useState(generateRandomSquare(SquareType.FOOD));
    const [lastDirection, setLastDirection] = useState('right'); 
    const [nextDirection, setNextDirection] = useState('right');
    const [gameOver, setGameOver] = useState(false);
    const [gameSpeed, setGameSpeed] = useState(GAME_SPEED_MS);

    const nextDirectionRef = useRef(nextDirection);
    useEffect(()=>{
        nextDirectionRef.current = nextDirection;
    }, [nextDirection])

    function moveSnake(direction: string){
        const newSnake = [...snake];
        const oldHead = snake[0];
        let newHead: Square;

        switch(direction){
            case 'up':
                if (oldHead.y !== 0){
                    newHead = { x: oldHead.x, y: oldHead.y - 1, squareType: SquareType.SNAKE };
                } else{
                    newHead = {x: oldHead.x, y: BOARD_SIZE - 1, squareType: SquareType.SNAKE};
                }
                break;
            case 'down':
                if(oldHead.y !== BOARD_SIZE - 1){
                    newHead = ({x: oldHead.x, y: oldHead.y + 1, squareType: SquareType.SNAKE});
                } else{
                    newHead = {x: oldHead.x, y: 0, squareType: SquareType.SNAKE};
                }
                break;
            case 'left':
                if(oldHead.x !== 0){
                    newHead = {x: oldHead.x - 1, y: oldHead.y, squareType: SquareType.SNAKE};
                } else{
                    newHead = {x: BOARD_SIZE - 1, y: oldHead.y, squareType: SquareType.SNAKE};
                }
                break;
            case 'right':
                if(oldHead.x !== BOARD_SIZE - 1){
                    newHead = {x: oldHead.x + 1, y: oldHead.y, squareType: SquareType.SNAKE};
                } else{
                    newHead = {x: 0, y: oldHead.y, squareType: SquareType.SNAKE};
                }
                break;
            default:
                throw Error(`direction: ${direction} is unrecognized, use up | down | left | right as an argument`);
        }
        console.log(`moving snake ${direction}`);

        // check if snake collided with itself 
        if (snake.some(segment=>segment.x === newHead.x && segment.y === newHead.y)){
            console.log(`game over, here is snake array: ${snake}`);
            setGameOver(true);
            return; // Exit early if game over
        } 
        
        // check if snake ate the food
        if(newHead.x === food.x && newHead.y === food.y){
            newSnake.unshift(newHead);
            do {
                var foodSquare = generateRandomSquare(SquareType.FOOD);
            } while(snake.some(segment=>segment.x === foodSquare.x && segment.y === foodSquare.y))
            setFood(foodSquare);
        } else{
            // Normal movement - add head and remove tail
            newSnake.unshift(newHead);
            newSnake.pop();
        }
        
        setSnake(newSnake);

    }

    const createBoard = () => {
        const board: Square[] = [];
        
        for (let y = 0; y < BOARD_SIZE; y++) {
            for (let x = 0; x < BOARD_SIZE; x++) {
                let squareType = SquareType.EMPTY;
                
                if (snake.some(segment=>segment.x === x && segment.y === y)) {
                    squareType = SquareType.SNAKE;
                }
                else if (food.x === x && food.y === y) {
                    squareType = SquareType.FOOD;
                }
                
                board.push({ x, y, squareType });
            }
        }
        
        return board;
    };

    useEffect(()=>{
        if (gameOver) return; // Don't move if game is over
        
        const gameInterval = setInterval(()=>{
            moveSnake(nextDirectionRef.current);
            setLastDirection(nextDirectionRef.current);
        }, gameSpeed);

        return ()=>{
            clearInterval(gameInterval);
        }
    }, [snake, food, lastDirection, gameOver, gameSpeed]) // Added gameSpeed to dependencies

    useEffect(()=>{
        const moveSnakeListener = (event: KeyboardEvent)=>{
            switch(event.key){
                case 'ArrowUp':
                    if (lastDirection !== 'down') setNextDirection('up'); // Prevent reverse
                    break;
                case 'ArrowDown':
                    if (lastDirection !== 'up') setNextDirection('down');
                    break;
                case 'ArrowRight':
                    if (lastDirection !== 'left') setNextDirection('right');
                    break;
                case 'ArrowLeft':
                    if (lastDirection !== 'right') setNextDirection('left');
                    break;
            }
        }

        document.addEventListener('keydown', moveSnakeListener);
        return ()=>{
            document.removeEventListener('keydown', moveSnakeListener);
        }

    }, [lastDirection]) // Include lastDirection so the listener gets updated 

    function playAgain(){
        setFood(generateRandomSquare(SquareType.FOOD));
        setSnake([generateRandomSquare(SquareType.SNAKE)]);
        setLastDirection('right');
        setNextDirection('right');
        setGameSpeed(GAME_SPEED_MS); // Reset speed to default
        setGameOver(false);
    }

    return (
        !gameOver ?
        (
            <div className="game-wrapper">
                <div className="section-header">
                    <h3>I am snake 🐍</h3>
                    <span>I Eat & Grow Longer</span>
                </div>
                <div className="board">
                    {renderSquares(createBoard())} 
                </div>  
                <div className="section-info">
                    <div className="info-item">
                        <input 
                            type="number"
                            value={gameSpeed}
                            onChange={(event)=>{
                                    const target = event.target as HTMLInputElement | null;
                                    if(target && target.value){
                                        setGameSpeed(Number(target.value));
                                    }
                                }
                            }
                        >
                        </input>
                        <span>milliseconds</span>
                    </div>
                </div>
            </div>
        ) :
            (<GameOver 
                onBackToMenu={onBackToMenu}
                playAgain={playAgain}
            />)
    )
}
