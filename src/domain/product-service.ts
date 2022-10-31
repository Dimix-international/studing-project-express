import {productsRepository} from "../repositories/products-db-repository";
import {ProductType} from "../repositories/db";

//бизнес слой -  не работает с бд

export const productsService = {
    async findProducts (searchTerm: string | null): Promise<ProductType[]> {
        return productsRepository.findProducts(searchTerm);
    },

    async createProduct (title: string): Promise<ProductType> {
        const newProduct = {
            id: String(Math.random()),
            title,
        }
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
};