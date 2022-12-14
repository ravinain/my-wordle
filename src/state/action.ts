import { GridIndex } from "../types/GameBoardType";
import { GameRowData } from "../types/GameRowType";
import { ModeType } from "../types/GameSettingsType";
import { KeyEventData, KeyState, RowKeyState } from "../types/KeyboardType";
import { StatsType } from "../types/Stats";

export enum ActionType {
    PLAY_AGAIN = "PLAY_AGAIN",
    UPDATE_KEY_DATA = "UPDATE_KEY_DATA",
    RESET_KEY_DATA = "RESET_KEY_DATA",

    UPDATE_INVALID_FLAG = "UPDATE_INVALID_FLAG",
    UPDATE_OPEN_STATS_FLAG = "UPDATE_OPEN_STATS",
    UPDATE_WIN_FLAG = "UPDATE_WIN_FLAG",
    UPDATE_CURRENT_BOARD = "UPDATE_CURRENT_BOARD",
    UPDATE_ACTIVE_GRID_INDEX = "UPDATE_ACTIVE_GRID_INDEX",
    UPDATE_INVALID_BOARD_DATA = "UPDATE_INVALID_BOARD_DATA",
    UPDATE_VALID_BOARD_DATA = "UPDATE_VALID_BOARD_DATA",
    UPDATE_INCOMPLETE_BOARD_DATA = "UPDATE_INCOMPLETE_BOARD_DATA",

    UPDATE_KEYBOARD_STATE = "UPDATE_KEYBOARD_STATE",
    UPDATE_KEY_STATES = "UPDATE_KEY_STATES",

    UPDATE_MODE = "UPDATE_MODE",
    CLOSE_SETTINGS = "CLOSE_SETTINGS",
    OPEN_SETTINGS = "OPEN_SETTINGS"
}

type KeyEventActionType = ActionType.UPDATE_KEY_DATA | ActionType.RESET_KEY_DATA;

export type KeyEventAction = {
    type: KeyEventActionType,
    payload: KeyEventData
}

type BooleanActionType = ActionType.UPDATE_INVALID_FLAG | 
    ActionType.UPDATE_OPEN_STATS_FLAG | 
    ActionType.UPDATE_WIN_FLAG;

export type BooleanAction = {
    type: BooleanActionType;
    payload: boolean;
};

type GridRowDataActionType = ActionType.UPDATE_CURRENT_BOARD;

export type GridRowDataAction = {
    type: GridRowDataActionType;
    payload: GameRowData[];
};

type ValidGridRowDataActionType = ActionType.UPDATE_VALID_BOARD_DATA;

export type ValidGridRowDataAction = {
    type: ValidGridRowDataActionType;
    payload: {
        openStats: boolean;
        win: boolean;
        currentBoardData: GameRowData[];
        activeGridIndex: GridIndex;
        keyStates: KeyState[];
        stats: StatsType;
        gameOver: boolean;
    };
};

type InvalidGridRowDataActionType = ActionType.UPDATE_INVALID_BOARD_DATA;

export type InvalidGridRowDataAction = {
    type: InvalidGridRowDataActionType;
    payload: {
        invalidData: boolean;
        currentBoardData: GameRowData[];
    };
};

type IncompleteBoardDataActionType = ActionType.UPDATE_INCOMPLETE_BOARD_DATA;

export type IncompleteBoardDataAction = {
    type: IncompleteBoardDataActionType;
    payload: {
        currentBoardData: GameRowData[];
        activeGridIndex: GridIndex;
    };
};

type GridIndexActionType = ActionType.UPDATE_ACTIVE_GRID_INDEX;

export type GridIndexAction = {
    type: GridIndexActionType;
    payload: GridIndex;
};

type KeyboardStateActionType = ActionType.UPDATE_KEYBOARD_STATE;

export type KeyboardStateAction = {
    type: KeyboardStateActionType;
    payload: RowKeyState[];
};

type NoPayloadType = ActionType.PLAY_AGAIN | ActionType.RESET_KEY_DATA | 
    ActionType.CLOSE_SETTINGS | ActionType.OPEN_SETTINGS;

export type NoPayloadAction = {
    type: NoPayloadType;
};

type KeyStatesType = ActionType.UPDATE_KEY_STATES;

export type KeyStatesAction = {
    type: KeyStatesType;
    payload: KeyState[];
};

type GameModeType = ActionType.UPDATE_MODE;

export type ModeAction = {
    type: GameModeType;
    payload: ModeType;
};

export type Action = KeyEventAction | BooleanAction | GridRowDataAction | 
    GridIndexAction | InvalidGridRowDataAction | ValidGridRowDataAction |
    IncompleteBoardDataAction | KeyboardStateAction | NoPayloadAction |
    KeyStatesAction | ModeAction;