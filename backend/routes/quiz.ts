import { Router } from 'express';
import questions from '../json/questions.json';



console.log(questions.id);
console.log(questions.question);
console.log(questions.answers);
console.log(questions.correctAnswer);
console.log(questions.continent);
const baseUrl = '/quiz';

export const quizRoute = Router();

//routes
quizRoute.get(baseUrl, (_req, res) => {
    res.json(questions);

});

