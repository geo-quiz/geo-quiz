import { Column, Entity, PrimaryGeneratedColumn, ManyToOne, ManyToMany, JoinTable } from 'typeorm';
import { Score } from './Score';
import { Continent } from './Continent';

@Entity()
export class Leaderboard {
    constructor(continent: Continent, daily: boolean) {
        this.continent = continent;
        this.daily = daily;
    }

    @PrimaryGeneratedColumn()
    id: number | undefined;

    @Column()
    daily: boolean;

    @ManyToOne(() => Continent, (continent) => continent.id)
    continent: Continent | undefined;

    @ManyToMany(() => Score)
    @JoinTable()
    scores: Score[] | undefined;
}
