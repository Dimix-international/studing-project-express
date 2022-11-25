import {productCollection, ProductType} from "./db";
import {injectable} from "inversify";


@injectable()
export class ProductsAdminRepository {}

//работа с бд
@injectable()
export class ProductsRepository {
    //skip и limit для пагинации
    //предположим размер страницы 4, а дать номер страницы 2 (pageNumber)
    //pageSize - limit
    // skip = (pageNumber - 1) * pageSize

    async findProducts (searchTerm: string | null): Promise<ProductType[]> {
        return productCollection.find(
            searchTerm
                ? {title: {$regex: searchTerm}}
                : {}
        ).toArray()
    }

    async getCount (searchTerm: string | null): Promise<number> {
        return productCollection.countDocuments(
            searchTerm
                ? {title: {$regex: searchTerm}}
                : {}
        )
    }

    async findProductsWithAggregate(searchTerm: string | null) {

        const result =  productCollection.aggregate([
            { $facet:
                    {
                        result: [
                            {
                                $match: {
                                    title:searchTerm ? {$regex: searchTerm} : { $ne: null }
                                },
                            },
                            //skip and limit here
                            {
                                $skip: 0,
                            },
                            {
                                $limit: 2,
                            },
                            {
                                $project: {
                                    _id: 0,
                                    id: 1,
                                    title: 1,
                                }
                            },
                        ],
                        count: [
                            {
                                $match: {
                                    title:searchTerm ? {$regex: searchTerm} : { $ne: null }
                                },
                            },
                            {
                                $count: 'count'
                            }]
                    }
            }
        ]);
        return result.toArray();
    }

    async createProduct (newProduct: ProductType) {
        await productCollection.insertOne(newProduct)
    }

    async updateProduct (id: string, title: string): Promise<boolean> {

        const result = await productCollection.updateOne(
            {id},
            {$set: {title}}
        )
        return !!result.matchedCount;
    }

    async getProductById (id: string): Promise<ProductType | null> {
        return productCollection.findOne({id})
    }

    async deleteProductById (id: string): Promise<boolean> {
        const result = await productCollection.deleteOne({id});
        return !!result.deletedCount;
    }

    _getSkip (pageNumber: number, pageSize: number): number {
        return (pageNumber - 1) * pageSize
    }
}

//export const productsRepository = new ProductsRepository();