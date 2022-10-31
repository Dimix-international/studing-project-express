import {UserDBType} from "../repositories/db";

//расширяем тип Express
declare global {
    declare namespace Express {
        export interface Request {
            user: UserDBType | null
        }
    }
}