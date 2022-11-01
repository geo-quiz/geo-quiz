import { Column, Entity, PrimaryGeneratedColumn, ManyToMany } from 'typeorm';
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

    @ManyToMany(() => Leaderboard, (leaderboard) => leaderboard.scores)
    leaderboards: Leaderboard[] | undefined;

    // @ManyToOne(() => Account, ((account) => account.id))
    // accounts: Account | undefined;
}
