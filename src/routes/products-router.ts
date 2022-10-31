import {Request, Response, Router} from "express";
import {inputValidationMiddleware} from "../middlewares/input-validation-middleware";
import {productsSchema} from "../schema/products-schema";
import {ProductType} from "../repositories/db";
import {productsService} from "../domain/product-service";

export const productsRouter = Router({});

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

});