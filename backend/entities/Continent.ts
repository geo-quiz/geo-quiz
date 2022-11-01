import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
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

    @OneToMany(() => Leaderboard, (leaderboard) => leaderboard.id)
    leaderboards: Leaderboard[] | undefined;
}
