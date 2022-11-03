import { Router } from 'express';
import { AppDataSource } from '../AppDataSource';
import { Leaderboard } from '../entities/Leaderboard';

const baseUrl = '/leaderboard';
const repository = AppDataSource.getRepository(Leaderboard);

export const leaderBoardRoute = Router();

leaderBoardRoute.get('/leaderboard/:continent', (req, res) => {
    const continentParam = (req.params.continent as string).toLowerCase();

    //id from JWTtoken
    const user = 'Trilliam';


    repository
        .find({
            relations: ['scores'],
            order: { scores: { points: 'DESC' }},
            where: { continent: { name: continentParam } },
        })
        .then((leaderboards) => {

            repository.find({
                relations: ['scores'],
                order: { scores: { points: 'DESC' }},
                where: { continent: { name: continentParam }, scores: { displayName: user } }
            })
                .then((userleaderboards) => {

                    const responseData = {
                        userScore: userleaderboards,
                        continentBoards: leaderboards,
                    };
                    res.status(200).json(responseData);
                });
        });


    leaderBoardRoute.get(baseUrl, (_req, res) => {
        repository
            .find({
                relations: ['scores', 'continent'],
                take: 14,
            })

            .then((leaderboard) => {
                res.status(200).json(leaderboard);
            })
            .catch((error) => res.status(404).json(error));

    });
});
