import {ObjectId} from "mongodb";
import {v4 as uuidv4} from 'uuid';
import add from "date-fns/add";

export class User {
    _id: ObjectId;
    accountData: AccountDataType;
    emailConfirmation: EmailConfirmationType;

    constructor (public login: string, public email: string, public passwordHash: string) {
        this._id = new ObjectId();
        this.accountData = {
            email,
            createdAt: new Date(),
            userName: login,
            passwordHash
        };
        this.emailConfirmation = {
            confirmationCode: uuidv4(),
            expirationDate: add(new Date(), {
                //ключ который отправили на почту для подтверждения должен умереть через какое-то время
                hours: 1,
                minutes: 3
            }),
            isConfirmed: false
        }
    }
}

type AccountDataType = {
    email: string;
    passwordHash: string;
    userName: string;
    createdAt: Date
}

type EmailConfirmationType = {
    confirmationCode: string;
    expirationDate: Date;
    isConfirmed: boolean;
}