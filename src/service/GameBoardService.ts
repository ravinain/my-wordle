import { BACKSPACE, ENTER, NUMBER_OF_ATTEMPTS, WORD_SIZE } from "../Constant";
import { CellData } from "../types/CellType";
import { GameBoardServiceType, GridIndex } from "../types/GameBoardType";
import { GameRowData } from "../types/GameRowType";

const DEFAULT_CELL_DATA: CellData = {
    value: "",
    valid: false,
    partialValid: false
};

const DEFAULT_GRID_INDEX: GridIndex = {
    row: 0,
    column: 0
};

export const GameBoardService = (): GameBoardServiceType => {

    const getInitialData = ():GameRowData[] => {
        return [...Array(NUMBER_OF_ATTEMPTS).keys()].map(a => {
            return {
                cellData: [...Array(WORD_SIZE).keys()].map(w => Object.assign({}, DEFAULT_CELL_DATA)),
                validated: false,
                win: false
            }
        });
    };

    const getStartGridIndex = (): GridIndex => {
        return DEFAULT_GRID_INDEX;
    };

    const getNextColumnIndex = (column: number): number => {
        if (isLastColumn(column)) {
            return column;
        }

        return column + 1;
    };

    const getNextRowIndex = (row: number): number => {
        if (isLastRow(row)) {
            return row;
        }

        return row + 1;
    };

    const getPreviousColumnIndex = (column: number): number => {
        if (isFirstColumn(column)) {
            return column;
        }

        return column - 1;
    };

    const isLastRow = (row: number): boolean => {
        return row + 1 === NUMBER_OF_ATTEMPTS;
    }

    const isLastColumn = (column: number): boolean => {
        return column + 1 === WORD_SIZE;
    }

    const isFirstColumn = (column: number): boolean => {
        return column === 0;
    }

    const updateBoardData = (currentData: GameRowData[], currentGridIndex:GridIndex, value: string): GameRowData[] => {
        let newValue = value.toUpperCase();
        let {row, column} = currentGridIndex;
        let currentCellValueEmpty = currentData[row].cellData[column].value === "";

        if (newValue === ENTER) {
            return currentData;
        }

        if (newValue === BACKSPACE) {
            newValue = "";
            if (currentCellValueEmpty) {
                column = getPreviousColumnIndex(column);
            }
        }

        
        const newData = [...currentData];
        newData[row].cellData[column].value = newValue;

        return newData;
    };

    const updateRowData = (currentData: GameRowData[], newRowData: GameRowData, row: number): GameRowData[] => {
        const newData = [...currentData];

        newData[row] = newRowData;

        return newData;
    };

    const hasData = (currentData: GameRowData[], row: number, column: number): boolean => {
        return !!currentData[row].cellData[column].value;
    }

    const updateActiveIndex = (currentActiveIndex: GridIndex, value: string, currentData: GameRowData[]): GridIndex => {
        let {row, column} = currentActiveIndex;
        let newValue = value.toUpperCase();

        switch(newValue) {
            case BACKSPACE:
                const prevColumn = getPreviousColumnIndex(column);
                if (!hasData(currentData, row, prevColumn)) {
                    column = prevColumn;
                }

                break;
            case ENTER:
                if (isLastColumn(column) && hasData(currentData, row, column) && !isLastRow(row)) {
                    row = getNextRowIndex(row);
                    column = 0;
                }
                break;
            default:
                column = getNextColumnIndex(column);
        }

        return {
            row,
            column
        };
    };

    return {
        getInitialData,
        getStartGridIndex,
        isLastRow,
        isLastColumn,
        getNextColumnIndex,
        getNextRowIndex,
        updateBoardData,
        updateActiveIndex,
        updateRowData
    }

};
