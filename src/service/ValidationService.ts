import { ENTER } from "../Constant";
import { GridIndex, ValidationServiceType } from "../types/GameBoardType";
import { GameRowData } from "../types/GameRowType";
import { GameBoardService } from "./GameBoardService";

const VALID_VALUES = ["SCAPE", "THEIR", "PLACE", "MIGHT", "MONTH", "PLANT", "NIGHT"];
const VALID_WORD = ["T", "H", "E", "I", "R"];

const boardService = GameBoardService();

export const ValidationService = (): ValidationServiceType => {

    const validate = (rowData: GameRowData): boolean => {
        const inputWord = rowData.map(rd => rd.value).join("");
        console.log("Input word: ", inputWord);

        if (VALID_VALUES.findIndex(w => w === inputWord) === -1) {
            return false;
        }

        rowData.forEach((rd, index) => {
            if (VALID_WORD[index] === rd.value) {
                rd.valid = true;
            } else if (VALID_WORD.indexOf(rd.value) !== -1) {
                rd.partialValid = true;
            }
        });

        return true;
    }

    const shouldValidate = (newValue: string, currentActiveIndex: GridIndex, 
        currentRow: GameRowData): boolean => {

            const {column} = currentActiveIndex;

        return newValue === ENTER && 
            boardService.isLastColumn(column) && 
            currentRow[column].value !== "";

    }


    return {
        validate,
        shouldValidate
    };

};