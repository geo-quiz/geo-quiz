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
    const body = req.body;
    let password = '';
    let email = '';

    if (body.password && body.email) {
        if (!passwordPattern.test(body.password) && !emailPattern.test(body.email)) {
            res.status(400).json({
                errorMessage: 'Password & Email do not meet the requirements',
                error:
                    'Invalid email address & password. Password must contain at least 8 characters, one lowercase' +
                    ' letter, one uppercase letter and one number. It must NOT contain any symbols',
            });
            return;
        }

        password = body.password as string;

        if (!passwordPattern.test(password)) {
            res.status(400).json({
                errorMessage: 'Password does not meet the requirements',
                error:
                    'Password must contain at least 8 characters, one lowercase letter, one uppercase letter and' +
                    ' one number. It must NOT contain any symbols',
            });
            return;
        }

        bcrypt
            .hash(password, 10)
            .then((hashedPassword: string) => {
                email = body.email as string;
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

                    const newAccount = new Account(email, hashedPassword);
                    repository
                        .save(newAccount)
                        .then(() => {
                            res.status(200).json({ msg: 'Account created' });
                        })
                        .catch((error) => {
                            res.status(400).json({ errorMessage: 'Something went wrong', error: error });
                        });
                });
            })
            .catch((error) => {
                res.status(400).json({ errorMessage: 'Something went wrong', error: error });
                return;
            });
    } else if (!body.password && body.email) {
        res.status(400).json({
            errorMessage: 'Missing parameters',
            error: 'Query must contain parameters: password',
        });
        return;
    } else if (!body.email && body.password) {
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
    const query = req.query;

    if (query.email && query.password) {
        const email = query.email as string;
        if (!emailPattern.test(email)) {
            console.log('Email is wrong');
            res.status(400).json({
                errorMessage: 'Invalid email format',
                error: 'Email is wrong',
            });
        } else
            repository.findOneBy({ email: email }).then((account) => {
                if (account) {
                    const password = query.password as string;
                    const passwordHash = account.passwordHash as string;
                    if (passwordHash === undefined) {
                        console.log('passwordHash is undefined');
                        res.status(400).json({
                            errorMessage: 'DB password format is wrong',
                            error: 'Problem with db password',
                        });
                    } else {
                        bcrypt
                            .compare(password, account.passwordHash)
                            .then((validPass) => {
                                if (validPass) res.status(200).json(validPass);
                                else {
                                    res.status(401).json(validPass);
                                }
                            })
                            .catch((err) => {
                                console.log('error: ' + err);
                                res.status(400).json({
                                    errorMessage: 'Something went wrong while checking the password',
                                    error: err,
                                });
                            });
                    }
                } else {
                    res.status(400).json({
                        errorMessage: 'Account does not exist',
                        error: 'Email not found',
                    });
                }
                return;
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
