export type CellTypeProps = {
    data: CellData;
    validated?: boolean;
    column: number;
};

export type CellData = {
    value: string;
    valid: boolean;
    partialValid: boolean;
};