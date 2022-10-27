import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Account } from './Account';

@Entity()
export class Leaderboard {
    constructor(score: number, time: number) {
        this.score = score;
        this.time = time;
    }

    @PrimaryGeneratedColumn()
    id: number | undefined;

    @Column()
    score: number;

    @Column()
    time: number;

    @ManyToOne(() => Account, ((account) => account.id))
    accounts: Account | undefined;
}
