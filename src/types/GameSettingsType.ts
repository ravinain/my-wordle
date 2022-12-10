export enum ModeType {
    EASY = "EASY",
    MEDIUM = "MEDIUM",
    DIFFICULT = "DIFFICULT"
};

export type ModeListChange = {
    value: ModeType; 
    label: string;
};

export type ModeListProps = {
    label: string;
    value: ModeType;
    handleOnChange: (change: ModeListChange) => void;
    selectedValue: ModeType;
};