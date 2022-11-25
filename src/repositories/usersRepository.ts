import {UserDBType, usersCollection} from "./db";
import {ObjectId} from "mongodb";
import {injectable} from "inversify";

@injectable()
export class UsersRepository {
    async getAllUser () {
        return await usersCollection
            .find()
            .sort('createdAt', -1)
            .toArray()
    }
    async findByLoginOrEmail (loginOrEmail: string) {
        return await usersCollection.findOne({
            $or: [
                {email: loginOrEmail},
                {userName: loginOrEmail}
            ]
        })
    }
    async findByConfirmationCode (confirmationCode: string) {
        return await usersCollection.findOne({'emailConfirmation.confirmationCode': confirmationCode})
    }
    async createUser(user: UserDBType) {
        await usersCollection.insertOne(user);
        return user;
    }
    async findUserById(id: ObjectId) {
        return await usersCollection.findOne({_id: id});
    }
    async deleteUser(id: ObjectId) {
        return await usersCollection.deleteOne({_id: id});
    }
    async updateConfirmation (_id: ObjectId) {
        const result = await usersCollection.updateOne(
            {_id},
            { $set: {'emailConfirmation.isConfirmed': true}} //обвновляем св-во влож объекта
        );
        return result.modifiedCount === 1;
    }
}

