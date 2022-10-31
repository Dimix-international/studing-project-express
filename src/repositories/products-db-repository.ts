import {productCollection, ProductType} from "./db";

//работа с бд

export const productsRepository = {
    //skip и limit для пагинации
    //предположим размер страницы 4, а дать номер страницы 2 (pageNumber)
    //pageSize - limit
    // skip = (pageNumber - 1) * pageSize

/*    const results = await collection
        .aggregate([
            {
                $search: {
                    index: 'movieSearch',
                    text: {
                        query: search, //вернет все по query
                        path: {
                            wildcard: '*',
                        },
                    },
                },
            },
            {
                $project: { //вернем только title и plot
                    title: 1,
                    plot: 1,
                },
            },
        ])
        .toArray();*/

    async findProducts (searchTerm: string | null): Promise<ProductType[]> {
        return productCollection.find(
            searchTerm
                ? {title: {$regex: searchTerm}}
                : {}
        ).toArray()
    },

    async getCount (searchTerm: string | null): Promise<number> {
        return productCollection.countDocuments(
            searchTerm
                ? {title: {$regex: searchTerm}}
                : {}
        )
    },

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
    },

    async createProduct (newProduct: ProductType) {
        await productCollection.insertOne(newProduct)
    },

    async updateProduct (id: string, title: string): Promise<boolean> {

     const result = await productCollection.updateOne(
            {id},
            {$set: {title}}
        )
        return !!result.matchedCount;
    },

   async getProductById (id: string): Promise<ProductType | null> {
        return productCollection.findOne({id})
    },

   async deleteProductById (id: string): Promise<boolean> {
       const result = await productCollection.deleteOne({id});
       return !!result.deletedCount;
    },

    _getSkip (pageNumber: number, pageSize: number): number {
        return (pageNumber - 1) * pageSize
    }
};