import express from 'express';
import cors from 'cors';
import { routes } from './routes';
import bodyParser from 'body-parser';
import 'reflect-metadata';
import dotenv from 'dotenv';
import * as fs from 'fs';
import { AppDataSource } from './AppDataSource';
import { Account } from './entities/Account';
import { Leaderboard } from './entities/Leaderboard';

const app = express();

dotenv.config();

const token = process.env.SECRET_TOKEN_SECRETS as string;
let currentDate = new Date().toISOString().slice(0, 10);

// routes
app.use(cors());
app.use(express.static('public'));
app.use(bodyParser.json());
app.use('/', routes);

// start the server if there is a valid token
if (token) {
    app.listen(3000, () => {
        console.log('Server running : http://localhost:3000');

        //Remove unused images on startup and every hour
        setTimeout(() => {
            removeUnusedImages();
            setInterval(() => {
                removeUnusedImages();
            }, 1000 * 60 * 60);
        }, 5000);

        //Deletes everything in the daily leaderboards on date change
        setInterval(() => {
            if (currentDate != new Date().toISOString().slice(0, 10)) {
                clearTableIfNewDay();
                currentDate = new Date().toISOString().slice(0, 10);
            }
        }, 1000 * 60);
    });

} else {
    console.error('No token provided');
    process.exit(1);
}

function clearTableIfNewDay() {
    const repository = AppDataSource.getRepository(Leaderboard);

    repository.delete({daily: true}).then(() => {
        console.log('Cleared daily tables');
    }).catch((error) => {
        console.error(error);
    });
}

function removeUnusedImages() {
    const repository = AppDataSource.getRepository(Account);
    const accountImages: Set<string> = new Set();

    repository.find().then((accounts) => {
        accounts.forEach((account) => {
            if (account.profilePicture) {
                accountImages.add(account.profilePicture.replace('images/', ''));
            }
        });

        const imagesInUse = Array.from(accountImages);

        fs.readdir('public/images', (err, files) => {
            if (err) {
                console.error(err);
                return;
            }
            if (files) {
                files.forEach((file) => {
                    if (file !== 'default.svg' && !imagesInUse.includes(file)) {
                        console.log('Removing ', file);
                        fs.rm(`public/images/${file}`, (err) => {
                            if (err) {
                                console.error(err);
                            }
                        });
                    }
                });
            }
        });
    });
}
