import './GameKeyboard.css'
import { KeyboardKey } from "./KeyboardKey";

const KEYBOARD_ROWS = [
    ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"],
    ["A", "S", "D", "F", "G", "H", "J", "K", "L"],
    ["ENTER", "Z", "X", "C", "V", "B", "N", "M", "DEL"]
];

export const GameKeyBoard = (): JSX.Element => {

    const handleOnKeyClick = (value: string): void => {
        console.log("Clicked: ", value);
    };

    const buildKeyboard = (): JSX.Element[] => {
        const elements = KEYBOARD_ROWS.map(row => {
            const rowData = row.map(val => <KeyboardKey value={val} handleOnClick={handleOnKeyClick} />);
            return (
                <div className="keyboard-row">
                    {rowData}
                </div>
            )
        });  

        return elements;

    };

    return (
        <div className="game-keyboard">
            {buildKeyboard()}
        </div>
    );

};
