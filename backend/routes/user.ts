import { Router } from 'express';


const baseUrl = '/user';

export const userRoute = Router();

//routes
userRoute.get(baseUrl, (_req, res) => {
    res.json({username: 'gertrud'});

});

