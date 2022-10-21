import express from 'express';
import cors from 'cors';
import { routes } from './routes';
import bodyParser from 'body-parser';
import 'reflect-metadata';
import dotenv from 'dotenv';

const app = express();

dotenv.config();

const token = process.env.SECRET_TOKEN_SECRETS as string;

// routes
app.use(cors());
app.use(bodyParser.json());
app.use('/', routes);

// start the server if there is a valid token
if (token) {
    app.listen(3000, () => {
        console.log('Server running : http://localhost:3000');
    });
} else {
    console.error('No token provided');
    process.exit(1);
}
