import "./Dialog.scss";
import { DialogProps } from "../../../types/DialogType";


export const Dialog = (props: DialogProps): JSX.Element => {
    const { content, state: {open}, onClose } = props;

    const getFooter = (): JSX.Element => {
        
        if (props.actions) {
            const actions = props.actions.map(a => {
                return <button className={a.kind} onClick={a.handleOnClick}>
                    {a.label}{a.icon}
                </button>
            });

            return (
                <div>
                    {actions}
                </div>
            );
        }

        return <></>;

    };

    if (!open) {
        return <></>;
    }

    return (
        <dialog open className="dialog">
            <div className="container">
                <header>
                    <button className="close-btn" onClick={onClose}>X</button>
                    <div className="title">{props.header}</div>
                </header>
                <section>
                    {content}
                </section>
                <footer>
                    {getFooter()}
                </footer>
            </div>
        </dialog>
    );

};
