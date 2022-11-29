import { GameRowData } from "./GameRowType";

export type GameBoardProps = {
    data: {
        value: string;
        shake?: boolean;
    };
};

export type GameBoardServiceType = {
    getInitialData: () => GameRowData[];
    getStartGridIndex: () => GridIndex;
    isLastRow: (row: number) => boolean;
    isLastColumn: (column: number) => boolean;
    getNextColumnIndex: (column: number) => number;
    getNextRowIndex: (row: number) => number;
    updateBoardData: (currentData: GameRowData[], currentGridIndex:GridIndex, value: string) => GameRowData[];
    updateActiveIndex: (currentActiveIndex: GridIndex, value: string) => GridIndex;
    updateRowData: (currentData: GameRowData[], newRowData: GameRowData, row: number) => GameRowData[];
}

export type GridIndex = {
    row: number;
    column: number;
}

export type ValidationServiceType = {
    validate: (rowData: GameRowData) => boolean;
    shouldValidate: (newValue: string, currentActiveIndex: GridIndex, currentRow: GameRowData) => boolean;
}
