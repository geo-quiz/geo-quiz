import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
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


    @OneToMany(() => Account, ((account) => account.id))
    leaderboard: Account | undefined;
}