import './GameBoard.css';
import { GameRow } from "../game-row/GameRow";
import { GameBoardProps, GameBoardServiceType, ValidationServiceType } from '../../types/GameBoardType';
import { NUMBER_OF_ATTEMPTS } from '../../Constant';
import { GameBoardService } from '../../service/GameBoardService';
import { useState, useEffect } from 'react';
import { useDeepCompareCallback } from "use-deep-compare";
import { ValidationService } from '../../service/ValidationService';


const boardService: GameBoardServiceType = GameBoardService();
const validationService: ValidationServiceType = ValidationService();

export const GameBoard = (props: GameBoardProps): JSX.Element => {
    const {data} = props;
    const [currentBoardData, setCurrentBoardData] = useState(boardService.getInitialData());
    const [activeGridIndex, setActiveGridIndex] = useState(boardService.getStartGridIndex());
    const {row} = activeGridIndex;
    const [invalidData, setInvalidData] = useState(false);

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
        if (value) {
            validateAndUpdate(value.toUpperCase());
        }
        
    }, [data]);

    return (
        <div className="game-board">
            {prepareBoard()}
        </div>
    );

};
