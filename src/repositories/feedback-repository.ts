import {feedbacksCollection} from "./db";
import {ObjectId} from "mongodb";
import {injectable} from "inversify";

@injectable()
export class FeedbackRepository {
    async getAllFeedbacks () {
        return feedbacksCollection.find({});
    }
    async createFeedback(comment: string, userId: ObjectId) {
        return feedbacksCollection.insertOne({
            comment,
            userId
        });
    }
}
