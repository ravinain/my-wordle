import './GameSettings.scss';
import { DialogProps } from "../../types/DialogType";
import { Dialog } from "../common/dialog/Dialog";
import { useContext } from 'react';
import context from '../../state/context';
import { ModeListChange, ModeType } from '../../types/GameSettingsType';
import { ModeListItem } from './ModeListItem';
import { ActionType } from '../../state/action';
import uuid from 'react-uuid';

const modes = [ModeType.EASY, ModeType.MEDIUM, ModeType.DIFFICULT];

export const GameSettings = (): JSX.Element => {

    const {state:{openSettings, mode}, dispatch} = useContext(context);

    const onModeChange = (change: ModeListChange): void => {
        dispatch({type: ActionType.UPDATE_MODE, payload: change.value});
    };

    const getContent = (): JSX.Element => {
        return (
            <>
                <div className="mode">
                    <label>Mode</label>
                    <ul>
                        {
                            modes.map(m => <ModeListItem key={m}
                                value={m} label={m} 
                                handleOnChange={onModeChange} 
                                selectedValue={mode} />)
                        }
                    </ul>
                </div>
            </>
        );
    };

    const handleOnClose = (): void => {
        dispatch({type: ActionType.CLOSE_SETTINGS});
    };

    const dialogProps: DialogProps = {
        content: getContent(),
        state: {
            open: openSettings
        },
        dialogSize: "small",
        onClose: handleOnClose
    };

    return (
        <Dialog key={uuid()} {...dialogProps} />
    );

};