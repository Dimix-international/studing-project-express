import {Router} from "express";
import {authMiddleware} from "../middlewares/auth-middleware";
import {container} from "../composition-root";
import {FeedbacksController} from "./controllers/feedbacks-controller";

const feedbacksController = container.resolve(FeedbacksController);

export const feedbackRouter = Router({});

feedbackRouter.post(
    '/',
    authMiddleware,
    feedbacksController.createFeedback.bind(feedbacksController)
)

feedbackRouter.get('/', feedbacksController.getFeedbacks.bind(feedbacksController))