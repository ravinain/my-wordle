import './GameCell.scss';
import { CellTypeProps } from "../../types/CellType";

export const GameCell = (props: CellTypeProps): JSX.Element => {
    const {data, validated, column} = props;

    const getCellClass = ():string => {
        const classes = ["game-cell"];

        if (validated) {
            classes.push("flip");
            classes.push("animation-delay" + (column+1));
        }

        if (data.valid) {
            classes.push("valid");
        } else if (data.partialValid) {
            classes.push("partial-valid");
        }

        return classes.join(" ");
    }

    return (
        <div className={getCellClass()}>
            {data.value}
        </div>
    );
};
