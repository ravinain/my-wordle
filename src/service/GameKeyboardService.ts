import { GameKeyboardServiceType } from "../types/GameBoardType";
import { KeyState, RowKeyState } from "../types/KeyboardType";

export const GameKeyboardService = (): GameKeyboardServiceType => {

    const updateKeyboardState = (keyboardState: RowKeyState[], 
        keyStates: KeyState[]): RowKeyState[] => {
        keyboardState.forEach(row => row.forEach(k => {
            keyStates.forEach(keyState => {
                if (k.value === keyState.value) {
                    k.state = keyState.state;
                };
            });
        }));

        return [...keyboardState];
    };

    return {
        updateKeyboardState
    };

}