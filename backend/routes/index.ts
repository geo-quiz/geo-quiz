import express from 'express';
import { defaultRoute } from './defaultRoute';
import { quizRoute } from './quiz';
import { userRoute } from './user';

export const routes = express.Router();

routes.use(defaultRoute);
routes.use(quizRoute);
routes.use(userRoute);
