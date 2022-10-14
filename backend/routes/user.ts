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

    if (query.password) {
        password = query.password as string;

        if (!passwordPattern.test(password)) {
            res.status(400).json({
                errorMessage: 'Password do not meet the requirements',
                error: 'Password must contain at least 8 characters, including one lowercase letter, one uppercase letter and one number.',
            });
        }

        bcrypt
            .hash(password, 10)
            .then((hashedPassword: string) => {
                password = hashedPassword;
            })
            .catch((error) => {
                res.status(400).json({ errorMessage: 'Something went wrong', error: error });
            });
    }

    if (query.email) {
        email = query.email as string;
        if (!emailPattern.test(email)) {
            res.status(400).json({
                errorMessage: 'Email is not valid',
                error: 'Invalid email address',
            });
        }
    }

    repository.findOneBy({ email: email }).then((account) => {
        if (account) {
            res.status(400).json({
                errorMessage: 'Email already exists',
                error: `Account with email: ${email} already exists`,
            });
        } else {
            const account = new Account(email, password);
            repository
                .insert(account)
                .then(() => {
                    res.status(200).json({ msg: 'Account created' });
                })
                .catch((error) => {
                    res.status(400).json({ errorMessage: 'Something went wrong', error: error });
                });
        }
    });
});
