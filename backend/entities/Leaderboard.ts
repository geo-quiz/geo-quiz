import { Column, Entity, PrimaryGeneratedColumn, ManyToOne, ManyToMany, JoinTable } from 'typeorm';
import { Score } from './Score';
import { Continent } from './Continent';

@Entity()
export class Leaderboard {
    constructor(name: string, continent: Continent, daily: boolean) {
        this.name = name;
        this.continent = continent;
        this.daily = daily;
        this.scores = undefined;
        //new Score(0, 0, 'nobody');
    }

    @PrimaryGeneratedColumn()
    id: number | undefined;

    @Column({default: '' })
    name: string;

    @Column()
    daily: boolean;

    @ManyToOne(() => Continent, (continent) => continent.id)
    continent: Continent | undefined;

    @ManyToMany(() => Score, (score) => score.leaderboards)
    @JoinTable()
    scores: Score[] | undefined;

    /* @ManyToOne(() => Continent, (continent) => continent.leaderboards)
    continent: Continent | undefined;*/
}
