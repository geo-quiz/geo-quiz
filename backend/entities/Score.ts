import { Column, Entity, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Account } from './Account';
import { Leaderboard } from './Leaderboard';



@Entity()
export class Score {
    constructor(points: number, time: number, displayName: string) {
        this.points = points;
        this.time = time;
        this.displayName = displayName;
    }

    @PrimaryGeneratedColumn()
    id: number | undefined;

    @Column()
    points: number;

    @Column()
    time: number;

    @Column()
    displayName: string;

    // @Column()
    // profilePicture: string;

    @ManyToMany(() => Leaderboard, (leaderboard) => leaderboard.id)
    leaderboards: Leaderboard[] | undefined;

    @ManyToOne(() => Account, ((account) => account.id))
    accounts: Account | undefined;

    @ManyToOne(() => Leaderboard, (leaderboard) => leaderboard.id)
    leaderboards: Leaderboard[] | undefined;

}
