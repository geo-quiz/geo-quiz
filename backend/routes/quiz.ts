import { Router } from 'express';
import questions from '../data/questions.json';

const baseUrl = '/quiz';

//route
export const quizRoute = Router();

quizRoute.get(baseUrl, (_req, res) => {
    res.json(questions);
});

quizRoute.get('/quiz/:id', (req, res) => {
    const quizId = Number.parseInt(req.params.id);
    const quizItem = questions.find((quiz) => quiz.id === quizId);

    if (quizItem) {
        res.json(quizItem);
    } else {
        res.status(404).json({ errorMessage: `Quiz with ID: ${quizId} doesn't exist` });

    }
});


quizRoute.get('/quiz/continent/:continent/', (req, res) => {


    const continent = req.params.continent;

    const questionsFiltered = questions.filter(q => q.continent == continent);

    res.json(questionsFiltered);

});
