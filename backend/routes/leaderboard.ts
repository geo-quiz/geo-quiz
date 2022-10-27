import { Router } from 'express';
import { AppDataSource } from '../AppDataSource';
import { Leaderboard } from '../entities/Leaderboard';


const baseUrl = '/leaderboard';
const repository = AppDataSource.getRepository(Leaderboard);

//route
export const leaderBoardRoute = Router();


leaderBoardRoute.get('/leaderboard/:id', (req, res) => {
    const userId = Number.parseInt(req.params.id);

    repository
        .findOne({
            where: { id: userId },
        })
        .then((leaderboard) => {
            res.status(200).json(leaderboard);
        })
        .catch((error) =>
            res.status(404).json({ errorMessage: `${userId} doesn't exist`, error: error }),
        );
});


leaderBoardRoute.get('/leaderboard/player/:displayName', (req, res) => {
    const userName = (req.params.displayName as string).toLowerCase();
    console.log(userName);

    repository
        .find({
            relations: ['accounts'],
            where: { accounts: { displayName: userName } },
        })
        .then((leaderboard) => {
            res.status(200).json(leaderboard);
        })
        .catch((error) =>
            res.status(404).json({ errorMessage: `${userName} doesn't exist`, error: error }),
        );
});


leaderBoardRoute.get(baseUrl, (_req, res) => {
    repository
        .find({
            relations: ['accounts'],
            order: { score: 'DESC' },
            take :10,
        })


        .then((leaderboard) => {
            res.status(200).json(leaderboard);
        })
        .catch((error) => res.status(404).json(error));
});
