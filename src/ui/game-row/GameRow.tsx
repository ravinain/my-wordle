import './GameRow.css';
import { GameCell } from "../game-cell/GameCell";
import { GameRowProps } from '../../types/GameRowType';

const WORD_SIZE = 5;

export const GameRow = (props: GameRowProps): JSX.Element => {
    const {currentValue} = props;

    return (
        <div className="game-row">
            {
                [...Array(WORD_SIZE).keys()].map(w => <GameCell value={currentValue} />)
            }
        </div>
    );
}
