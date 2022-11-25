import {FeedbacksService} from "../../domain/feedbacks-service";
import {Request, Response} from "express";
import {inject, injectable} from "inversify";

@injectable()
export class FeedbacksController {

    constructor(@inject(FeedbacksService) protected feedbacksService: FeedbacksService) {}

    async createFeedback(req: Request, res: Response) {
        //user добавит authMiddleware
        const newProduct = await this.feedbacksService.sendFeedback(req.body.comment, req.user!._id);
        res.status(201).send(newProduct);
    }

    async getFeedbacks(req: Request, res: Response) {
        const users = await this.feedbacksService.allFeedbacks();
        res.send(users);
    }
}