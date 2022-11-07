import { Router } from 'express';
import { AppDataSource } from '../AppDataSource';
import { Leaderboard } from '../entities/Leaderboard';
import { Account } from '../entities/Account';
import jwt, { JwtPayload, VerifyErrors } from 'jsonwebtoken';

const repository = AppDataSource.getRepository(Leaderboard);
const accountRepository = AppDataSource.getRepository(Account);
const secretToken = process.env.SECRET_TOKEN_SECRETS as string;

export const leaderBoardRoute = Router();

function verifyToken(
    token: string,
    callback: (err: VerifyErrors | null, decoded: JwtPayload | string | undefined) => void,
) {
    jwt.verify(token, secretToken, callback);
}

leaderBoardRoute.get('/leaderboard/:continent', (req, res) => {
    const continentParam = (req.params.continent as string).toLowerCase();
    const token = req.headers.authorization?.replace('Bearer ', '');

    if (token && continentParam) {
        verifyToken(token, (err, decoded) => {
            if (err) {
                console.error(err);
                res.status(500).end();
                return;
            }
            if (decoded) {
                if ((decoded as JwtPayload).email) {
                    const email = (decoded as JwtPayload).email;
                    accountRepository.findOneBy({ email: email }).then((foundAccount) => {
                        if (foundAccount) {
                            repository
                                .find({
                                    relations: {
                                        scores: { account: true },
                                        continent: true,
                                    },
                                    order: { scores: { points: 'DESC', time: 'ASC' } },
                                    where: { continent: { name: continentParam } },
                                    select: {
                                        daily: true,
                                        id: true,
                                        continent: { name: true, id: true },
                                        scores: {
                                            points: true,
                                            id: true,
                                            time: true,
                                            account: {
                                                displayName: true,
                                                profilePicture: true,
                                                passwordHash: false,
                                            },
                                        },
                                    },
                                })
                                .then((leaderboards) => {
                                    if (leaderboards) {
                                        repository
                                            .find({
                                                relations: {
                                                    scores: { account: true },
                                                    continent: true,
                                                },
                                                order: { scores: { points: 'DESC', time: 'ASC' } },
                                                where: {
                                                    continent: { name: continentParam },
                                                    scores: { account: foundAccount },
                                                },
                                                select: {
                                                    daily: true,
                                                    id: true,
                                                    continent: { name: true, id: true },
                                                    scores: {
                                                        points: true,
                                                        id: true,
                                                        time: true,
                                                        account: {
                                                            displayName: true,
                                                            profilePicture: true,
                                                            passwordHash: false,
                                                        },
                                                    },
                                                },
                                            })
                                            .then((userLeaderboard) => {
                                                const responseData = {
                                                    userScore: userLeaderboard,
                                                    continentBoards: leaderboards,
                                                };
                                                res.status(200).json(responseData);
                                            });
                                    } else {
                                        res.statusMessage = 'Could not find leaderboard';
                                        res.status(404).end();
                                        return;
                                    }
                                });
                        } else {
                            res.statusMessage = 'Could not find account';
                            res.status(404).end();
                            return;
                        }
                    });
                } else {
                    res.statusMessage = 'Invalid token';
                    res.status(400).end();
                    return;
                }
            }
        });
    } else {
        res.status(400).end();
        return;
    }
});
