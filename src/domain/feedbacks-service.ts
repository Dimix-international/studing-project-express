import {ObjectId} from "mongodb";
import {feedbackRepository} from "../repositories/feedback-repository";


export const feedbacksService = {
    async allFeedbacks() {
        return feedbackRepository.getAllFeedbacks();
    },
    async sendFeedback (comment: string, userId: ObjectId) {
        return feedbackRepository.createFeedback(comment, userId)
    },
}