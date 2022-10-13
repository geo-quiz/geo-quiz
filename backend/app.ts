import express from 'express';
import cors from 'cors';
import { routes } from './routes';
import bodyParser from 'body-parser';
import 'reflect-metadata';

const app = express();

// routes
app.use(cors());
app.use(bodyParser.json());
app.use('/', routes);

// start the server
app.listen(3000, () => {
    console.log('Server running : http://localhost:3000');
});
