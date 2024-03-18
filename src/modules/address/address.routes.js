import  express  from "express";

import { allowTo, protectedRoutes } from "../auth/auth.controller.js";
import { validation } from "../../middleware/validation.js";
import { addAddressSchema, getAddressByIdSchema } from "./controller/address.validator.js";
import { addAddress, getAllAddressess, removeAddress } from "./controller/address.controller.js";

export const addressRoutes = express.Router()


addressRoutes.route("/")
.patch(protectedRoutes,allowTo('User'),validation(addAddressSchema),addAddress)
.get(protectedRoutes,allowTo('User'),getAllAddressess)


addressRoutes.route("/:id")
.delete(protectedRoutes,allowTo('User','admin'),validation(getAddressByIdSchema),removeAddress)




