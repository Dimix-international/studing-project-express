import {UserDBType, usersCollection} from "./db";
import {ObjectId} from "mongodb";


export const usersRepository = {
    async getAllUser () {
        return await usersCollection
            .find()
            .sort('createdAt', -1)
            .toArray()
    },
   async findByLoginOrEmail (loginOrEmail: string) {
      return await usersCollection.findOne({
          $or: [
              {email: loginOrEmail},
              {userName: loginOrEmail}
          ]
      })
    },
    async createUser(user: UserDBType) {
        const result = await usersCollection.insertOne(user);
        return user;
    },
    async findUserById(id: ObjectId) {
       return await usersCollection.findOne({_id: id});
    }
}