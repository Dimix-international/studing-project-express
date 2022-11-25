import {Router} from "express";
import {container} from "../composition-root";
import {AuthController} from "./controllers/auth-controller";

const authController = container.resolve(AuthController);

export const authRouter = Router({});

authRouter.post('/login', authController.login.bind(authController));

authRouter.post('/registration', authController.registration.bind(authController));

authRouter.post('/confirm-email', authController.confirmEmail.bind(authController));

//для восстановления пароля => получаем email, генерируем recoveryPasswordCode
// и считаем кол-во попыток и зашиваем в код id пользователя  (на подобие как confirm с expire датой)
// => после отправляем по почте recoveryPasswordCode, с сылкой, на которую пользователь нажимает =>
// поподает на страницу восстановления пароля где в query зашит этот код
// => после фронт отправляет этот код на бэк (удостовер что код валидный) вместе с новым паролем
//и если recoveryPasswordCode будет неправильный например 5 раз то можем заблокировать восстановления
//так же можем трэкать кол-во запросов на количество восстановления пароля

authRouter.post('/reset-registration-code', authController.resetRegistrationCode.bind(authController));

//при JWT МОЖНО СОХРАНЯТЬ ДАННЫЕ о device с которого пользов зашел, ip адрес например
//refresh токен храним в куках с флагом http only

//можно в бд не хранить refresh token, делать его в формате JWT, проверять когда он сдохнет и записывать его в бд в black list
// можно хранить его в бд, хранить дату его expires, когда он выдохнется удалять его