import { Router } from 'express';

export const defaultRoute = Router();

defaultRoute.get('/', (_req, res) => {
    res.send('What\'s up doc ?!');
});
