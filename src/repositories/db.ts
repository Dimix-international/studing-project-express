import {MongoClient, ObjectId} from "mongodb";
import {settings} from "../settings";


export type ProductType = {id: string, title: string};
export type AddressType = {id: string, value: string};
export type FeedbackType = {userId: ObjectId, comment: string};
export type UserDBType = {
    _id: ObjectId,
    createdAt: Date,
    email: string,
    passwordHash: string,
  //  passwordSalt: string,
    userName: string
}

const client = new MongoClient(settings.MONGO_URI);
const db = client.db("shop");

export const productCollection = db.collection<ProductType>('products');
export const addressCollection = db.collection<AddressType>('address');
export const usersCollection = db.collection<UserDBType>('users');
export const feedbacksCollection = db.collection<FeedbackType>('feedbacks');


export const runDb = async () => {
    try {
        await client.connect();
        await client.db('products').command({ping: 1});
        console.log('Connected successfully to mongo server!')
    } catch (e) {
        console.log('Was error when connected')
        await client.close();
    }
}