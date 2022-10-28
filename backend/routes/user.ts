import * as dotenv from 'dotenv';
import { Router } from 'express';
import bcrypt from 'bcrypt';
import { AppDataSource } from '../AppDataSource';
import { Account } from '../entities/Account';
import jwt, { JwtPayload } from 'jsonwebtoken';
import { Role } from '../entities/Role';

dotenv.config();
const repository = AppDataSource.getRepository(Account);
const roleRepository = AppDataSource.getRepository(Role);

export const userRoute = Router();

const secretToken = process.env.SECRET_TOKEN_SECRETS as string;

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
                    roleRepository.findOneBy({ id: 1 }).then((role) => {
                        if (role) {
                            newAccount.role = role;
                            repository
                                .save(newAccount)
                                .then(() => {
                                    res.status(200).json({ msg: 'Account created' });
                                })
                                .catch((error) => {
                                    res.status(400).json({ errorMessage: 'Something went wrong', error: error });
                                });
                        } else {
                            res.status(400).json({ errorMessage: 'Something went wrong', error: 'Role not found' });
                        }
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
            error: 'Request must contain parameters: password',
        });
        return;
    } else if (!body.email && body.password) {
        res.status(400).json({
            errorMessage: 'Missing parameters',
            error: 'Request must contain parameters: email',
        });
        return;
    } else {
        res.status(400).json({
            errorMessage: 'Missing parameters',
            error: 'Request must contain parameters: email and password',
        });
        return;
    }
});

userRoute.post('/login', (req, res) => {
    const body = req.body;
    if (body.email && body.password) {
        const email = body.email as string;
        if (!emailPattern.test(email)) {
            console.log('Email is wrong');
            res.statusMessage = 'Invalid email format';
            res.status(400).end();
        } else
            repository
                .findOne({
                    relations: { role: true },
                    where: { email: email },
                })
                .then((account) => {
                    if (account) {
                        const password = body.password as string;
                        const passwordHash = account.passwordHash as string;
                        if (passwordHash === undefined) {
                            console.log('passwordHash is undefined');
                            res.statusMessage = 'Problem with database password';
                            res.status(400).end();
                        } else {
                            bcrypt
                                .compare(password, account.passwordHash)
                                .then((validPass) => {
                                    if (account.role) {
                                        if (validPass) {
                                            const accessToken = jwt.sign(
                                                { email: account.email, role: account.role.id },
                                                secretToken,
                                                { expiresIn: 2629800000 },
                                            );
                                            res.json({ accessToken: accessToken });
                                        } else {
                                            res.statusMessage = 'Invalid password or email';
                                            res.status(400).end();
                                        }
                                    } else {
                                        res.statusMessage = 'Invalid account, contact website administrator';
                                        res.status(400).end();
                                    }
                                })
                                .catch((err) => {
                                    console.log('error: ' + err);
                                    res.statusMessage = 'Something went wrong while checking the password';
                                    res.status(400).end();
                                });
                        }
                    } else {
                        res.statusMessage = 'Invalid password or email';
                        res.status(400).end();
                    }
                    return;
                });
    } else if (!body.password && body.email) {
        res.statusMessage = 'Missing password';
        res.status(400).end();
        return;
    } else if (!body.email && body.password) {
        res.statusMessage = 'Missing email';
        res.status(400).end();
        return;
    } else {
        res.statusMessage = 'Missing email and password';
        res.status(400).end();
        return;
    }
});

function verifyToken(
    token: string,
    callback: (err: VerifyErrors | null, decoded: JwtPayload | string | undefined) => void,
) {
    jwt.verify(token, secretToken, callback);
}

userRoute.post('/validate', (req, res) => {
    const body = req.body;
    if (body.token && body.password) {
        verifyToken(body.token, (error, decoded) => {
            console.log('error: ', error);
            console.log('decoded: ', decoded);
            if (error) {
                res.statusMessage = 'Invalid token';
                res.status(400).end();
                return;
            }
            if (decoded) {
                repository.findOneBy({ email: (decoded as JwtPayload).email }).then((account) => {
                    if (account) {
                        bcrypt.compare(body.password, account.passwordHash).then((validPass) => {
                            if (validPass) {
                                res.status(200).json({ msg: 'Correct password' });
                                return;
                            } else {
                                res.statusMessage = 'Incorrect password';
                                res.status(400).end();
                                return;
                            }
                        });
                    } else {
                        res.statusMessage = 'Account not found';
                        res.status(400).end();
                        return;
                    }
                });
            }
        });
    } else {
        res.statusMessage = 'Missing token and/or password';
        res.status(400).end();
        return;
    }
});

userRoute.post('/update', (req, res) => {
    const token = req.body.token;

    if (token) {
        verifyToken(token, (error, decoded) => {
            if (error) {
                res.statusMessage = 'Invalid token';
                res.status(400).end();
                return;
            }
            if (decoded) {
                if ((decoded as JwtPayload).email) {
                    const email = (decoded as JwtPayload).email;

                    const body = req.body.account;
                    if (body) {
                        repository.findOneBy({ email: email }).then((account) => {
                            if (account) {
                                if (body.displayName) {
                                    account.displayName = body.displayName as string;
                                }
                                if (body.profilePicture) {
                                    account.profilePicture = body.profilePicture as string;
                                }
                                if (body.leaderboardParticipation) {
                                    if (body.leaderboardParticipation as boolean) {
                                        account.leaderboardParticipation = 1;
                                    } else {
                                        account.leaderboardParticipation = 0;
                                    }
                                }
                                if (body.password) {
                                    if (passwordPattern.test(body.password as string)) {
                                        bcrypt.hash(body.password as string, 10).then((hash) => {
                                            account.passwordHash = hash;
                                            repository.save(account).then(() => {
                                                res.status(200).json({ msg: 'Account updated' });
                                                return;
                                            });
                                        });
                                    } else {
                                        res.statusMessage = 'Invalid password format';
                                        res.status(400).end();
                                        return;
                                    }
                                } else {
                                    repository
                                        .save(account)
                                        .then(() => {
                                            res.status(200).json({ msg: 'Account updated' });
                                            return;
                                        })
                                        .catch((err) => {
                                            res.statusMessage = 'Something went wrong while updating the account';
                                            res.status(400).json({ msg: err }).end();
                                        });
                                }
                            } else {
                                res.statusMessage = 'Account not found';
                                res.status(404).end();
                                return;
                            }
                        });
                    } else {
                        res.statusMessage = 'Missing parameters';
                        res.status(400).end();
                        return;
                    }
                }
            }
        });
    } else {
        res.statusMessage = 'Missing parameters';
        res.status(400).end();
        return;
    }
});
