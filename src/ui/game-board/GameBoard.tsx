import './GameBoard.css';
import { GameRow } from "../game-row/GameRow";
import { GameBoardProps } from '../../types/GameBoardType';
import { GameRowProps } from '../../types/GameRowType';

const NUMBER_OF_ATTEMPTS = 6;


export const GameBoard = (props: GameBoardProps): JSX.Element => {
    const {value} = props;

    const prepareBoard = (): JSX.Element[] => {
        const gameRowProps: GameRowProps = {
            currentValue: value.toUpperCase()
        };

        return [...Array(NUMBER_OF_ATTEMPTS).keys()].map(a => {
            return <GameRow {...gameRowProps} />;
        });
    };

    return (
        <div className="game-board">
            {prepareBoard()}
        </div>
    );

};
