import {Request, Response, Router} from "express";
import {jwtService} from "../application/jwt-service";
import {authService} from "../domain/auth-service";


export const authRouter = Router({});

authRouter.post('/login', async (req: Request, res: Response) => {
    const user = await authService.checkCredentials(
        req.body.loginOrEmail,
        req.body.password
    );
    if (user) {
        const token = await jwtService.createJWT(user);
        res.status(200).send(token);
    } else {
        res.sendStatus(401);
    }
});

authRouter.post('/registration', async (req: Request, res: Response) => {
    const {login, email, password} = req.body;
    const user = await authService.createUser(login, email ,password);
    if (user) {
        res.status(201).send(user);
    } else {
        res.sendStatus(500);
    }
});

authRouter.post('/confirm-email', async (req: Request, res: Response) => {
    const {code, email} = req.body;
    const result = await authService.confirmEmail(code);
    if (result) {
        res.sendStatus(201);
    } else {
        res.sendStatus(400);
    }
});

//для восстановления пароля => получаем email, генерируем recoveryPasswordCode
// и считаем кол-во попыток и зашиваем в код id пользователя  (на подобие как confirm с expire датой)
// => после отправляем по почте recoveryPasswordCode, с сылкой, на которую пользователь нажимает =>
// поподает на страницу восстановления пароля где в query зашит этот код
// => после фронт отправляет этот код на бэк (удостовер что код валидный) вместе с новым паролем
//и если recoveryPasswordCode будет неправильный например 5 раз то можем заблокировать восстановления
//так же можем трэкать кол-во запросов на количество восстановления пароля

authRouter.post('/reset-registration-code', async (req: Request, res: Response) => {
    //отправить письмо еще раз, если вдруг не пришло
/*    const {code, email} = req.body;
    const result = await authService.confirmEmail(code);
    if (result) {
        res.sendStatus(201);
    } else {
        res.sendStatus(400);
    }*/
});