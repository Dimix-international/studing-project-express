import {AddressesRepository} from "../../repositories/addresses-repository";
import {Request, Response} from "express";
import {inject, injectable} from "inversify";

@injectable()
export class AddressesController {
    constructor(@inject(AddressesRepository) protected addressesRepository: AddressesRepository) {
    }

    async getAllAddresses(req: Request, res: Response) {
        const addresses = await this.addressesRepository.getAddresses();
        res.send(addresses);
    }

    async getAddressById(req: Request, res: Response) {
        const {id} = req.params;
        const address = await this.addressesRepository.getAddressById(id);
        res.send(address ?? 404);
    }
}