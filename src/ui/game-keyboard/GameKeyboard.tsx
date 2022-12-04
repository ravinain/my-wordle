import './GameKeyboard.scss'
import { useContext, useEffect } from 'react';
import { GameKeyboardService } from '../../service/GameKeyboardService';
import { ActionType } from '../../state/action';
import context from '../../state/context';
import { GameKeyBoardProps } from '../../types/KeyboardType';
import { KeyboardKey } from "./KeyboardKey";

const kbService = GameKeyboardService();

export const GameKeyBoard = (props: GameKeyBoardProps): JSX.Element => {
    const { state, dispatch } = useContext(context);

    const { handleOnClick, keyStates } = props;
    const { keyBoardState } = state;

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
            dispatch({type: ActionType.UPDATE_KEYBOARD_STATE, payload: kbService.updateKeyboardState(keyBoardState, keyStates)});
        }
    }, [keyStates]);

    return (
        <div className="game-keyboard">
            {buildKeyboard()}
        </div>
    );

};
