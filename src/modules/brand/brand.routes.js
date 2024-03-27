import  express  from "express";
import { validation } from "../../middleware/validation.js";

import { uploadSingle } from "../../utilis/fileUpload.js";
import { addBrand, deleteBrand, getAllBrands, getBrandById, updateBrand } from "./controller/brand.controller.js";
import { addBrandSchema, getBrandByIdSchema, updateBrandSchema } from "./controller/brand.validator.js";
import { allowTo, protectedRoutes } from "../auth/auth.controller.js";

export const brandRoutes = express.Router()


brandRoutes.route("/")
.post(protectedRoutes,allowTo('admin'),uploadSingle('image'),validation(addBrandSchema),addBrand)
.get(getAllBrands)


brandRoutes.route("/:id")
.get(validation(getBrandByIdSchema),getBrandById)
.patch(validation(updateBrandSchema),updateBrand)
.delete(validation(getBrandByIdSchema),deleteBrand)




