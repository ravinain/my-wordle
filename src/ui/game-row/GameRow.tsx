import './GameRow.css';
import { GameCell } from "../game-cell/GameCell";
import { GameRowProps } from '../../types/GameRowType';
import { WORD_SIZE } from '../../Constant';

export const GameRow = (props: GameRowProps): JSX.Element => {
    const {rowData:{cellData, validated}, shake} = props;

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
                [...Array(WORD_SIZE).keys()]
                .map((w, i) => <GameCell data={cellData[w]} validated={validated} column={i} />)
            }
        </div>
    );
}
