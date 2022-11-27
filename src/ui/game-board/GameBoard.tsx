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
    const {value} = props;
    const [currentBoardData, setCurrentBoardData] = useState(boardService.getInitialData());
    const [activeGridIndex, setActiveGridIndex] = useState(boardService.getStartGridIndex());
    const [shake, setShake] = useState(false);

    const prepareBoard = useDeepCompareCallback((): JSX.Element[] => {
        return [...Array(NUMBER_OF_ATTEMPTS).keys()].map(a => {
            const shakeRow = shake && a === activeGridIndex.row;
            return <GameRow rowData={currentBoardData[a]} shake={shakeRow} />;
        });
    }, [currentBoardData, shake]);

    const validateAndUpdate = (): void => {
        const newValue = value.toUpperCase();
        const currentRow = currentBoardData[activeGridIndex.row];
        if (validationService.shouldValidate(newValue, activeGridIndex, currentRow)) {
            if (validationService.validate(currentRow)) {
                setActiveGridIndex(boardService.updateActiveIndex(activeGridIndex, newValue));
            } else {
                setCurrentBoardData(currentBoardData);
                setShake(true);
            }
        } else {
            setCurrentBoardData(boardService.updateBoardData(currentBoardData, activeGridIndex, newValue));
            setActiveGridIndex(boardService.updateActiveIndex(activeGridIndex, newValue));
        }
    };

    useEffect(() => {
        setShake(false);

        if (value) {
            validateAndUpdate();
        }
        
    }, [value]);

    return (
        <div className="game-board">
            {prepareBoard()}
        </div>
    );

};
