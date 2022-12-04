import { StorageKeys } from "../Constant";
import { GameBoardService } from "../service/GameBoardService";
import { GameBoardServiceType, GridIndex } from "../types/GameBoardType";
import { GameRowData } from "../types/GameRowType";
import { KeyEventData, KeyState, RowKeyState } from "../types/KeyboardType"

const boardService: GameBoardServiceType = GameBoardService();

export type GameBoardType = {
    currentBoardData: GameRowData[];
    activeGridIndex: GridIndex;
    invalidData: boolean;
    win: boolean;
};

export type AppStateType = {
    keyEventData: KeyEventData;
    gameBoardData: GameBoardType;
    openStats: boolean;
    keyBoardState: RowKeyState[];
    keyStates: KeyState[];
}

export const getDefaultEnteredKey = () => {
 
    return {
        value: "",
        shake: false
    };
};

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

const getDefaultKeyboardState = (): RowKeyState[] => {
    return KEYBOARD_ROWS.map(row => {
        return row.map(k => {
            return {
                value: k,
                state: DEFAULT_KEY_STATE
            };
        });
    });
};

export const getInitialAppState = (): AppStateType => {
    return {
        keyEventData: getDefaultEnteredKey(),
        gameBoardData: {
            currentBoardData: boardService.getInitialData(),
            activeGridIndex: boardService.getStartGridIndex(),
            invalidData: false,
            win: false
        },
        openStats: false,
        keyBoardState: getDefaultKeyboardState(),
        keyStates: []
    };
};

export const getAppState = (): AppStateType => {
    const savedState = localStorage.getItem(StorageKeys.APP_STATE_KEY);

    if (savedState) {
        return JSON.parse(savedState);
    }

    const appState = getInitialAppState();

    localStorage.setItem(StorageKeys.APP_STATE_KEY, JSON.stringify(appState));

    return appState;
};
