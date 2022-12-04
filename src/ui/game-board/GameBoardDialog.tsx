import { DialogAction, DialogProps } from "../../types/DialogType";
import { Dialog } from "../common/dialog/Dialog";
import { IoMdRefresh } from 'react-icons/io';
import { NUMBER_OF_ATTEMPTS } from "../../Constant";
import { GameBoardDialogProps } from "../../types/GameBoardType";
import { useContext } from "react";
import context from "../../state/context";
import { ActionType } from "../../state/action";

export const GameBoardDialog = (props: GameBoardDialogProps): JSX.Element => {

    const { state, dispatch } = useContext(context);
    const { openStats } = state;

    const header = "STATISTICS";
    const { winRow } = props;

    const handleOnPlayAgainClick = (): void => {
        dispatch({type: ActionType.PLAY_AGAIN});
    };

    const handleOnClose = (): void => {
        dispatch({type: ActionType.UPDATE_OPEN_STATS_FLAG, payload: false});
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
                                        <label className={"bar " + (winRow === i ? "highlight" : "" )}>0</label>
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
            open: openStats
        },
        onClose: handleOnClose
    };

    return (
        <Dialog {...dialogProps} />
    );

};
