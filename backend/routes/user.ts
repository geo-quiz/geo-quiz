import { Router } from 'express';
import { AppDataSource } from '../AppDataSource';
import { Account } from '../entities/Account';

const loginUrl = '/login';
const repository = AppDataSource.getRepository(Account);
//const allUsers = await ;

export const userRoute = Router();

const emailPattern = /^[a-zA-Z0-9.!#$%&'*+=?^_`{|}~-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-]+$/;

//routes

userRoute.post(loginUrl, (req, res) => {
    const query = req.query;

    if (query.email) {
        const email = query.email as string;

        if (!emailPattern.test(email)) {
            res.status(404).json({
                errorMessage: 'Invalid email format',
                error: 'Email is wrong',
            });
        }

        //bcryt
    }

    const newUser = new Account('test@test.com', 'testhash');
    const testRepository = AppDataSource.getRepository(Account);

    testRepository.save(newUser).then();
});

userRoute.get(loginUrl, (_req, res) => {
    repository
        .findOne({
            where: { email: 'test@test.com' },
        })
        .then((question) => {
            res.status(200).json(question);
        })
        .catch((error) => res.status(404).json({ errorMessage: 'User with ID:  doesn\'t exist', error: error }));
});
