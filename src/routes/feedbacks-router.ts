import {Request, Response, Router} from "express";
import {authMiddleware} from "../middlewares/auth-middleware";
import {feedbacksService} from "../domain/feedbacks-service";


export const feedbackRouter = Router({});

feedbackRouter.post(
    '/',
    authMiddleware,
    async (req:Request, res:Response) => {
        //user добавит authMiddleware
        const newProduct = await feedbacksService.sendFeedback(req.body.comment, req.user!._id);
        res.status(201).send(newProduct);
    }
)

feedbackRouter.get('/', async(req:Request, res:Response) => {
    const users = await feedbacksService.allFeedbacks();
    res.send(users);
})