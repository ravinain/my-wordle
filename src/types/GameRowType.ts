import { CellData } from "./CellType";

export type GameRowProps = {
    rowData: GameRowData;
    shake?: boolean;
};

export type GameRowData = {
    cellData: CellData[];
    validated?: boolean;
    win: boolean;
};