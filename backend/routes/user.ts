import { Router } from 'express';
import bcrypt from 'bcrypt';
import { AppDataSource } from '../AppDataSource';
import { Account } from '../entities/Account';


const repository = AppDataSource.getRepository(Account);

export const userRoute = Router();

const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
const emailPattern = /^[a-zA-Z0-9.!#$%&'*+=?^_`{|}~-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-]+$/;

//routes
userRoute.post('/register', (req, res) => {
    const query = req.query;
    let password = '';
    let email = '';

    if (query.password && query.email) {
        password = query.password as string;

        if (!passwordPattern.test(password)) {
            res.status(400).json({
                errorMessage: 'Password does not meet the requirements',
                error: 'Password must contain at least 8 characters, one lowercase letter, one uppercase letter and one number. No punctuation.',
            });
            return;
        }

        bcrypt
            .hash(password, 10)
            .then((hashedPassword: string) => {
                password = hashedPassword;
            })
            .catch((error) => {
                res.status(400).json({ errorMessage: 'Something went wrong', error: error });
            });

        email = query.email as string;
        if (!emailPattern.test(email)) {
            res.status(400).json({
                errorMessage: 'Email is not valid',
                error: 'Invalid email address',
            });
            return;
        }

        repository.findOneBy({ email: email }).then((account) => {
            if (account) {
                res.status(400).json({
                    errorMessage: 'Email already exists',
                    error: `Account with email: ${email} already exists`,
                });
                return;
            }

            const newAccount = new Account(email, password);
            repository
                .save(newAccount)
                .then(() => {
                    res.status(200).json({ msg: 'Account created' });
                })
                .catch((error) => {
                    res.status(400).json({ errorMessage: 'Something went wrong', error: error });
                });
        });
    } else if (!query.password && query.email) {
        res.status(400).json({
            errorMessage: 'Missing parameters',
            error: 'Query must contain parameters: password',
        });
        return;
    } else if (!query.email && query.password) {
        res.status(400).json({
            errorMessage: 'Missing parameters',
            error: 'Query must contain parameters: email',
        });
        return;
    } else {
        res.status(400).json({
            errorMessage: 'Missing parameters',
            error: 'Query must contain parameters: email and password',
        });
        return;
    }
});
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

            userRoute.get('/login', (_req, res) => {
                repository
                    .find()
                    .then((emails) => {
                        res.status(200).json(emails);
                    })
                    .catch((error) => res.status(404).json(error));
            });
