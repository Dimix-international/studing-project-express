import {Request, Response, Router} from "express";
import {addressesRepository} from "../repositories/addresses-repository";


export const addressesRouter = Router({});

addressesRouter.get('/', async (req: Request, res: Response) => {
    const addresses = await addressesRepository.getAddresses();
    res.send(addresses);
});

addressesRouter.get('/:id', async (req: Request, res: Response) => {
    const { id } = req.params;
    const address = await addressesRepository.getAddressById(id);
    res.send(address ?? 404);
});

