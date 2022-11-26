import './GameRow.css';
import { GameCell } from "../game-cell/GameCell";

const WORD_SIZE = 5;

export const GameRow = (): JSX.Element => {
    return (
        <div className="game-row">
            {
                [...Array(WORD_SIZE).keys()].map(w => <GameCell value="" />)
            }
        </div>
    );
}
