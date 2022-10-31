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

//route
export const scoreRoute = Router();


scoreRoute.get(baseUrl, (_req, res) => {


    repository
        .find({
            relations: ['leaderboards', 'accounts'],

        })
        .then((scores) => {
            res.status(200).json(scores);
        })
        .catch((error) =>
            res.status(404).json({ errorMessage: 'Could not be found', error: error }),
        );
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
    //let secretToken = '';//??

    //if()
    //if token giltig, få epost ur det, sen leta fram kontot med epost & spara det
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

                                    // save score in each applicable leaderboard

                                    leaderboardRepository.findOneBy( { continent: continent, daily: false})
                                        .then((leaderboard) => {
                                            if (leaderboard){
                                                leaderboard.scores.push(savedScore);
                                            }
                                        });
                                    leaderboardRepository
                                        .save(continent, false, savedScore)
                                        .then(() => {
                                            res.status(200).json();
                                        })
                                        .catch((error) =>
                                            res.status(404).json({
                                                errorMessage: continent + ' overall repo could not be found',
                                                error: error
                                            }),
                                        );
                                    leaderboardRepository
                                        .save(continent, false, savedScore)
                                        .then(() => {
                                            res.status(200).json();
                                        })
                                        .catch((error) =>
                                            res.status(404).json({
                                                errorMessage: continent + ' daily repo could not be found',
                                                error: error
                                            }),
                                        );

                                    leaderboardRepository
                                        .save('world', false, savedScore)
                                        .then(() => {
                                            res.status(200).json();
                                        })
                                        .catch((error) =>
                                            res.status(404).json({
                                                errorMessage: 'World overall repo could not be found',
                                                error: error
                                            }),
                                        );
                                    leaderboardRepository
                                        .save('world', true, savedScore)
                                        .then(() => {
                                            res.status(200).json();
                                        })
                                        .catch((error) =>
                                            res.status(404).json({
                                                errorMessage: 'World daily repo could not be found',
                                                error: error
                                            }),
                                        );

                                    repository
                                        .save(savedScore)
                                        .then((score) => {
                                            res.status(200).json(score);
                                        })
                                        .catch((error) =>
                                            res.status(404)
                                                .json({ errorMessage: 'Score repo could not be found', error: error }),
                                        );
                                    // else return error in score
                                }
                            }
                        })
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


/*
scoreRoute.get(baseUrl, (_req, res) => {

    repository
        .find({
            relations: ['leaderboards', 'accounts'],
            order: { scores: 'DESC' },
            take:10,

        })
        .then((scores) => {
            res.status(200).json(scores);
        })
        .catch((error) =>
            res.status(404).json({ errorMessage: 'Could not be found', error: error }),
        );
});

scoreRoute.get('/scores/player/:displayName', (req, res) => {
    const userName = (req.params.displayName as string).toLowerCase();
    console.log(userName);

    repository
        .find({
            relations: ['accounts'],
            where: { accounts: { displayName: userName } },
        })
        .then((scores) => {
            res.status(200).json(scores);
        })
        .catch((error) =>
            res.status(404).json({ errorMessage: `${userName} doesn't exist`, error: error }),
        );
});

*/
