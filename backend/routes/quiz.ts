import { Router } from 'express';
import { AppDataSource } from '../AppDataSource';
import { Question } from '../entities/Question';
import { Answer } from '../entities/Answer';

const baseUrl = '/quiz';
const repository = AppDataSource.getRepository(Question);

//route
export const quizRoute = Router();

quizRoute.get(baseUrl, (_req, res) => {
    repository
        .find({
            relations: ['answers'],
        })
        .then((questions) => {
            res.status(200).json(questions);
        })
        .catch((error) => res.status(404).json(error));
});

quizRoute.get('/quiz/:id', (req, res) => {
    const questionId = Number.parseInt(req.params.id);

    repository
        .findOne({
            relations: ['answers'],
            where: { id: questionId },
        })
        .then((question) => {
            res.status(200).json(question);
        })
        .catch((error) =>
            res.status(404).json({ errorMessage: `Quiz with ID: ${questionId} doesn't exist`, error: error }),
        );
});

quizRoute.get('/quiz/continent/:continent/', (req, res) => {
    const continentParam = req.params.continent as string;

    repository
        .find({
            relations: ['answers'],
            where: { continent: { name: continentParam } },
        })
        .then((questions) => {
            if (questions.length > 0) {
                res.status(200).json(questions);
            } else {
                const errorToThrow = new Error();
                errorToThrow.message = `No questions found for continent: ${continentParam}`;
                throw errorToThrow;
            }
        })
        .catch((error) =>
            res.status(404).json({ errorMessage: `Continent: ${continentParam} doesn't exist`, error: error }),
        );
});

quizRoute.post(baseUrl, (req, res) => {
    const questions = req.body as Question[];
    const answers: Answer[] = [];
    for (const question of questions) {
        if (question.answers) {
            for (const answer of question.answers) {
                answers.push(answer);
            }
        }
    }

    repository.save(questions).then((result) => {
        res.status(201).json(result);
    });

    const answerRepository = AppDataSource.getRepository(Answer);

    answerRepository
        .save(answers)
        .then(() => {
            repository.save(questions).then((result) => {
                res.status(201).json(result);
            });
        })
        .catch((error) => res.status(400).json(error));
});
