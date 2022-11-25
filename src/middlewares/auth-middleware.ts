import {NextFunction, Request, Response} from "express";
import {jwtService} from "../application/jwt-service";
import {container} from "../composition-root";
import {AuthService} from "../domain/auth-service";

const authService = container.resolve(AuthService);

export const authMiddleware = async (req: Request, res: Response, next: NextFunction) => {


    if (!req.headers.authorization) {
        res.sendStatus(401);
        return;
    }

    const token = req.headers.authorization.split(' ')[1];

    const userId = await jwtService.getUserIdByToken(token);

    if (userId) {
        req.user = await authService.findUserById(userId);
        next();
        return;
    }
    res.sendStatus(401);
}