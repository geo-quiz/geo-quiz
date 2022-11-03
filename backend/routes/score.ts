import { Router } from 'express';
import { AppDataSource } from '../AppDataSource';
import { Score } from '../entities/Score';
import { Account } from '../entities/Account';
import { Leaderboard } from '../entities/Leaderboard';
import jwt, { JwtPayload, VerifyErrors } from 'jsonwebtoken';
import { Continent } from '../entities/Continent';



const baseUrl = '/scores';
const repository = AppDataSource.getRepository(Score);
const accountRepository = AppDataSource.getRepository(Account);
const secretToken = process.env.SECRET_TOKEN_SECRETS as string;

//route
export const scoreRoute = Router();

scoreRoute.get(baseUrl, (_req, res) => {
    repository
        .find({
            relations: ['leaderboards'],
        })
        .then((scores) => {
            res.status(200).json(scores);
        })
        .catch((error) => res.status(404).json({ errorMessage: 'Could not be found', error: error }));
});

function verifyToken(
    token: string,
    callback: (err: VerifyErrors | null, decoded: JwtPayload | string | undefined) => void,
) {
    jwt.verify(token, secretToken, callback);
}


scoreRoute.post(baseUrl, (req, res) => {
    const leaderboardRepository = AppDataSource.getRepository(Leaderboard);
    //const worldDailyBoardRepo = AppDataSource.getRepository(Leaderboard);
    //const europeBoardRepo = AppDataSource.getRepository(Leaderboard);

    const body = req.body;
    const token = req.body.token;

    //let continent = '';
   // let secretToken = userRoute.;//??

    //if()
    function saveToContinentLeaderboards(continent: Continent, savedScore: Score) {
        leaderboardRepository
            .findOneBy({ continent: continent, daily: false })
            .then((leaderboard) => {
                if (leaderboard) {
                    if (leaderboard.scores != undefined) {
                        leaderboard.scores.push(savedScore);
                    } else {
                        console.error('Could not save score to ' + leaderboard.continent);
                    }
                }
            })
            .catch((error) =>
                res.status(404).json({
                    errorMessage: continent + ' overall repo could not be found',
                    error: error,
                }),
            );

        leaderboardRepository
            .findOneBy({ continent: continent, daily: true })
            .then((leaderboard) => {
                if (leaderboard) {
                    if (leaderboard.scores != undefined) {
                        leaderboard.scores.push(savedScore);
                    } else {
                        console.error('Could not save score to ' + leaderboard.continent);
                    }
                }
            })
            .catch((error) =>
                res.status(404).json({
                    errorMessage: continent + ' daily repo could not be found',
                    error: error,
                }),
            );
    }

    function saveToWorldLeaderboards(world: Continent, savedScore: Score) {
        leaderboardRepository
            .findOneBy({ continent: world, daily: false })
            .then((leaderboard) => {
                if (leaderboard) {
                    if (leaderboard.scores != undefined) {
                        leaderboard.scores.push(savedScore);
                    } else {
                        console.error('Could not save score to ' + leaderboard.continent);
                    }
                }
            })
            .catch((error) =>
                res.status(404).json({
                    errorMessage: 'World overall leaderboard could not be found',
                    error: error,
                }),
            );
        leaderboardRepository
            .findOneBy({ continent: world, daily: true })
            .then((leaderboard) => {
                if (leaderboard) {
                    if (leaderboard.scores != undefined) {
                        leaderboard.scores.push(savedScore);
                    } else {
                        console.error('Could not save score to ' + leaderboard.continent);
                    }
                }
            })
            .catch((error) =>
                res.status(404).json({
                    errorMessage: 'World daily leaderboard could not be found',
                    error: error,
                }),
            );
    }

    if (token) {
        verifyToken(token, (error, decoded) => {
            if (error) {
                res.statusMessage = 'Invalid token,';
                res.status(400).end();
                return;
            }
            if (decoded) {
                if ((decoded as JwtPayload).email) {
                    const email = (decoded as JwtPayload).email;

                    if (email) {
                        accountRepository.findOneBy({ email: email }).then((account) => {
                            if (account) {
                                const points = body.points as number;
                                const time = body.time as number;
                                const continent = body.continent as Continent;
                                const displayName = account.displayName;
                                //const profilePicture = account.profilePicture;

                                if (points >= 0 && time > 0 && continent) {
                                    const savedScore = new Score(points, time, displayName);
                                    const world = new Continent('world');

                                   
                                    saveToContinentLeaderboards(continent, savedScore);
                                    saveToWorldLeaderboards(world, savedScore);

                                  
                                    repository
                                        .save(savedScore)
                                        .then((score) => {
                                            res.status(200).json(score);
                                        })
                                        .catch((error) =>
                                            res
                                                .status(404)
                                                .json({ errorMessage: 'Score repo could not be found', error: error }),
                                        );
                                    // else return error in score
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
    }
});
