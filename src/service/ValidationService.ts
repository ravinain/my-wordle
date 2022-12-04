import { ENTER } from "../Constant";
import { GridIndex, ValidationServiceType } from "../types/GameBoardType";
import { GameRowData } from "../types/GameRowType";
import { GameBoardService } from "./GameBoardService";

const VALID_VALUES = ["SCAPE", "THEIR", "PLACE", "MIGHT", "MONTH", "PLANT", "NIGHT"];
const VALID_WORD = ["T", "H", "E", "I", "R"];

const boardService = GameBoardService();

export const ValidationService = (): ValidationServiceType => {

    const validate = (rowData: GameRowData): boolean => {
        const { cellData } = rowData;
        const inputWord = cellData.map(rd => rd.value).join("");
        console.log("Input word: ", inputWord);

        if (VALID_VALUES.findIndex(w => w === inputWord) === -1) {
            return false;
        }

        let win = true;

        cellData.forEach((rd, index) => {
            if (VALID_WORD[index] === rd.value) {
                rd.valid = true;
            } else if (VALID_WORD.indexOf(rd.value) !== -1) {
                rd.partialValid = true;
            }

            win = win && rd.valid && !rd.partialValid;
        });

        rowData.validated = true;
        rowData.win = win;

        return true;
    }

    const shouldValidate = (newValue: string, currentActiveIndex: GridIndex, 
        currentRow: GameRowData): boolean => {

            const {column} = currentActiveIndex;

        return newValue === ENTER && 
            boardService.isLastColumn(column) && 
            currentRow.cellData[column].value !== "";

    }

    const getValidWord = (): string => {
        return ["T", "H", "E", "I", "R"].join("");
    }


    return {
        validate,
        shouldValidate,
        getValidWord
    };

};