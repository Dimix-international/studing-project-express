import bcrypt from 'bcrypt'
import {usersRepository} from "../repositories/usersRepository";
import {UserDBType, usersCollection} from "../repositories/db";
import {ObjectId} from "mongodb";
import {v4 as uuidv4} from 'uuid';
import add from 'date-fns/add';
import {emailManager} from "../managers/email-manager";

export const authService = {
    async checkCredentials (loginOrEmail: string, password: string) {
        const user =  await usersRepository.findByLoginOrEmail(loginOrEmail);

        if (!user) return false;
        if (!user.emailConfirmation.isConfirmed) return null //или вернуть ошибку

        const validPassword = await bcrypt.compare(password, user.accountData.passwordHash);
        if (validPassword) {
            return user
        }
        return false;
    },

    async createUser (login: string, email: string, password: string): Promise<UserDBType | null> {
        const passwordHash = await this._generateHash(password);

        //так же можно добавить проверку по id адрессу, чтобы заблокировать если идет множество созданий
        // или запросов на отправку писем,
        // после проверить сколько пользователь с одного ip
        //проверять количество на повторную отправку запроса на получ email

        const newUser: UserDBType = {
            _id: new ObjectId(),
            accountData: {
                email,
                passwordHash,
                userName: login,
                createdAt: new Date()
            },
            emailConfirmation: {
                confirmationCode: uuidv4(),
                expirationDate: add(new Date(), {
                    //ключ который отправили на почту для подтверждения должен умереть через какое-то время
                    hours: 1,
                    minutes: 3
                }),
                isConfirmed: false
            }
        };

        const result = await usersRepository.createUser(newUser);

        try {
            await emailManager.sendEmailConfirmationMessage(newUser)
        } catch (e) {
            console.log(e);
            await usersRepository.deleteUser(newUser._id);
            return null;
        }

        return result;
    },

    async _generateHash(password: string) {
        return await bcrypt.hash(password, 7);
    },

    async findUserById(id: ObjectId) {
        return await usersCollection.findOne({_id: id});
    },

    async confirmEmail(code: string ): Promise<boolean> {
        const user = await usersRepository.findByConfirmationCode(code);

        if (!user) return false;
        if (user.emailConfirmation.isConfirmed) return false
        if (user.emailConfirmation.confirmationCode !== code) return false
        if (user.emailConfirmation.expirationDate < new Date()) return false

        return await usersRepository.updateConfirmation(user._id)
    }
}