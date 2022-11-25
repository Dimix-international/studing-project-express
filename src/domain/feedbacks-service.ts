import {ObjectId} from "mongodb";
import {FeedbackRepository} from "../repositories/feedback-repository";
import {inject, injectable} from "inversify";

@injectable()
export class FeedbacksService {
 /*   private feedbackRepository: FeedbackRepository

    constructor(protected feedbackRepository: FeedbackRepository) {
        this.feedbackRepository = new FeedbackRepository();
    }*/

    constructor(@inject(FeedbackRepository) protected feedbackRepository: FeedbackRepository) {}


    async allFeedbacks() {
        return this.feedbackRepository.getAllFeedbacks();
    }
    async sendFeedback (comment: string, userId: ObjectId) {
        return this.feedbackRepository.createFeedback(comment, userId)
    }
}
