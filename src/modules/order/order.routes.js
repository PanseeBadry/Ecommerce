import  express  from "express";

import { allowTo, protectedRoutes } from "../auth/auth.controller.js";
import { validation } from "../../middleware/validation.js";
import { createCashOrder, createCheckOutSession, getAllOrders, getSpecificOrder } from "./controller/order.controller.js";
import { createOrderSchema  } from "./controller/order.validator.js";

export const orderRoutes = express.Router()


orderRoutes.route("/")
.get(protectedRoutes,allowTo('User'),getSpecificOrder)
orderRoutes.get("/getAllOrders",protectedRoutes,allowTo('admin'),getAllOrders)



orderRoutes.route("/:id")
.post(protectedRoutes,allowTo('User'),validation(createOrderSchema),createCashOrder)
orderRoutes.post("/checkout/:id",protectedRoutes,allowTo('User'),validation(createOrderSchema),createCheckOutSession)
// .get(protectedRoutes,allowTo('admin'),validation(getSpecificOrderSchema),getSpecificOrder)




