import './Header.scss';
import { FaCog } from 'react-icons/fa';
import { IoStatsChart } from 'react-icons/io5';
import { useContext } from 'react';
import context from '../../state/context';
import { ActionType } from '../../state/action';

const title = "My Wordle";

export const Header = (): JSX.Element => {

    const { dispatch } = useContext(context);

    const onStatsClick = (event: any): void => {
        dispatch({type: ActionType.UPDATE_OPEN_STATS_FLAG, payload: true});
    };

    const settings = (): JSX.Element => {
        return (
            <FaCog className="settings" />
        );
    };

    const stats = (): JSX.Element => {
        return (
            <IoStatsChart className="stats" onClick={onStatsClick} />
        );
    };

    return (
        <header className="app-header">
            <div className="title">{title}</div>
            <div>{stats()}</div>
            <div>{settings()}</div>
        </header>
    );

}
