import type { IScore } from '@/utility/interfaces/IScore';

export interface ILeaderboard {
    id: number;
    daily: boolean;
    scores: IScore[];
}
