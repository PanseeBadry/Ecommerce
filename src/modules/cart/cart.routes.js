import  express  from "express";

import { allowTo, protectedRoutes } from "../auth/auth.controller.js";
import { validation } from "../../middleware/validation.js";
import { addToCartSchema, getCartByIdSchema, updateQuantitySchema } from "./controller/cart.validator.js";
import { addToCart, applyCoupon, getUserCart, removeCart, removeItemFromCart, updateQuantity } from "./controller/cart.controller.js";

export const cartRoutes = express.Router()


cartRoutes.route("/")
.post(protectedRoutes,allowTo('User'),validation(addToCartSchema),addToCart)
.get(protectedRoutes,allowTo('User'),getUserCart)
.delete(protectedRoutes,allowTo('User','admin'),removeCart)

cartRoutes.route("/applyCoupon").post(protectedRoutes,allowTo('User'),applyCoupon)
cartRoutes.route("/:id")
.delete(protectedRoutes,allowTo('User','admin'),validation(getCartByIdSchema),removeItemFromCart)

.patch(protectedRoutes,allowTo('User'),validation(updateQuantitySchema),updateQuantity)



