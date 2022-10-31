import {emailManager} from "../managers/email-manager";

export const businessService = {
    async doOperation () {
        //просто пример бизнес логики в конце отправка email
        //save user
        //get user from repo
        //send email
        await emailManager.sendPasswordRecoveryMessage({email: 'dima.dimix94@mail.ru'})
    }
}