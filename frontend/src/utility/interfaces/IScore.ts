import type { IAccount } from '@/utility/interfaces/IAccount';

export interface IScore {
    id: number;
    points: number;
    time: number;
    account: IAccount;
}
