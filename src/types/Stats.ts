export type StatsType = {
    total: number;
    win: number;
    maxStreak: number;
    currentStreak: number;
    distribution: number[];
    lastWinAttempt?: number;
};

export type StatsServiceType = {
    updateStats: (currentStats: StatsType, win: boolean, currentRowIndex: number) => StatsType;
}
