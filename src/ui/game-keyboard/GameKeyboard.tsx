import { useEffect, useState } from 'react';
import { GameKeyboardService } from '../../service/GameKeyboardService';
import { GameKeyBoardProps, RowKeyState } from '../../types/KeyboardType';
import './GameKeyboard.scss'
import { KeyboardKey } from "./KeyboardKey";

const KEYBOARD_ROWS = [
    ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"],
    ["A", "S", "D", "F", "G", "H", "J", "K", "L"],
    ["ENTER", "Z", "X", "C", "V", "B", "N", "M", "DEL"]
];

const DEFAULT_KEY_STATE = {
    valid: false,
    used: false,
    partialValid: false
};

const DEFAULT_KEYBOARD_STATE: RowKeyState[] = KEYBOARD_ROWS.map(row => {
    return row.map(k => {
        return {
            value: k,
            state: DEFAULT_KEY_STATE
        };
    });
});

const kbService = GameKeyboardService();

export const GameKeyBoard = (props: GameKeyBoardProps): JSX.Element => {
    const { handleOnClick, keyStates } = props;
    const [keyBoardState, setKeyBoardState] = useState(DEFAULT_KEYBOARD_STATE);

    const handleOnKeyClick = (value: string): void => {
        handleOnClick(value);
    };

    const buildKeyboard = (): JSX.Element[] => {
        const elements = keyBoardState.map(row => {
            const rowData = row.map(val => <KeyboardKey keyState={val} handleOnClick={handleOnKeyClick} />);
            return (
                <div className="keyboard-row">
                    {rowData}
                </div>
            )
        });  

        return elements;
    };

    useEffect(() => {
        if (keyStates) {
            setKeyBoardState(kbService.updateKeyboardState(keyBoardState, keyStates));
        }
    }, [keyStates]);

    return (
        <div className="game-keyboard">
            {buildKeyboard()}
        </div>
    );

};
