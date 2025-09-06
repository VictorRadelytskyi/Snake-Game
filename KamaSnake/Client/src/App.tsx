import React from "react";
import "./app.css"
import StartMenu from "./start-menu/StartMenu";
import SnakeGame from "./game/SnakeGame";
import { useState } from "react";

export default function App() {
    const [isPlaying, setIsPlaying] = useState(false);
    return (
        <div className="app">
            {!isPlaying ?
                <StartMenu onStart={()=>setIsPlaying(true)} /> :
                <SnakeGame onBackToMenu={()=>setIsPlaying(false)}/>
            }

        </div > 
    );
}