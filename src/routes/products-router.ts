import {Router} from "express";
import {inputValidationMiddleware} from "../middlewares/input-validation-middleware";
import {productsSchema} from "../schema/products-schema";
import {container} from "../composition-root";
import {ProductController} from "./controllers/product-controller";


export const productsRouter = Router({});
const productsController = container.resolve(ProductController);
//классы которые хранят обработку запросов - контроллеры


productsRouter.get('/', productsController.getProducts.bind(productsController));

productsRouter.post('/',
    productsSchema,
    inputValidationMiddleware,
    productsController.createProduct.bind(productsController)
);

productsRouter.put('/:id', productsController.updateProduct.bind(productsController));
// без bind productsController.updateProduct будет вызван
// от "имени" неизвестно чего - теряем контекст т.к. productsController.updateProduct передан как
//callback

productsRouter.get('/:id', productsController.getProduct.bind(productsController));

productsRouter.delete('/:id', productsController.deleteProduct.bind(productsController));
/*

productsRouter.get('/', async (req: Request, res: Response) => {
    const products: ProductType[]  = await productsService
        .findProducts(req.query.title
            ? req.query.title.toString()
            : null);

    res.send(products);
});

productsRouter.post('/',
    productsSchema,
    inputValidationMiddleware,
    async (req: Request, res: Response) => {
        const newProduct = await productsService.createProduct(req.body.title);
        res.status(201).send(newProduct);
    });

productsRouter.put('/:id', async (req: Request, res: Response) => {
    //:productTitle - динамическая переменная - вытаскиваем req.params.productTitle
    const { id } = req.params;
    const { title } = req.body;
    const isUpdated = await productsService.updateProduct(id, title);

    if (isUpdated) {
        const product = await productsService.getProductById(id);
        res.send(product);
        return;
    }
    res.send(404);
});

productsRouter.get('/:id', async (req: Request, res: Response) => {
    //:productTitle - динамическая переменная - вытаскиваем req.params.productTitle
    const { id } = req.params;
    const product = await productsService.getProductById(id);
    res.send(product ?? 404);
});

productsRouter.delete('/:id', async (req: Request, res: Response) => {
    const { id } = req.params;
    const isDeletedProduct = await productsService.deleteProductById(id)
    res.send(isDeletedProduct ? 204 : 404);

});*/
