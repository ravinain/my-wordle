import './Header.scss';
import { FaCog } from 'react-icons/fa';
import { IoStatsChart } from 'react-icons/io5';

const title = "My Wordle";

export const Header = (): JSX.Element => {

    const settings = (): JSX.Element => {
        return (
            <FaCog className="settings" />
        );
    };

    const stats = (): JSX.Element => {
        return (
            <IoStatsChart className="stats" />
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
