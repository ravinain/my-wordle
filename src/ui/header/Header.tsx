import './Header.css';

const title = "My Wordle";

export const Header = (): JSX.Element => {

    const settings = (): JSX.Element => {
        return (
            <></>
        );
    };

    const stats = (): JSX.Element => {
        return (
            <></>
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
