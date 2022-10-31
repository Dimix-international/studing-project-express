import {Request, Response, Router} from "express";
import {jwtService} from "../application/jwt-service";
import {usersService} from "../domain/users-service";



export const authRouter = Router({});

authRouter.post('/login', async (req: Request, res: Response) => {
    const user = await usersService.checkCredentials(
        req.body.loginOrEmail,
        req.body.password
    );
    if (user) {
        const token = await jwtService.createJWT(user);
        res.status(200).send(token);
    } else {
        res.sendStatus(401);
    }
})