import "reflect-metadata";
import {ProductsAdminRepository, ProductsRepository} from "./repositories/products-db-repository";
import {ProductService} from "./domain/product-service";
import {ProductController} from "./routes/controllers/product-controller";
import {FeedbackRepository} from "./repositories/feedback-repository";
import {FeedbacksService} from "./domain/feedbacks-service";
import {FeedbacksController} from "./routes/controllers/feedbacks-controller";
import {AddressesRepository} from "./repositories/addresses-repository";
import {AddressesController} from "./routes/controllers/addresses-controller";
import {UsersRepository} from "./repositories/usersRepository";
import {AuthService} from "./domain/auth-service";
import {AuthController} from "./routes/controllers/auth-controller";
import {UsersController} from "./routes/controllers/users-controller";
import {Container} from "inversify";
//сборочный цех - создание объектов
/*
const productRepository = new ProductsRepository();
const productAdminRepository = new ProductsAdminRepository();

const productService = new ProductService(productRepository, productAdminRepository);

export const productsController = new ProductController(productService);


const feedbackRepository = new FeedbackRepository();
const feedbackService = new FeedbacksService(feedbackRepository);
export const feedbacksController = new FeedbacksController(feedbackService);

const addressesRepository = new AddressesRepository();
export const addressesController = new AddressesController(addressesRepository);

const usersRepository = new UsersRepository();
export const authService = new AuthService(usersRepository);
export const authController = new AuthController(authService);

export const usersController = new UsersController(authService);
*/
export const container = new Container();

//если кому то понадобится ProductController, создаем его
container.bind<ProductController>(ProductController).to(ProductController);
container.bind<ProductService>(ProductService).to(ProductService);
container.bind<ProductsAdminRepository>(ProductsAdminRepository).to(ProductsAdminRepository);
container.bind<ProductsRepository>(ProductsRepository).to(ProductsRepository);

container.bind<FeedbacksController>(FeedbacksController).to(FeedbacksController);
container.bind<FeedbacksService>(FeedbacksService).to(FeedbacksService);
container.bind<FeedbackRepository>(FeedbackRepository).to(FeedbackRepository);

container.bind<UsersRepository>(UsersRepository).to(UsersRepository);
container.bind<UsersController>(UsersController).to(UsersController);

container.bind<AddressesRepository>(AddressesRepository).to(AddressesRepository);
container.bind<AddressesController>(AddressesController).to(AddressesController);

container.bind<AuthService>(AuthService).to(AuthService);
container.bind<AuthController>(AuthController).to(AuthController);

