import { Column, Entity, PrimaryGeneratedColumn, ManyToOne, ManyToMany } from 'typeorm';
import { Score } from './Score';
import { Continent} from './Continent';


@Entity()
export class Leaderboard {
    constructor(continent: Continent, daily: boolean) {
        this.continent = continent;
        this.daily = daily;
        this.scores = new Score(0, 0, 'nobody');
    }

    @PrimaryGeneratedColumn()
    id: number | undefined;

    @Column()
    daily: boolean;

    @ManyToMany(() => Score, (score) => score.id)
    scores: Score[];

   /* @ManyToOne(() => Continent, (continent) => continent.leaderboards)
    continent: Continent | undefined;*/

    @ManyToOne(() => Continent, (continent) => continent.id)
    continent: Continent | undefined;

}
