import * as dotenv from 'dotenv';
import { Router } from 'express';
import bcrypt from 'bcrypt';
import { AppDataSource } from '../AppDataSource';
import { Account } from '../entities/Account';
import jwt, { JwtPayload, VerifyErrors } from 'jsonwebtoken';
import { Role } from '../entities/Role';
import { Token } from '../entities/Token';
import formidable from 'formidable';
import path from 'path';
import * as fs from 'fs';

dotenv.config();
const repository = AppDataSource.getRepository(Account);
const roleRepository = AppDataSource.getRepository(Role);
const tokenRepository = AppDataSource.getRepository(Token);

export const userRoute = Router();

const secretToken = process.env.SECRET_TOKEN_SECRETS as string;

const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
const emailPattern = /^[a-zA-Z0-9.!#$%&'*+=?^_`{|}~-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-]+$/;

userRoute.post('/register', (req, res) => {
    const body = req.body;

    if (body.password && body.email && body.displayName) {
        if (!passwordPattern.test(body.password) && !emailPattern.test(body.email)) {
            res.statusMessage = 'Password & Email do not meet the requirements';
            res.status(400).end();
            return;
        }

        const password = body.password as string;

        if (!passwordPattern.test(password)) {
            res.statusMessage = 'Password does not meet the requirements';
            res.status(400).end();
            return;
        }

        bcrypt
            .hash(password, 10)
            .then((hashedPassword: string) => {
                const email = body.email as string;
                if (!emailPattern.test(email)) {
                    res.statusMessage = 'Invalid email address';
                    res.status(400).end();
                    return;
                }

                const displayName = body.displayName as string;

                repository.findOneBy({ displayName: displayName }).then((account) => {
                    let displayNameExists = false;

                    if (account) {
                        displayNameExists = true;
                    }

                    repository.findOneBy({ email: email }).then((account) => {
                        if (account && displayNameExists) {
                            res.statusMessage = 'Email & Display Name already exists';
                            res.status(400).end();
                        }

                        if (account) {
                            res.statusMessage = 'Email already exists';
                            res.status(400).end();
                            return;
                        }

                        if (displayNameExists) {
                            res.statusMessage = 'Display name already exists';
                            res.status(400).end();
                            return;
                        }

                        const newAccount = new Account(email, displayName as string, hashedPassword);
                        roleRepository.findOneBy({ id: 1 }).then((role) => {
                            if (role) {
                                newAccount.role = role;
                                repository
                                    .save(newAccount)
                                    .then(() => {
                                        res.status(201).json({ msg: 'Account created' });
                                        return;
                                    })
                                    .catch((error) => {
                                        res.statusMessage = 'Something went wrong when saving account details';
                                        res.status(400).json({ error: error }).end();
                                        return;
                                    });
                            } else {
                                res.statusMessage = 'Role not found';
                                res.status(400).end();
                                return;
                            }
                        });
                    });
                });
            })
            .catch((error) => {
                res.statusMessage = 'Something went wrong when hashing password';
                res.status(400).json({ error: error }).end();
                return;
            });
    } else {
        const email = body.email ? body.email : 'undefined';
        const displayName = body.displayName ? body.displayName : 'undefined';
        const password = body.password ? body.password : 'undefined';
        res.statusMessage = 'Missing parameters';
        res.status(400)
            .json({
                parameters: { email: email, displayName: displayName, password: password },
            })
            .end();
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
            return;
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
                            return;
                        } else {
                            bcrypt
                                .compare(password, account.passwordHash)
                                .then((validPass) => {
                                    if (account.role) {
                                        if (validPass) {
                                            const accessToken = jwt.sign(
                                                {
                                                    email: account.email,
                                                    role: account.role.id,
                                                    displayName: account.displayName,
                                                },
                                                secretToken,
                                                { expiresIn: 2629800000 },
                                            );
                                            res.json({ accessToken: accessToken });
                                        } else {
                                            res.statusMessage = 'Invalid password or email';
                                            res.status(400).end();
                                            return;
                                        }
                                    } else {
                                        res.statusMessage = 'Invalid account, contact website administrator';
                                        res.status(400).end();
                                        return;
                                    }
                                })
                                .catch((err) => {
                                    console.log('error: ' + err);
                                    res.statusMessage = 'Something went wrong while checking the password';
                                    res.status(400).end();
                                    return;
                                });
                        }
                    } else {
                        res.statusMessage = 'Invalid password or email';
                        res.status(400).end();
                        return;
                    }
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

userRoute.post('/verify', (req, res) => {
    const body = req.body;
    if (body.token) {
        verifyToken(body.token, (error, decoded) => {
            tokenRepository.findOneBy({ token: body.token }).then((token) => {
                if (token) {
                    res.statusMessage = 'Invalid token';
                    res.status(400).end();
                }
            });
            if (error) {
                res.statusMessage = 'Invalid token';
                res.status(400).end();
                return;
            }
            if (decoded) {
                repository.findOneBy({ email: (decoded as JwtPayload).email }).then((account) => {
                    if (account) {
                        res.status(200).json({
                            displayName: account.displayName,
                            profilePicture: account.profilePicture,
                        });
                    } else {
                        res.statusMessage = 'Invalid token';
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
    } else {
        res.status(400).end();
        return;
    }
});

userRoute.post('/update', (req, res) => {
    const token = req.body.token;
    const password = req.body.password;

    if (token && password) {
        verifyToken(token, (error, decoded) => {
            if (error) {
                res.statusMessage = 'Invalid token';
                res.status(400).json({ error: error }).end();
                return;
            }
            if (decoded) {
                if ((decoded as JwtPayload).email) {
                    const email = (decoded as JwtPayload).email;
                    const accountBody = req.body.account;
                    if (accountBody) {
                        repository.findOneBy({ email: email }).then((account) => {
                            if (account) {
                                bcrypt.compare(password, account.passwordHash).then((validPass) => {
                                    if (validPass) {
                                        if (accountBody.displayName) {
                                            repository
                                                .findOneBy({ displayName: accountBody.displayName })
                                                .then((account) => {
                                                    if (account) {
                                                        if (account.email === email) {
                                                            if (accountBody.profilePicture) {
                                                                account.profilePicture =
                                                                    accountBody.profilePicture as string;
                                                            }
                                                            if (accountBody.leaderboardParticipation) {
                                                                if (accountBody.leaderboardParticipation as boolean) {
                                                                    account.leaderboardParticipation = 1;
                                                                } else {
                                                                    account.leaderboardParticipation = 0;
                                                                }
                                                            }
                                                            if (accountBody.password) {
                                                                if (
                                                                    passwordPattern.test(accountBody.password as string)
                                                                ) {
                                                                    bcrypt
                                                                        .hash(accountBody.password as string, 10)
                                                                        .then((hash) => {
                                                                            account.passwordHash = hash;
                                                                            repository
                                                                                .save(account)
                                                                                .then(() => {
                                                                                    res.status(200).json({
                                                                                        msg: 'Account updated',
                                                                                    });
                                                                                    return;
                                                                                })
                                                                                .catch(() => {
                                                                                    res.statusMessage =
                                                                                        'Something went wrong while updating the account';
                                                                                    res.status(500).end();
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
                                                                        res.status(200).json({
                                                                            msg: 'Account updated',
                                                                        });
                                                                        return;
                                                                    })
                                                                    .catch((err) => {
                                                                        console.log(error);
                                                                        res.statusMessage =
                                                                            'Something went wrong while updating the account';
                                                                        res.status(500).json({ msg: err }).end();
                                                                        return;
                                                                    });
                                                            }
                                                        } else {
                                                            res.statusMessage = 'Display name already taken';
                                                            res.status(400).end();
                                                            return;
                                                        }
                                                    }
                                                });
                                            account.displayName = accountBody.displayName as string;
                                        }
                                    } else {
                                        res.statusMessage = 'Invalid password';
                                        res.status(400).end();
                                        return;
                                    }
                                });
                            } else {
                                res.statusMessage = 'Account not found';
                                res.status(404).end();
                                return;
                            }
                        });
                    } else {
                        res.statusMessage = 'Missing parameter: account';
                        res.status(400).end();
                        return;
                    }
                } else {
                    res.statusMessage = 'Invalid token';
                    res.status(400).end();
                    return;
                }
            }
        });
    } else if (!token && password) {
        res.statusMessage = 'Missing parameter: token';
        res.status(400).end();
        return;
    } else if (token && !password) {
        res.statusMessage = 'Missing parameter: password';
        res.status(400).end();
        return;
    } else {
        res.statusMessage = 'Missing parameters: token & password';
        res.status(400).end();
        return;
    }
});

userRoute.post('/logout', (req, res) => {
    const token = req.body.token;
    if (token) {
        verifyToken(token, (error, decoded) => {
            if (decoded) {
                tokenRepository.findOneBy({ token: token }).then((existingToken) => {
                    if (!existingToken) {
                        repository.findOneBy({ email: (decoded as JwtPayload).email }).then((account) => {
                            if (account) {
                                const tokenEntity = new Token(req.body.token, account);
                                tokenRepository.insert(tokenEntity).then((savedToken) => {
                                    if (savedToken) {
                                        res.statusMessage = 'Logged out';
                                        res.status(200).json({ msg: 'Logged Out' }).end();
                                        return;
                                    } else {
                                        res.statusMessage = 'Something went wrong while logging out';
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
                    } else {
                        res.statusMessage = 'Invalid token';
                        res.status(400).end();
                        return;
                    }
                });
            } else {
                res.statusMessage = 'Invalid token';
                res.status(400).json({ error: error }).end();
                return;
            }
        });
    } else {
        res.statusMessage = 'Missing parameters';
        res.status(400).end();
        return;
    }
});

userRoute.post('/upload-image', (req, res) => {
    const uploadFolder = path.join(__dirname, '../../', 'public', 'images');

    const form = new formidable.IncomingForm({ uploadDir: uploadFolder });

    form.parse(req, (err, fields, files) => {
        if (err) {
            console.log(err);
            res.statusMessage = 'Something went wrong';
            res.status(500).end();
            return;
        }
        if (files && fields) {
            if (files.image && fields.token) {
                const token = fields.token as string;
                verifyToken(token, (error, decoded) => {
                    if (error) {
                        res.statusMessage = 'Invalid token';
                        res.status(400).end();
                        return;
                    }
                    if (decoded) {
                        if ((decoded as JwtPayload).email) {
                            const email = (decoded as JwtPayload).email;
                            let image: formidable.File;
                            if (files.image instanceof Array) {
                                image = files.image[0] as formidable.File;
                            } else {
                                image = files.image as formidable.File;
                            }
                            if (image) {
                                if (image.mimetype) {
                                    const fileEnding = image.mimetype.split('/')[1];
                                    repository.findOneBy({ email: email }).then((account) => {
                                        if (account) {
                                            if (account.id) {
                                                const newPath = path.join(uploadFolder, account.id + '.' + fileEnding);
                                                if (account.profilePicture === '') {
                                                    fs.rename(
                                                        image.filepath,
                                                        path.join(uploadFolder, account.id + '.' + fileEnding),
                                                        () => {
                                                            account.profilePicture =
                                                                'images/' + account.id + '.' + fileEnding;

                                                            repository
                                                                .save(account)
                                                                .then(() => {
                                                                    res.status(200)
                                                                        .json({ image: account.profilePicture })
                                                                        .end();
                                                                    return;
                                                                })
                                                                .catch((err) => {
                                                                    console.error(err);
                                                                    res.statusMessage = 'Something went wrong';
                                                                    res.status(500).end();
                                                                    return;
                                                                });
                                                        },
                                                    );
                                                    res.status(200).end();
                                                    return;
                                                } else {
                                                    fs.rm('public\\' + account.profilePicture, (err) => {
                                                        if (err) {
                                                            console.log(err);
                                                            res.statusMessage = 'Could not remove file';
                                                            res.status(500).end();
                                                            return;
                                                        } else {
                                                            fs.rename(image.filepath, newPath, () => {
                                                                account.profilePicture =
                                                                    'images/' + account.id + '.' + fileEnding;

                                                                repository
                                                                    .save(account)
                                                                    .then(() => {
                                                                        res.status(200)
                                                                            .json({ image: account.profilePicture })
                                                                            .end();
                                                                        return;
                                                                    })
                                                                    .catch((err) => {
                                                                        console.error(err);
                                                                        res.statusMessage = 'Something went wrong';
                                                                        res.status(500).end();
                                                                        return;
                                                                    });
                                                            });
                                                        }
                                                    });
                                                }
                                            }
                                        }
                                    });
                                }
                            } else {
                                res.statusMessage = 'Invalid token';
                                res.status(400).end();
                                return;
                            }
                        }
                    }
                });
            } else {
                res.statusMessage = 'Something went wrong';
                res.status(500).end();
                return;
            }
        }
    });
    setTimeout(() => {
        res.statusMessage = 'Something went wrong';
        res.status(500).end();
        return;
    }, 5000);
});

userRoute.post('/delete-account', (req, res) => {
    const token = req.body.token;
    const password = req.body.password;

    verifyToken(token, (error, decoded) => {
        if (token && password) {
            if (error) {
                res.statusMessage = 'Invalid token';
                res.status(400).json({ error: error }).end();
                return;
            }
            if (decoded) {
                if ((decoded as JwtPayload).email) {
                    const email = (decoded as JwtPayload).email;
                    const accountBody = req.body.account;
                    if (accountBody) {
                        repository.findOneBy({ email: email }).then((account) => {
                            if (account) {
                                bcrypt.compare(password, account.passwordHash).then((validPass) => {
                                    if (validPass) {
                                        repository.delete(account).then(() => {
                                            res.status(200).json({ msg: 'Account deleted' });
                                            return;
                                        });
                                    } else {
                                        res.statusMessage = 'Invalid password';
                                        res.status(400).end();
                                        return;
                                    }
                                });
                            } else {
                                res.statusMessage = 'Account not found';
                                res.status(404).end();
                                return;
                            }
                        });
                    } else {
                        res.statusMessage = 'Missing parameter: account';
                        res.status(400).end();
                        return;
                    }
                } else {
                    res.statusMessage = 'Invalid token';
                    res.status(400).end();
                    return;
                }
            }
        }
    });
});
