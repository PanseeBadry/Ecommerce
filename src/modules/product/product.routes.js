import  express  from "express";
import { validation } from "../../middleware/validation.js";

import { uploadSingle, uploadfields } from "../../utilis/fileUpload.js";
import { addProduct, deleteProduct, getAllProducts, getProductById, updateProduct } from "./controller/product.controller.js";
import { addProductSchema, getProductByIdSchema, updateProductSchema } from "./controller/product.validator.js";
import { allowTo, protectedRoutes } from "../auth/auth.controller.js";

export const productRoutes = express.Router()


productRoutes.route("/")
.post(protectedRoutes,allowTo("admin","User"),uploadfields([{name:'imageCover',maxCount:1},{name:'images',maxCount:10}]),validation(addProductSchema),addProduct)
.get(getAllProducts)



productRoutes.route("/:id")
.get(validation(getProductByIdSchema),getProductById)
.patch(uploadfields([{name:'imageCover',maxCount:1},{name:'images',maxCount:10}]),validation(updateProductSchema),updateProduct)
.delete(validation(getProductByIdSchema),deleteProduct)




