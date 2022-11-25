import {ProductService} from "../../domain/product-service";
import {Request, Response} from "express";
import {ProductType} from "../../repositories/db";
import {inject, injectable} from "inversify";


@injectable()
export class ProductController {

    constructor(@inject(ProductService) protected productsService: ProductService) {
        //контроллер не парится какой есрвис придет - главное чтобы подходил по св-вам
        //dependency injection через конструктор - явно показываем что сервис зависит от св-ва
    }

    async getProducts(req: Request, res: Response) {
        const products: ProductType[] = await this.productsService
            .findProducts(req.query.title
                ? req.query.title.toString()
                : null);

        res.send(products);
    }

    async createProduct(req: Request, res: Response) {
        const newProduct = await this.productsService.createProduct(req.body.title);
        res.status(201).send(newProduct);
    }

    async updateProduct(req: Request, res: Response) {
        //:productTitle - динамическая переменная - вытаскиваем req.params.productTitle
        const {id} = req.params;
        const {title} = req.body;
        const isUpdated = await this.productsService.updateProduct(id, title);

        if (isUpdated) {
            const product = await this.productsService.getProductById(id);
            res.send(product);
            return;
        }
        res.send(404);
    }

    async getProduct(req: Request, res: Response) {
        //:productTitle - динамическая переменная - вытаскиваем req.params.productTitle
        const {id} = req.params;
        const product = await this.productsService.getProductById(id);
        res.send(product ?? 404);
    }

    async deleteProduct(req: Request, res: Response) {
        const {id} = req.params;
        const isDeletedProduct = await this.productsService.deleteProductById(id)
        res.send(isDeletedProduct ? 204 : 404);

    }
}