import { DataSource } from 'typeorm';
import { Question } from './entities/Question';
import { Continent } from './entities/Continent';
import { Answer } from './entities/Answer';
import dotenv from 'dotenv';

dotenv.config();

const dbHost = process.env.DB_HOST || 'localhost';
const port = process.env.DB_PORT || '3306';
const username = process.env.DB_USERNAME || 'root';
const password = process.env.DB_PASSWORD || '';
const database = process.env.DATABASE || '';

export const AppDataSource = new DataSource({
    type: 'mysql',
    host: dbHost,
    port: Number.parseInt(port),
    username: username,
    password: password,
    database: database,
    entities: [Question, Continent, Answer],
    synchronize: true,
    logging: false,
});

AppDataSource.initialize()
    .then(() => {
        console.log('Database connection established');
    })
    .catch((error) => {
        console.log(dbHost);
        console.log(port);
        console.log(username);
        console.log(password);
        console.log(database);
        console.log(error);
    });
