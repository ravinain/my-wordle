import { StorageKeys } from "../Constant";
import { Action, ActionType } from "./action";
import { AppStateType, getDefaultEnteredKey, getInitialAppState } from "./state";

export const reducer = (state: AppStateType, action: Action): AppStateType => {
    let newState = state;

    switch(action.type) {
        case ActionType.PLAY_AGAIN:
            newState = {
                ...getInitialAppState(),
                stats: state.stats
            };
            break;
        case ActionType.UPDATE_KEY_DATA:
            newState = {
                ...state,
                keyEventData: action.payload
            };
            break;
        case ActionType.RESET_KEY_DATA:
            newState = {
                ...state,
                keyEventData: getDefaultEnteredKey()
            };
            break;
        case ActionType.UPDATE_INVALID_FLAG:
            newState = {
                ...state,
                gameBoardData: {
                    ...state.gameBoardData,
                    invalidData: action.payload
                }
            };
            break;
        case ActionType.UPDATE_OPEN_STATS_FLAG:
            newState = {
                ...state,
                openStats: action.payload
            };
            break;
        case ActionType.UPDATE_WIN_FLAG:
            newState = {
                ...state,
                gameBoardData: {
                    ...state.gameBoardData,
                    win: action.payload
                }
            };
            break;
        case ActionType.UPDATE_CURRENT_BOARD:
            newState = {
                ...state,
                gameBoardData: {
                    ...state.gameBoardData,
                    currentBoardData: action.payload
                }
            };
            break;
        case ActionType.UPDATE_ACTIVE_GRID_INDEX:
            newState = {
                ...state,
                gameBoardData: {
                    ...state.gameBoardData,
                    activeGridIndex: action.payload
                }
            };
            break;
        case ActionType.UPDATE_INVALID_BOARD_DATA:
            newState = {
                ...state,
                gameBoardData: {
                    ...state.gameBoardData,
                    invalidData: action.payload.invalidData,
                    currentBoardData: action.payload.currentBoardData
                }
            };
            break;
        case ActionType.UPDATE_VALID_BOARD_DATA:
            newState = {
                ...state,
                gameBoardData: {
                    ...state.gameBoardData,
                    currentBoardData: action.payload.currentBoardData,
                    activeGridIndex: action.payload.activeGridIndex,
                    win: action.payload.win
                },
                openStats: action.payload.openStats,
                keyStates: action.payload.keyStates,
                stats: {
                    ...action.payload.stats
                },
                gameOver: action.payload.gameOver
            };
            
            break;
        case ActionType.UPDATE_INCOMPLETE_BOARD_DATA:
            newState = {
                ...state,
                gameBoardData: {
                    ...state.gameBoardData,
                    currentBoardData: action.payload.currentBoardData,
                    activeGridIndex: action.payload.activeGridIndex,
                }
            };
            break;
        case ActionType.UPDATE_KEYBOARD_STATE:
            newState = {
                ...state,
                keyBoardState: action.payload
            };
            break;
        case ActionType.UPDATE_KEY_STATES:
            newState = {
                ...state,
                keyStates: action.payload
            };
            break;
        case ActionType.UPDATE_MODE:
            newState = {
                ...getInitialAppState(),
                mode: action.payload,
                openSettings: true,
                stats: state.stats
            };
            break;
        case ActionType.OPEN_SETTINGS:
            newState = {
                ...state,
                openSettings: true
            };
            break;
        case ActionType.CLOSE_SETTINGS:
            newState = {
                ...state,
                openSettings: false
            };
            break;
    }

    localStorage.setItem(StorageKeys.APP_STATE_KEY, JSON.stringify(newState));
    return newState;
}
