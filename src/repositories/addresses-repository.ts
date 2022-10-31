import {addressCollection, AddressType} from "./db";


export const addressesRepository = {
    getAddresses (): Promise<AddressType[]> {
        return addressCollection.find({}).toArray();
    },
    getAddressById (id: string) {
        return addressCollection.findOne({
            id
        });
    }
}