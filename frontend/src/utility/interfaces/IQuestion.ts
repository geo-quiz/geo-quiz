import type { EContinent } from '../enums/EContinent';
import type { IAnswer } from './IAnswer';

export interface IQuestion {
    id: number;
    question: string;
    answers: IAnswer[];
    correctAnswer: number;
    continent: EContinent;
}
