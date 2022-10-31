import {emailAdapter} from "../adapters/email-adapter";

export const emailManager = {
    //для работы только с сообщениями
    async sendPasswordRecoveryMessage (user:any) {
        await emailAdapter.sendEmail(
            user.email,
            'password recovery',
            "<h1>Hello guys!</h1> <div><a href=\"https://it-incubator.ru\">click me</a></div>")
    }
}