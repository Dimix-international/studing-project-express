import {Router} from "express";
import {container} from "../composition-root";
import {AddressesController} from "./controllers/addresses-controller";

const addressesController = container.resolve(AddressesController);

export const addressesRouter = Router({});

addressesRouter.get('/', addressesController.getAllAddresses.bind(addressesController));

addressesRouter.get('/:id', addressesController.getAddressById.bind(addressesController));

