import "./game-over.css"

interface BackToMenu{
    onBackToMenu: ()=>void;
    playAgain: ()=>void;
}

export default function GameOver({onBackToMenu, playAgain}: BackToMenu){

    return (
        <div className='game-over'>
            <div className="game-over-header">
                <h3>Oh no, you lost!</h3>
                <h4>Get back to the main menu or play again</h4>
            </div>

            <div className="game-over-sections">
                <div className="game-over-section">
                    <h4>Get back to the main menu</h4>
                    <button
                        className="action-button"
                        onClick={onBackToMenu}
                    >
                        Menu
                    </button>
                </div>

                <div className="game-over-section">
                    <h4>Plain again</h4>
                    <button
                        className="action-button"
                        onClick={playAgain}
                    >
                        Play Again
                    </button>
                </div>
            </div>
        </div>
    )
}