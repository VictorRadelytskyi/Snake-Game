import React from "react"
import "./start-menu.css"

interface StartMenuProps {
    onStart: () => void;
}

export default function StartMenu({ onStart }: StartMenuProps) {
    return (
        <div className="start-menu-cont">
            <div className="game-title-cont">  
                <h2 className="game-title">KamaSnake 🐍</h2>
            </div>
            <button onClick={onStart} className="start-button" >
                START
            </button>
        </div>
    );
}