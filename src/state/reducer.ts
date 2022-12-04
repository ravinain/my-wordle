import { Action, ActionType } from "./action";
import { AppStateType, DEFAULT_ENTERED_KEY, initialAppState } from "./state";

export const reducer = (state: AppStateType, action: Action): AppStateType => {

    switch(action.type) {
        case ActionType.PLAY_AGAIN:
            return initialAppState;
        case ActionType.UPDATE_KEY_DATA:
            return {
                ...state,
                keyEventData: action.payload
            };
        case ActionType.RESET_KEY_DATA:
            return {
                ...state,
                keyEventData: DEFAULT_ENTERED_KEY
            };
        case ActionType.UPDATE_INVALID_FLAG:
            return {
                ...state,
                gameBoardData: {
                    ...state.gameBoardData,
                    invalidData: action.payload
                }
            };
        case ActionType.UPDATE_OPEN_STATS_FLAG:
            return {
                ...state,
                openStats: action.payload
            };
        case ActionType.UPDATE_WIN_FLAG:
            return {
                ...state,
                gameBoardData: {
                    ...state.gameBoardData,
                    win: action.payload
                }
            };
        case ActionType.UPDATE_CURRENT_BOARD:
            return {
                ...state,
                gameBoardData: {
                    ...state.gameBoardData,
                    currentBoardData: action.payload
                }
            };
        case ActionType.UPDATE_ACTIVE_GRID_INDEX:
            return {
                ...state,
                gameBoardData: {
                    ...state.gameBoardData,
                    activeGridIndex: action.payload
                }
            };
        case ActionType.UPDATE_INVALID_BOARD_DATA:
            return {
                ...state,
                gameBoardData: {
                    ...state.gameBoardData,
                    invalidData: action.payload.invalidData,
                    currentBoardData: action.payload.currentBoardData
                }
            };
        case ActionType.UPDATE_VALID_BOARD_DATA:
            return {
                ...state,
                gameBoardData: {
                    ...state.gameBoardData,
                    currentBoardData: action.payload.currentBoardData,
                    activeGridIndex: action.payload.activeGridIndex,
                    win: action.payload.win
                },
                openStats: action.payload.openStats,
                keyStates: action.payload.keyStates
            };
        case ActionType.UPDATE_INCOMPLETE_BOARD_DATA:
            return {
                ...state,
                gameBoardData: {
                    ...state.gameBoardData,
                    currentBoardData: action.payload.currentBoardData,
                    activeGridIndex: action.payload.activeGridIndex,
                }
            };
        case ActionType.UPDATE_KEYBOARD_STATE:
            return {
                ...state,
                keyBoardState: action.payload
            };
        case ActionType.UPDATE_KEY_STATES:
            return {
                ...state,
                keyStates: action.payload
            };
        default:
            return state;
    }
}
