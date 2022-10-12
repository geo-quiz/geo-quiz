import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Continent } from './Continent';
import { Answer } from './Answer';

@Entity()
export class Question {
    constructor(question: string) {
        this.question = question;
        this.answers = undefined;
        this.correctAnswer = '';
        this.continent = undefined;
    }

    @PrimaryGeneratedColumn()
    id: number | undefined;

    @Column()
    question: string;

    @OneToMany(() => Answer, (answer) => answer.question)
    answers: Answer[] | undefined;

    @ManyToOne(() => Continent, (continent) => continent.id)
    continent: Continent | undefined;

    @Column()
    correctAnswer: string;
}
