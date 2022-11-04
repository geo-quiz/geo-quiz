import express from 'express';
import cors from 'cors';
import { routes } from './routes';
import bodyParser from 'body-parser';
import 'reflect-metadata';
import dotenv from 'dotenv';
import * as fs from 'fs';

const app = express();

dotenv.config();

const token = process.env.SECRET_TOKEN_SECRETS as string;

// routes
app.use(cors());
app.use(express.static('public'));
app.use(bodyParser.json());
app.use('/', routes);

// start the server if there is a valid token
if (token) {
    app.listen(3000, () => {
        console.log('Server running : http://localhost:3000');
        removeUnusedImages();

        //Remove unused images every hour
        setTimeout(removeUnusedImages, 1000 * 60 * 60);
    });
} else {
    console.error('No token provided');
    process.exit(1);
}

function removeUnusedImages() {
    fs.readdir('public/images', (err, files) => {
        if (err) {
            console.error(err);
            return;
        }
        if (files) {
            files.forEach((file) => {
                if (file !== 'default.svg') {
                    fs.rm(`public/images/${file}`, (err) => {
                        if (err) {
                            console.error(err);
                        }
                    });
                }
            });
        }
    });
}
