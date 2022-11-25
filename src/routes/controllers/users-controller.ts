import {AuthService} from "../../domain/auth-service";
import {Request, Response} from "express";
import {inject, injectable} from "inversify";

@injectable()
export class UsersController {

    constructor(@inject(AuthService) protected authService: AuthService) {
    }

    async createUser(req: Request, res: Response) {
        const newUser = await this.authService.createUser(req.body.login, req.body.email, req.body.password);
        if (newUser) {
            res.status(201).send(newUser);
        } else {
            res.sendStatus(400);
        }
    }
}