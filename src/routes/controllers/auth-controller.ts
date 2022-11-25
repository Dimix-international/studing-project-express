import {AuthService} from "../../domain/auth-service";
import {Request, Response} from "express";
import {jwtService} from "../../application/jwt-service";
import {inject, injectable} from "inversify";


@injectable()
export class AuthController {
    constructor(@inject(AuthService) protected authService: AuthService) {
    }

    async login(req: Request, res: Response) {
        const user = await this.authService.checkCredentials(
            req.body.loginOrEmail,
            req.body.password
        );
        if (user) {
            const token = await jwtService.createJWT(user);
            res.status(200).send(token);
        } else {
            res.sendStatus(401);
        }
    }

    async registration(req: Request, res: Response) {
        const {login, email, password} = req.body;
        const user = await this.authService.createUser(login, email, password);
        if (user) {
            res.status(201).send(user);
        } else {
            res.sendStatus(500);
        }
    }

    async confirmEmail(req: Request, res: Response) {
        const {code, email} = req.body;
        const result = await this.authService.confirmEmail(code);
        if (result) {
            res.sendStatus(201);
        } else {
            res.sendStatus(400);
        }
    }

    async resetRegistrationCode(req: Request, res: Response) {
        //отправить письмо еще раз, если вдруг не пришло
        /*    const {code, email} = req.body;
            const result = await authService.confirmEmail(code);
            if (result) {
                res.sendStatus(201);
            } else {
                res.sendStatus(400);
            }*/
    }
}