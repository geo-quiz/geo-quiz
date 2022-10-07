import express, {Application, Router} from "express";
import questions from '../questions.json';


const baseUrl = '/quiz';

//route
export const quizRoute = Router();

quizRoute.get(baseUrl, (_req, res) => {
    res.json(questions);
});


quizRoute.get('/quiz/:id', (req, res) => {
    const quiz = req.params.id;
    const quizItem = questions.questions.filter(quizId => {
        return quizId.id.toString() === quiz;
    });

    if (quizItem.length >0){
        res.json(quizItem);
    } else {
        res.json({message: `quizitem ${quiz} doesn't exist`})
    }
    
});
