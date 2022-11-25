import bcrypt from 'bcrypt'
import {UsersRepository} from "../repositories/usersRepository";
import {UserDBType, usersCollection} from "../repositories/db";
import {ObjectId} from "mongodb";
import {emailManager} from "../managers/email-manager";
import {User} from "./classes/User";
import {inject, injectable} from "inversify";

@injectable()
export class AuthService {

    constructor(@inject(UsersRepository) protected usersRepository: UsersRepository) {}

    async checkCredentials (loginOrEmail: string, password: string) {
        const user =  await this.usersRepository.findByLoginOrEmail(loginOrEmail);

        if (!user) return false;
        if (!user.emailConfirmation.isConfirmed) return null //или вернуть ошибку

        const validPassword = await bcrypt.compare(password, user.accountData.passwordHash);
        if (validPassword) {
            return user
        }
        return false;
    }

    async createUser (login: string, email: string, password: string): Promise<UserDBType | null> {
        const passwordHash = await this._generateHash(password);

        //так же можно добавить проверку по id адрессу, чтобы заблокировать если идет множество созданий
        // или запросов на отправку писем,
        // после проверить сколько пользователь с одного ip
        //проверять количество на повторную отправку запроса на получ email

        const newUser = new User(login, email, passwordHash);

        const result = await this.usersRepository.createUser(newUser);

        try {
            await emailManager.sendEmailConfirmationMessage(newUser)
        } catch (e) {
            console.log(e);
            await this.usersRepository.deleteUser(newUser._id);
            return null;
        }

        return result;
    }

    async _generateHash(password: string) {
        return await bcrypt.hash(password, 7);
    }

    async findUserById(id: ObjectId) {
        return await usersCollection.findOne({_id: id});
    }

    async confirmEmail(code: string ): Promise<boolean> {
        const user = await this.usersRepository.findByConfirmationCode(code);

        if (!user) return false;
        if (user.emailConfirmation.isConfirmed) return false
        if (user.emailConfirmation.confirmationCode !== code) return false
        if (user.emailConfirmation.expirationDate < new Date()) return false

        return await this.usersRepository.updateConfirmation(user._id)
    }
}
