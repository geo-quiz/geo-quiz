import express from 'express';
import { defaultRoute } from './defaultRoute';
import { quizRoute } from './quiz';
import { userRoute } from './user';
import { leaderBoardRoute } from './leaderboard';
import { scoreRoute } from './score';

export const routes = express.Router();

routes.use(defaultRoute);
routes.use(quizRoute);
routes.use(userRoute);
routes.use(leaderBoardRoute);
routes.use(scoreRoute);
