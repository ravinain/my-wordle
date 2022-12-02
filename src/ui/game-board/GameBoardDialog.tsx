import { DialogAction, DialogProps } from "../../types/DialogType";
import { Dialog } from "../common/dialog/Dialog";
import { IoMdRefresh } from 'react-icons/io';
import { NUMBER_OF_ATTEMPTS } from "../../Constant";
import { useEffect, useState } from "react";
import { GameBoardDialogProps } from "../../types/GameBoardType";

export const GameBoardDialog = (props: GameBoardDialogProps): JSX.Element => {

    const header = "STATISTICS";
    const { open, onClose } = props;
    const handleOnPlayAgainClick = (): void => {
        onClose();
    };

    const handleOnClose = (): void => {
        onClose();
    };

    const getContent = (): JSX.Element => {
        return (
            <>
                <div className="stats">
                    <div className="data">
                        <div className="count">2</div>
                        <div className="label">Played</div>
                    </div>
                    <div className="data">
                        <div className="count">50</div>
                        <div className="label">Win %</div>
                    </div>
                    <div className="data">
                        <div className="count">1</div>
                        <div className="label">Current Streak</div>
                    </div>
                    <div className="data">
                        <div className="count">1</div>
                        <div className="label">Max Streak</div>
                    </div>
                </div>
                <div className="guess-distribution">
                    <div>GUESS DISTRIBUTION</div>
                    <div className="distribution">
                        {
                            [...new Array(NUMBER_OF_ATTEMPTS).keys()].map(i => {
                                return (
                                    <div className="row">
                                        <label>{i+1}</label>
                                        <label className="bar">0</label>
                                    </div>
                                );
                            })
                        }
                    </div>
                </div>
            </>
        );
    };

    const actions: DialogAction[] = [{
        label: "Play Again",
        handleOnClick: handleOnPlayAgainClick,
        kind: "primary",
        icon: <IoMdRefresh />
    }, {
        label: "Close",
        handleOnClick: handleOnClose,
        kind: "secondary"
    }];

    const dialogProps: DialogProps = {
        header,
        content: getContent(),
        actions,
        state: {
            open
        }
    };

    return (
        <Dialog {...dialogProps} />
    );

};
