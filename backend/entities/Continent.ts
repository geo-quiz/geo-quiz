import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Leaderboard } from './Leaderboard';


@Entity()
export class Continent {
    constructor(name: string) {
        this.name = name;
    }

    @PrimaryGeneratedColumn()
    id: number | undefined;

    @Column()
    name: string;

    @ManyToOne(() => Leaderboard, (leaderboard) => leaderboard.id)
    leaderboard: Leaderboard[] | undefined;

}
