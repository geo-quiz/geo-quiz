import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Question } from './Question';

@Entity()
export class Answer {
    constructor(answer: string) {
        this.answer = answer;
        this.question = undefined;
    }

    @PrimaryGeneratedColumn()
    id: number | undefined;

    @Column()
    answer: string;

    @ManyToOne(() => Question, (question) => question.answers)
    question: Question | undefined;
}
