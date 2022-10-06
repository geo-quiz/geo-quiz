import { EContinent } from "../enums/EContinent";

export interface IQuizQuestion {
    id: number,
    question: string;
    answers: string[];
    correctAnswer: string;
    continent: EContinent;
}
