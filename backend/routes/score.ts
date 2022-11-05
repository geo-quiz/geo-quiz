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
const leaderboardRepository = AppDataSource.getRepository(Leaderboard);
// const answerRepository = AppDataSource.getRepository(Answer);
// const tokenRepository = AppDataSource.getRepository(Token);
// const continentRepository = AppDataSource.getRepository(Continent);


const secretToken = process.env.SECRET_TOKEN_SECRETS as string;

export const scoreRoute = Router();


/*body: JSON.stringify({
    continent: continent.value,
    time: totalTime.value,
    score: currentQuiz.points,
    token: authStore.getToken(),*/
// receive: Continent & Array of Answers? & token & time

/*
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
*/

/*//Ger alla scores fördelat per leaderboard
scoreRoute.get('/scores/:continent', (req, res) => {
    const displaynameParam = (req.params.continent as string).toLowerCase();
    const user = 'Trilliam';
//1. receive: Continent & Array of Answers? & token & time
    repository
        .find({
            relations: ['leaderboards'],
            order: { leaderboards: { daily: 'DESC' } },
            where: { displayName: displaynameParam }
        })
        .then((leaderboards) => {


            const responseData = {
                //  userScore: userleaderboards,
                continentBoards: leaderboards,


            };
            res.status(200).json(responseData);
        });
});
*/

/*//Ger alla svaren från databasen och id
scoreRoute.get(baseUrl, (_req, res) => {

    answerRepository
        .find({
            order: {
                id: 'ASC'
            },
            skip: 0,

        })
        .then((scores) => {
            res.status(200).json(scores);

        });*/

/*//Ger Continent i stigande ordning
scoreRoute.get(baseUrl, (_req, res) => {

    continentRepository
        .find({
            order: {
                id: 'ASC'
            },
            skip: 0,

        })
        .then((scores) => {
            res.status(200).json(scores);

        });*/

/*//Ger scores i fallande ordning om 10
scoreRoute.get(baseUrl, (_req, res) => {

    repository
        .find({
            order: {
                points: 'DESC'
            },
            skip: 0,
            take: 10,
        })
        .then((scores) => {
            res.status(200).json(scores);

});*/


//1. receive: Continent & Array of Answers? & token & time
/*
scoreRoute.get('/scores/:continent', (req, res) => {
    const displaynameParam = (req.params.continent as string).toLowerCase();
    const user = 'Trilliam';

    answerRepository
        .find({
            relations: ['leaderboards'],
            order: { id:  'DESC'  },
            where: { id: displaynameParam  }
        })
        .then((leaderboards) => {


            const responseData = {
                //  userScore: userleaderboards,
                continentBoards: leaderboards,


            };
            res.status(200).json(responseData);
        });
});
*/


function verifyToken(
    token: string,
    callback: (err: VerifyErrors | null, decoded: JwtPayload | string | undefined) => void,
) {
    jwt.verify(token, secretToken, callback);
}

//const worldDailyBoardRepo = AppDataSource.getRepository(Leaderboard);

scoreRoute.post(baseUrl, (req, res) => {
    // const continent = req.body.continent;
    // const time = req.body.time;
    // const score = req.body.score;
    const token = req.body.token;
    console.log(req.body);

    if (token) {
        verifyToken(token, (error, decoded) => {
            if (error) {
                res.statusMessage = 'Invalid token';
                res.status(400).end();
                return;
            }
            if (decoded) {
                if ((decoded as JwtPayload).displayName) {
                    const displayName = (decoded as JwtPayload).email;

                    const body = req.body.score;
                    if (body) {
                        repository.findOneBy({ displayName: displayName }).then((score) => {
                                if (score) {
                                    if (body.displayName) {
                                        score.displayName = body.displayName as string;
                                    }
                                    if (body.time) {
                                        score.time = body.time as number;
                                    }
                                    if (body.points) {
                                        score.points = body.points as number;
                                    }
                                }


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
                                                const displayName = (decoded as JwtPayload).email;

                                                if (displayName) {
                                                    accountRepository.findOneBy({ displayName: displayName })
                                                        .then((account) => {
                                                            if (account) {
                                                                const points = body.points as number;
                                                                const time = body.time as number;
                                                                const continent = body.continent as Continent;
                                                                const displayName = account.displayName;
                                                                const profilePicture = account.profilePicture;

                                                                if (points >= 0 && time > 0 && continent) {
                                                                    const savedScore = new Score(points, time, displayName, profilePicture);
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
                                                                                .json({
                                                                                    errorMessage: 'Score repo could not be found',
                                                                                    error: error
                                                                                }),
                                                                        );
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
                            }
                        )
                    }
                }
            }
        })
    }
})