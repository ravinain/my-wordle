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
            return [...Array(WORD_SIZE).keys()]
            .map(w => Object.assign({}, DEFAULT_CELL_DATA));
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
        let currentCellValueEmpty = currentData[row][column].value === "";

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
        newData[row][column].value = newValue;

        return newData;
    };

    const updateActiveIndex = (currentActiveIndex: GridIndex, value: string): GridIndex => {
        let {row, column} = currentActiveIndex;
        let newValue = value.toUpperCase();

        switch(newValue) {
            case BACKSPACE:
                column = getPreviousColumnIndex(column);
                break;
            case ENTER:
                if (isLastColumn(column) && !isLastRow(row)) {
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
        updateActiveIndex
    }

};
