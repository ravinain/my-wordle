import { IconType } from "react-icons/lib";

export type ActionKind = "primary" | "danger" | "secondary" | "custom";
export type DialogSize = "small";

export type DialogState = {
    open: boolean;
};

export type DialogAction = {
    label: string;
    handleOnClick: () => void;
    kind: ActionKind;
    icon?: JSX.Element;
};

export type DialogProps = {
    header?: string;
    content: JSX.Element;
    actions?: DialogAction[];
    state: DialogState;
    dialogSize?: DialogSize;
    onClose: () => void;
};