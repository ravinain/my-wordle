import { KeyboardKeyProps } from "../../types/KeyboardType";

export const KeyboardKey = (props:KeyboardKeyProps): JSX.Element => {
    const {keyState, handleOnClick} = props;

    const onKeyClick = (event: any): void => {
        handleOnClick(keyState.value);
    };

    const getClasses = (): string => {
        const { state } = keyState;

        if (state.used) {
            if (state.valid) {
                return "valid";
            }

            if (state.partialValid) {
                return "partial-valid";
            }

            return "invalid";
        }

        return "";
    }

    return (
        <div className={"keyboard-key no-select " + getClasses()} onClick={onKeyClick}>
            {keyState.value}
        </div>
    );
}
