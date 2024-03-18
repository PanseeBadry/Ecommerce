import  express  from "express";

import { allowTo, protectedRoutes } from "../auth/auth.controller.js";
import { addToWishlistSchema, getWishlistByIdSchema } from "./controller/wishlist.validator.js";
import { addProductToWishlist, getAllProductsInWishlist, removeFromWishlist } from "./controller/wishlist.controller.js";
import { validation } from "../../middleware/validation.js";

export const wishlistRoutes = express.Router()


wishlistRoutes.route("/")
.patch(protectedRoutes,allowTo('User'),validation(addToWishlistSchema),addProductToWishlist)
.get(protectedRoutes,allowTo('User'),getAllProductsInWishlist)


wishlistRoutes.route("/:id")
.delete(protectedRoutes,allowTo('User','admin'),validation(getWishlistByIdSchema),removeFromWishlist)




