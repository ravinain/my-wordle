export type KeyboardKeyProps = {
    keyState: KeyState;
    handleOnClick: (val: string) => void;
};

export type GameKeyBoardProps = {
    handleOnClick: (value: string) => void;
    keyStates?: KeyState[];
};

export type RowKeyState = KeyState[];

export type KeyState = {
    value: string;
    state: {
        valid: boolean;
        used: boolean;
        partialValid: boolean;
    };
};