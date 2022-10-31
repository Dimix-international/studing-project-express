import express from 'express';
import bodyParser from "body-parser";
import { productsRouter } from "./routes/products-router";
import { addressesRouter } from "./routes/addresses-router";
import {runDb} from "./repositories/db";
import {authRouter} from "./routes/auth-router";
import {usersRouter} from "./routes/users-router";
import {feedbackRouter} from "./routes/feedbacks-router";
import {emailRouter} from "./routes/email-router";

const app = express();
const port = 3000;

//промежуточный обработчик - middleware слой
const parserMiddleware = bodyParser({}); //для обработки body у запросов
app.use(parserMiddleware);

app.use('/addresses', addressesRouter);
app.use('/products', productsRouter);
app.use('/users', usersRouter);
app.use('/auth', authRouter);
app.use('/feedbacks', feedbackRouter);
app.use('/email', emailRouter);


const startApp = async () => {

    await runDb();

    app.listen(port, () => {
        console.log(`Example app listening on port ${port}`)
    });
}

startApp();