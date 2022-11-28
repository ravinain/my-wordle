import './GameRow.css';
import { GameCell } from "../game-cell/GameCell";
import { GameRowProps } from '../../types/GameRowType';
import { WORD_SIZE } from '../../Constant';

export const GameRow = (props: GameRowProps): JSX.Element => {
    const {rowData, shake} = props;

    const getRowClass = (): string => {
        const classes = ["game-row"];

        if (shake) {
            classes.push("invalid");
        }

        return classes.join(" ");
    };

    return (
        <div className={getRowClass()}>
            {
                [...Array(WORD_SIZE).keys()].map(w => <GameCell data={rowData[w]} />)
            }
        </div>
    );
}
