import {UserDBType} from "../repositories/db";
import jwt from 'jsonwebtoken';
import {settings} from "../settings";
import {ObjectId} from "mongodb";

export const jwtService = {
    async createJWT (user: UserDBType) {
        return jwt.sign(
            {userId: user._id},
            settings.JWT_SECRET,
            {expiresIn: '1h'}
        )
    },

    async getUserIdByToken(token: string) {
        try {
           const result:any = jwt.verify(token, settings.JWT_SECRET); //одновременно декодирует
           return new ObjectId(result.userId);
        } catch (e) {
            return null;
        }
    }
}