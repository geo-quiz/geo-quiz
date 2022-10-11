import { Router } from 'express';
import { AppDataSource } from '../AppDataSource';
import { Question } from '../entities/Question';

const baseUrl = '/quiz';
const repository = AppDataSource.getRepository(Question);

//route
export const quizRoute = Router();

quizRoute.get(baseUrl, (_req, res) => {
    repository.find({
        relations: ['answers']
    }).then(questions => {
        res.status(200).json(questions);
    }).catch((error => res.status(404).json(error)));
});

quizRoute.get('/quiz/:id', (req, res) => {
    const questionId = Number.parseInt(req.params.id);

    repository.findOne({
        relations: ['answers'],
        where: { id: questionId }
    }).then(question => {
        res.status(200).json(question);
    }).catch((error => res.status(404)
        .json({ errorMessage: `Quiz with ID: ${questionId} doesn't exist`, error: error })));
});

quizRoute.get('/quiz/continent/:continent/', (req, res) => {
    const continentParam = req.params.continent as string;

    repository.find({
        relations: ['answers'],
        where: { continent: { name: continentParam } }
    }).then(questions => {
        if (questions.length > 0) {
            res.status(200).json(questions);
        } else {
            const errorToThrow = new Error();
            errorToThrow.message = `No questions found for continent: ${continentParam}`;
            throw errorToThrow;
        }
    }).catch((error => res.status(404)
        .json({ errorMessage: `Continent: ${continentParam} doesn't exist`, error: error })));
});
