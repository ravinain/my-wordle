export type CellTypeProps = {
    data: CellData;
};

export type CellData = {
    value: string;
    valid?: boolean;
    partialValid?: boolean;
};