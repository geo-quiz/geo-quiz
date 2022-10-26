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
/*

leaderBoardRoute.get('/leaderboard/:displayName', (req, res) => {
    const userName = req.params.displayName;
    console.log(userName);

    repository
        .findOne({
            where: { displayName: userName },
        })
        .then((leaderboard) => {
            res.status(200).json(leaderboard);
        })
        .catch((error) =>
            res.status(404).json({ errorMessage: `${userName} doesn't exist`, error: error }),
        );
});

*/

leaderBoardRoute.get(baseUrl, (_req, res) => {

    repository
        .find()

        .then((leaderboard) => {
            res.status(200).json(leaderboard);
        })
        .catch((error) => res.status(404).json(error));
});

