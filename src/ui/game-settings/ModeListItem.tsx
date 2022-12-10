import { ModeListProps } from "../../types/GameSettingsType";

export const ModeListItem = (props: ModeListProps): JSX.Element => {

    const {value, label, selectedValue, handleOnChange} = props;

    const onItemClick = (): void => {
        handleOnChange({value, label});
    };
    
    const isSelected = (): boolean => {
        return value === selectedValue;
    };

    return (
        <li key={value} className={isSelected() ? "selected" : ""} onClick={onItemClick}>{label.toLowerCase()}</li>
    );

};