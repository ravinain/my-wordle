import './GameBoard.scss';
import { GameRow } from "../game-row/GameRow";
import { GameBoardProps, GameBoardServiceType, ValidationServiceType } from '../../types/GameBoardType';
import { NUMBER_OF_ATTEMPTS } from '../../Constant';
import { GameBoardService } from '../../service/GameBoardService';
import { useState, useEffect } from 'react';
import { useDeepCompareCallback } from "use-deep-compare";
import { ValidationService } from '../../service/ValidationService';
import { GameBoardDialog } from './GameBoardDialog';


const boardService: GameBoardServiceType = GameBoardService();
const validationService: ValidationServiceType = ValidationService();

export const GameBoard = (props: GameBoardProps): JSX.Element => {
    const {data, onRowChange} = props;
    const [currentBoardData, setCurrentBoardData] = useState(boardService.getInitialData());
    const [activeGridIndex, setActiveGridIndex] = useState(boardService.getStartGridIndex());
    const {row} = activeGridIndex;
    const [invalidData, setInvalidData] = useState(false);
    const [openStats, setOpenStats] = useState(false);
    const [win, setWin] = useState(false);

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
                setOpenStats(currentRow.win);
                setWin(currentRow.win);
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

                onRowChange(newKeyStates);

                setCurrentBoardData(boardService.updateRowData(currentBoardData, currentRow, row));
                setActiveGridIndex(boardService.updateActiveIndex(activeGridIndex, newValue));
            } else {
                setCurrentBoardData(currentBoardData);
                setInvalidData(true);
            }
        } else {
            setCurrentBoardData(boardService.updateBoardData(currentBoardData, activeGridIndex, newValue));
            setActiveGridIndex(boardService.updateActiveIndex(activeGridIndex, newValue));
        }
    };

    useEffect(() => {
        const {value} = data;

        setInvalidData(false);
        if (value && !win) {
            validateAndUpdate(value.toUpperCase());
        }
        
    }, [data]);

    const onStatsDialogClose = (): void => {
        setOpenStats(false);
    };

    return (
        <div className="game-board">
            {prepareBoard()}
            <GameBoardDialog open={openStats} onClose={onStatsDialogClose} winRow={activeGridIndex.row} />
        </div>
    );

};
