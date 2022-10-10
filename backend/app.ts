import express from 'express';
import { routes } from './routes';
import 'reflect-metadata';

const app = express();

// routes
app.use('/', routes);

// start the server
app.listen(3000, () => {
    console.log('server running : http://localhost:3000');
});
