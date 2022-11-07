import { Router } from 'express';
import { AppDataSource } from '../AppDataSource';
import { Score } from '../entities/Score';
import { Leaderboard } from '../entities/Leaderboard';
import jwt, { JwtPayload, VerifyErrors } from 'jsonwebtoken';
import { Account } from '../entities/Account';
import { Continent } from '../entities/Continent';

const baseUrl = '/scores';
const repository = AppDataSource.getRepository(Score);
const continentRepository = AppDataSource.getRepository(Continent);
const accountRepository = AppDataSource.getRepository(Account);
const leaderboardRepository = AppDataSource.getRepository(Leaderboard);

const secretToken = process.env.SECRET_TOKEN_SECRETS as string;

export const scoreRoute = Router();

function verifyToken(
    token: string,
    callback: (err: VerifyErrors | null, decoded: JwtPayload | string | undefined) => void,
) {
    jwt.verify(token, secretToken, callback);
}

scoreRoute.post(baseUrl, (req, res) => {
    function saveToLeaderboard(continent: string, savedScore: Score, daily: boolean): Promise<Leaderboard> {
        return new Promise<Leaderboard>((success, fail) => {
            continentRepository.findOneBy({ name: continent }).then((foundContinent) => {
                if (foundContinent) {
                    leaderboardRepository
                        .findOne({
                            where: { continent: foundContinent, daily: daily },
                            relations: { continent: true, scores: true },
                        })
                        .then((leaderboard) => {
                            if (leaderboard) {
                                if (leaderboard.scores != undefined) {
                                    (leaderboard.scores as Score[]).push(savedScore);
                                    leaderboardRepository
                                        .save(leaderboard)
                                        .then(() => {
                                            success(leaderboard);
                                            return;
                                        })
                                        .catch((error) => {
                                            console.error(error);
                                            res.statusMessage = 'Error while updating leaderboard';
                                            res.status(500).end();
                                            fail();
                                            return;
                                        });
                                } else {
                                    res.statusMessage = 'No leaderboard';
                                    res.status(500).end();
                                    fail();
                                    return;
                                }
                            } else {
                                res.statusMessage = 'Could not find leaderboard for: ' + continent;
                                res.status(500).end();
                                fail();
                                return;
                            }
                        })
                        .catch((error) => {
                            console.error(error);
                            res.statusMessage = 'Leaderboard could not be found for: ' + continent;
                            res.status(500).end();
                            fail();
                            return;
                        });
                } else {
                    res.statusMessage = 'Could not find continent with name: ' + continent;
                    res.status(404).end();
                    fail();
                    return;
                }
            });
        });
    }

    const continent = req.body.continent;
    const time = req.body.time;
    const score = req.body.score;
    const token = req.body.token;

    if (token && continent && time && score) {
        verifyToken(token, (error, decoded) => {
            if (error) {
                res.statusMessage = 'Invalid token';
                res.status(400).end();
                return;
            }
            if (decoded) {
                if ((decoded as JwtPayload).email) {
                    const email = (decoded as JwtPayload).email;

                    if (email) {
                        accountRepository.findOneBy({ email: email }).then((account) => {
                            if (account) {
                                if (score >= 0 && !(score > 10) && time > 0 && continent) {
                                    const savedScore = new Score(score, time, account);

                                    repository
                                        .save(savedScore)
                                        .then((score) => {
                                            saveToLeaderboard(continent, score, true)
                                                .then(() => {
                                                    saveToLeaderboard(continent, score, false)
                                                        .then(() => {
                                                            saveToLeaderboard('all', score, true)
                                                                .then(() => {
                                                                    saveToLeaderboard('all', score, false)
                                                                        .then(() => {
                                                                            res.status(200).end();
                                                                            return;
                                                                        })
                                                                        .catch((error) => {
                                                                            console.error(error);
                                                                            res.statusMessage = 'Error while saving 1';
                                                                            res.status(500).end();
                                                                            return;
                                                                        });
                                                                })
                                                                .catch((error) => {
                                                                    console.error(error);
                                                                    res.statusMessage = 'Error while saving 2';
                                                                    res.status(500).end();
                                                                    return;
                                                                });
                                                        })
                                                        .catch((error) => {
                                                            console.error(error);
                                                            res.statusMessage = 'Error while saving 3';
                                                            res.status(500).end();
                                                            return;
                                                        });
                                                })
                                                .catch((error) => {
                                                    console.error(error);
                                                    res.statusMessage = 'Error while saving 4';
                                                    res.status(500).end();
                                                    return;
                                                });
                                        })
                                        .catch((error) => {
                                            console.error(error);
                                            res.statusMessage = 'Error while saving 5';
                                            res.status(500).end();
                                            return;
                                        });
                                } else {
                                    res.statusMessage = 'Improbable score';
                                    res.status(400).end();
                                    return;
                                }
                            }
                        });
                    } else {
                        res.statusMessage = 'Account not found';
                        res.status(404).end();
                        return;
                    }
                }
            }
        });
    } else {
        res.status(400).end();
        return;
    }
    setTimeout(() => {
        res.statusMessage = 'Request timed out';
        res.status(500).end();
        return;
    }, 10000);
});
