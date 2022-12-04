import './GameBoard.scss';
import { GameRow } from "../game-row/GameRow";
import { GameBoardProps, GameBoardServiceType, ValidationServiceType } from '../../types/GameBoardType';
import { NUMBER_OF_ATTEMPTS } from '../../Constant';
import { GameBoardService } from '../../service/GameBoardService';
import { useEffect, useContext } from 'react';
import { useDeepCompareCallback } from "use-deep-compare";
import { ValidationService } from '../../service/ValidationService';
import { GameBoardDialog } from './GameBoardDialog';
import context from '../../state/context';
import { ActionType } from '../../state/action';


const boardService: GameBoardServiceType = GameBoardService();
const validationService: ValidationServiceType = ValidationService();

export const GameBoard = (): JSX.Element => {
    const { state, dispatch } = useContext(context);
    const { keyEventData, gameBoardData:{invalidData, win, currentBoardData, activeGridIndex} } = state;
    const {row} = activeGridIndex;

    const prepareBoard = useDeepCompareCallback((): JSX.Element[] => {
        return [...Array(NUMBER_OF_ATTEMPTS).keys()].map(a => {
            const shakeRow = invalidData &&
            a === row && 
            !currentBoardData[a].validated;
            return <GameRow rowData={currentBoardData[a]} shake={shakeRow} />;
        });
    }, [currentBoardData, invalidData]);

    const validateAndUpdate = (newValue: string): void => {
        const currentRow = currentBoardData[row];
        if (validationService.shouldValidate(newValue, activeGridIndex, currentRow)) {
            if (validationService.validate(currentRow)) {
                const newKeyStates = currentRow.cellData.map(cd => {
                    return {
                        value: cd.value,
                        state: {
                            used: true,
                            valid: cd.valid || false,
                            partialValid: cd.partialValid || false
                        }
                    };
                });

                dispatch({
                    type: ActionType.UPDATE_VALID_BOARD_DATA,
                    payload: {
                        openStats: currentRow.win,
                        win: currentRow.win,
                        activeGridIndex: boardService.updateActiveIndex(activeGridIndex, newValue),
                        currentBoardData: boardService.updateRowData(currentBoardData, currentRow, row),
                        keyStates: newKeyStates
                    }
                });
            } else {
                dispatch({type: ActionType.UPDATE_INVALID_BOARD_DATA, payload: {
                    currentBoardData,
                    invalidData: true
                }});
            }
        } else {
            dispatch({type: ActionType.UPDATE_INCOMPLETE_BOARD_DATA,
                payload: {
                    currentBoardData: boardService.updateBoardData(currentBoardData, activeGridIndex, newValue),
                    activeGridIndex: boardService.updateActiveIndex(activeGridIndex, newValue)
                }
            });
        }
    };

    useEffect(() => {
        const {value} = keyEventData;

        dispatch({type: ActionType.UPDATE_INVALID_FLAG, payload: false});
        if (value && !win) {
            validateAndUpdate(value.toUpperCase());
        }
        
    }, [keyEventData]);

    const onStatsDialogClose = (): void => {
        dispatch({type: ActionType.UPDATE_OPEN_STATS_FLAG, payload: false});
    };

    return (
        <div className="game-board">
            {prepareBoard()}
            <GameBoardDialog onClose={onStatsDialogClose} winRow={activeGridIndex.row} />
        </div>
    );

};
