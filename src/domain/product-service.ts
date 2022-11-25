import {ProductsAdminRepository, ProductsRepository} from "../repositories/products-db-repository";
import {ProductType} from "../repositories/db";
import {ProductDB} from "./type";
import {inject, injectable} from "inversify";


//бизнес слой -  не работает с бд

@injectable()
export class ProductService {

    constructor(@inject(ProductsRepository) protected productsRepository: ProductsRepository,
                @inject(ProductsAdminRepository) protected productsAdminRepository: ProductsAdminRepository
    ) {}

    async findProducts (searchTerm: string | null): Promise<ProductType[]> {
        return this.productsRepository.findProducts(searchTerm);
    }

    async createProduct (title: string): Promise<ProductType> {
        const newProduct = new ProductDB(String(Math.random()), title);

        await this.productsRepository.createProduct(newProduct);
        return newProduct;
    }

    async updateProduct (id: string, title: string): Promise<boolean> {
        return this.productsRepository.updateProduct(id, title);
    }

    async getProductById (id: string): Promise<ProductType | null> {
        return this.productsRepository.getProductById(id);
    }

    async deleteProductById (id: string): Promise<boolean> {
        return this.productsRepository.deleteProductById(id);
    }
}
//export const productsService = new ProductService();
/*
export const productsService = {
    async findProducts (searchTerm: string | null): Promise<ProductType[]> {
        return productsRepository.findProducts(searchTerm);
    },

    async createProduct (title: string): Promise<ProductType> {

        const newProduct = new ProductDB(String(Math.random()), title);

        await productsRepository.createProduct(newProduct);
        return newProduct;
    },

    async updateProduct (id: string, title: string): Promise<boolean> {
       return productsRepository.updateProduct(id, title);
    },

    async getProductById (id: string): Promise<ProductType | null> {
        return productsRepository.getProductById(id);
    },

    async deleteProductById (id: string): Promise<boolean> {
        return productsRepository.deleteProductById(id);
    }
};*/
