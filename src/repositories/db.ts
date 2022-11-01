import {MongoClient, ObjectId} from "mongodb";
import {settings} from "../settings";

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

export type ProductType = {id: string, title: string};
export type AddressType = {id: string, value: string};
export type FeedbackType = {userId: ObjectId, comment: string};
export type UserDBType = {
    _id: ObjectId,
    accountData: {
        createdAt: Date,
        email: string,
        passwordHash: string,
        //  passwordSalt: string,
        userName: string
    },
    emailConfirmation: EmailConfirmation
}

type RegistrationData = {
    ip: string
}

type EmailConfirmation = {
    confirmationCode: string,
    expirationDate: Date,
    isConfirmed: Boolean,
  // sentEmails: SendEmailType [] //складывать отправлен письма
}

type SendEmailType = {
    sendDate: Date
}