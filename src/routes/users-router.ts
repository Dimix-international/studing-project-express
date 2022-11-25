import {Router} from "express";
import {container} from "../composition-root";
import {UsersController} from "./controllers/users-controller";

const usersController = container.resolve(UsersController);
export const usersRouter = Router({});

usersRouter.post('/', usersController.createUser.bind(usersController));