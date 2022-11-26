import './GameBoard.css';
import { GameRow } from "../game-row/GameRow";

const NUMBER_OF_ATTEMPTS = 6;


export const GameBoard = (): JSX.Element => {

    const prepareBoard = (): JSX.Element[] => {
        return [...Array(NUMBER_OF_ATTEMPTS).keys()].map(a => {
            return <GameRow />;
        });
    };

    return (
        <div className="game-board">
            {prepareBoard()}
        </div>
    );

};
