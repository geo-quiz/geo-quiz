import { EContinent } from "../enums/EContinent";
import { IAnswer } from './IAnswer';

export interface IQuestion {
    id: number,
    question: string;
    answers: IAnswer[];
    correctAnswer: number;
    continent: EContinent;
}
