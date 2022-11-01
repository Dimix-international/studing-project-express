import {Request, Response, Router} from "express";
import {businessService} from "../domain/business-service";


export const emailRouter = Router({});

emailRouter.post('/send', async (req: Request, res: Response) => {
    //request body
    //"email": "dima.dimix94@mail.ru",
    //"message":"<h1>Hello guys!</h1> <div><a href=\"https://it-incubator.ru\">click me</a></div>",
    //"subject":"Backend lessons" - тема сообщения


  // await emailAdapter.sendEmail(req.body.email, req.body.subject, req.body.message);
   await businessService.doOperation();
   res.send({
        "email": req.body.email,
        "message": req.body.message,
        "subject": req.body.subject,
    });
})