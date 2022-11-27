import './GameCell.css';
import { CellTypeProps } from "../../types/CellType";

export const GameCell = (props: CellTypeProps): JSX.Element => {
    const {data} = props;

    return (
        <div className="game-cell">
            {data.value}
        </div>
    );
};
