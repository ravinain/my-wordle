import { ENTER } from "../Constant";
import { EASY_WORDS } from "../data/Words";
import { GridIndex, ValidationServiceType } from "../types/GameBoardType";
import { GameRowData } from "../types/GameRowType";
import { GameBoardService } from "./GameBoardService";

const boardService = GameBoardService();

export const ValidationService = (): ValidationServiceType => {

    const validate = (rowData: GameRowData, validWord: string): boolean => {
        const validWordLetters = validWord.split("");
        const { cellData } = rowData;
        const inputWord = cellData.map(rd => rd.value).join("");

        if (getValidValues().findIndex(w => w === inputWord) === -1) {
            return false;
        }

        let win = true;

        cellData.forEach((rd, index) => {
            if (validWordLetters[index] === rd.value) {
                rd.valid = true;
            } else if (validWordLetters.indexOf(rd.value) !== -1) {
                rd.partialValid = true;
            }

            win = win && rd.valid && !rd.partialValid;
        });

        rowData.validated = true;
        rowData.win = win;

        return true;
    };

    const shouldValidate = (newValue: string, currentActiveIndex: GridIndex, 
        currentRow: GameRowData): boolean => {

            const {column} = currentActiveIndex;

        return newValue === ENTER && 
            boardService.isLastColumn(column) && 
            currentRow.cellData[column].value !== "";

    };

    const getValidWord = (): string => {
        return EASY_WORDS[Math.floor(Math.random()*EASY_WORDS.length)];
    };

    const getValidValues = (): string[] => {
        return EASY_WORDS;
    };

    return {
        validate,
        shouldValidate,
        getValidWord
    };

};