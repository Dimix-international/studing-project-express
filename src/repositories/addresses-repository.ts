import {addressCollection, AddressType} from "./db";
import {injectable} from "inversify";

@injectable()
export class AddressesRepository {
    getAddresses (): Promise<AddressType[]> {
        return addressCollection.find({}).toArray();
    }
    getAddressById (id: string) {
        return addressCollection.findOne({
            id
        });
    }
}
