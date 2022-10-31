import bcrypt from 'bcrypt'
import {usersRepository} from "../repositories/usersRepository";
import {UserDBType, usersCollection} from "../repositories/db";
import {ObjectId} from "mongodb";

export const usersService = {
    async checkCredentials (loginOrEmail: string, password: string) {
        const user =  await usersRepository.findByLoginOrEmail(loginOrEmail);
        if (!user) return false;
        const validPassword = await bcrypt.compare(password, user.passwordHash);
        if (validPassword) {
            return user
        }
        return false;
    },
    async createUser (login: string, email: string, password: string) {
        const passwordHash = await this._generateHash(password);

        const newUser: UserDBType = {
            email,
          //  passwordSalt,
            passwordHash,
            userName: login,
            _id: new ObjectId(),
            createdAt: new Date()
        };

        return usersRepository.createUser(newUser);
    },
    async _generateHash(password: string) {
        return await bcrypt.hash(password, 7);
    },
    async findUserById(id: ObjectId) {
        return await usersCollection.findOne({_id: id});
    }
}