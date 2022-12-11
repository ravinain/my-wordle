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

    const getContainerClasses = (): string => {
        const classes = ["container"];

        if (props.dialogSize) {
            classes.push(props.dialogSize);
        }

        return classes.join(" ");
    };

    return (
        <dialog open className="dialog">
            <div className={getContainerClasses()}>
                <header>
                    <button className="close-btn no-select" onClick={onClose}>X</button>
                    <div className="title no-select">{props.header}</div>
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
