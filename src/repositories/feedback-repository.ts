import {feedbacksCollection} from "./db";
import {ObjectId} from "mongodb";


export const feedbackRepository = {
    async getAllFeedbacks () {
        return feedbacksCollection.find({});
    },
    async createFeedback(comment: string, userId: ObjectId) {
        return feedbacksCollection.insertOne({
            comment,
            userId
        });
    }
}