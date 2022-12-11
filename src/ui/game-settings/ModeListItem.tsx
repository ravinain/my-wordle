import { ModeListProps } from "../../types/GameSettingsType";

export const ModeListItem = (props: ModeListProps): JSX.Element => {

    const {value, label, selectedValue, handleOnChange} = props;

    const onItemClick = (): void => {
        handleOnChange({value, label});
    };
    
    const isSelected = (): boolean => {
        return value === selectedValue;
    };

    const getClasses = (): string => {
        const classes = ["no-select"];

        if (isSelected()) {
            classes.push("selected");
        }

        return classes.join(" ");
    }

    return (
        <li key={value} className={getClasses()} onClick={onItemClick}>{label.toLowerCase()}</li>
    );

};