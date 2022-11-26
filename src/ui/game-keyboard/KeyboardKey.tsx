import { KeyboardKeyProps } from "../../types/KeyboardType";

export const KeyboardKey = (props:KeyboardKeyProps): JSX.Element => {
    const {value, handleOnClick} = props;

    const onKeyClick = (event: any): void => {
        handleOnClick(value);
    };

    return (
        <div className="keyboard-key" onClick={onKeyClick}>
            {value}
        </div>
    );
}
