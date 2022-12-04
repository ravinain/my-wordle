import { DialogAction, DialogProps } from "../../types/DialogType";
import { Dialog } from "../common/dialog/Dialog";
import { IoMdRefresh } from 'react-icons/io';
import { GameBoardDialogProps, ValidationServiceType } from "../../types/GameBoardType";
import { useContext } from "react";
import context from "../../state/context";
import { ActionType } from "../../state/action";
import { ValidationService } from "../../service/ValidationService";

const validationService: ValidationServiceType = ValidationService();

export const GameBoardDialog = (props: GameBoardDialogProps): JSX.Element => {

    const { state, dispatch } = useContext(context);
    const { openStats, stats, gameOver, gameBoardData:{win} } = state;
    const { distribution } = stats;

    const header = "STATISTICS";

    const handleOnPlayAgainClick = (): void => {
        dispatch({type: ActionType.PLAY_AGAIN});
    };

    const handleOnClose = (): void => {
        dispatch({type: ActionType.UPDATE_OPEN_STATS_FLAG, payload: false});
    };

    const getContent = (): JSX.Element => {
        return (
            <>
                <div className="word">
                    {gameOver && !win ? validationService.getValidWord() : null}
                </div>
                <div className="stats">
                    <div className="data">
                        <div className="count">{stats.total}</div>
                        <div className="label">Played</div>
                    </div>
                    <div className="data">
                        <div className="count">{stats.total > 0 ? ((stats.win/stats.total) * 100).toFixed(0) : 0}</div>
                        <div className="label">Win %</div>
                    </div>
                    <div className="data">
                        <div className="count">{stats.currentStreak}</div>
                        <div className="label">Current Streak</div>
                    </div>
                    <div className="data">
                        <div className="count">{stats.maxStreak}</div>
                        <div className="label">Max Streak</div>
                    </div>
                </div>
                <div className="guess-distribution">
                    <div>GUESS DISTRIBUTION</div>
                    <div className="distribution">
                        {
                            distribution.map((data, index) => {
                                return (
                                    <div className="row">
                                        <label>{ index + 1 }</label>
                                        <label className={"bar " + (stats.lastWinAttempt === index ? "highlight" : "" )}>{data}</label>
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
