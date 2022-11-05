import { Column, Entity, PrimaryGeneratedColumn, ManyToMany, JoinTable } from 'typeorm';
import { Leaderboard } from './Leaderboard';

@Entity()
export class Score {
    constructor(points: number, time: number, displayName: string, profilePicture: any) {
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

    @Column()
    profilePicture: string;

    @ManyToMany(() => Leaderboard, (leaderboard) => leaderboard.scores)
    @JoinTable()
        leaderboards: Leaderboard[] | undefined;
    
}
