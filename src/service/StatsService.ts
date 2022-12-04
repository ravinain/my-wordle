import { NUMBER_OF_ATTEMPTS } from "../Constant";
import { StatsServiceType, StatsType } from "../types/Stats";

export const StatsService = (): StatsServiceType => {

    const updateStats = (currentStats: StatsType, win: boolean, currentRowIndex: number): StatsType => {
        const { distribution } = currentStats;
        if (win) {
            
            distribution[currentRowIndex] = distribution[currentRowIndex] + 1;
            const currentStreak = currentStats.currentStreak + 1;

            return {
                total: currentStats.total + 1,
                win: currentStats.win + 1,
                currentStreak,
                maxStreak: Math.max(currentStats.maxStreak, currentStreak),
                lastWinAttempt: currentRowIndex,
                distribution
            };
        } else if (currentRowIndex + 1 === NUMBER_OF_ATTEMPTS) {
            return {
                ...currentStats,
                total: currentStats.total + 1,
                currentStreak: 0,
                lastWinAttempt: undefined,
            };
        }

        return currentStats;
    };

    return {
        updateStats
    }

};