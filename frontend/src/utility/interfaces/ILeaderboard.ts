import type { IScore } from '@/utility/interfaces/IScore';
import type { EContinent } from '@/utility/enums/EContinent';

export interface ILeaderboard {
    id: number;
    continent: EContinent;
    daily: boolean;
    userScores: IScore[];
}
