import './GameCell.css';
import { CellTypeProps } from "../../types/CellType";

export const GameCell = (props: CellTypeProps): JSX.Element => {
    const {value} = props;

    return (
        <div className="game-cell">
            {value}
        </div>
    );
};
