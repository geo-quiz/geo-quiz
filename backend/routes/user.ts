import { Router } from 'express';
import { AppDataSource } from '../AppDataSource';
import { Account } from '../entities/Account';

const repository = AppDataSource.getRepository(Account);

export const userRoute = Router();

const emailPattern = /^[a-zA-Z0-9.!#$%&'*+=?^_`{|}~-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-]+$/;

//routes

userRoute.post('/login', (req, res) => {
    // const newUser = new Account('test@test.com', 'testhash');
    const query = req.query;

    if (query.email) {
        const email = query.email as string;
        if (!emailPattern.test(email)) {
            console.log('Email is wrong');
            res.status(400).json({
                errorMessage: 'Invalid email format',
                error: 'Email is wrong',
            });
        } else {
            //res.status(200).json({ success: 'yes' });
            //rätt email
            repository;

            //bcryt
        }
    }

    // const testRepository = AppDataSource.getRepository(Account);
    //
    // testRepository.save(newUser).then();
});

userRoute.get('/login', (_req, res) => {
    repository
        .find()
        .then((emails) => {
            res.status(200).json(emails);
        })
        .catch((error) => res.status(404).json(error));
});

// userRoute.get(loginUrl, (_req, res) => {
//
//         .findOne({
//             where: { email: 'test@test.com' },
//         })
//         .then((question) => {
//             res.status(200).json(question);
//         })
//         .catch((error) => res.status(404).json({ errorMessage: "User with ID:  doesn't exist", error: error }));
// });
