import  express  from "express";
import { validation } from "../../middleware/validation.js";

import { uploadSingle } from "../../utilis/fileUpload.js";
import { addBrand, deleteBrand, getAllBrands, getBrandById, updateBrand } from "./controller/brand.controller.js";
import { addBrandSchema, getBrandByIdSchema, updateBrandSchema } from "./controller/brand.validator.js";

export const brandRoutes = express.Router()


brandRoutes.route("/")
.post(uploadSingle('image'),validation(addBrandSchema),addBrand)
.get(getAllBrands)


brandRoutes.route("/:id")
.get(validation(getBrandByIdSchema),getBrandById)
.patch(validation(updateBrandSchema),updateBrand)
.delete(validation(getBrandByIdSchema),deleteBrand)




