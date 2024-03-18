import  express  from "express";
import { addSubCategory, deleteSubCategory, getAllSubCategories, getSubCategoryById, updateSubCategory } from "./controller/subCategory.controller.js"
import { validation } from "../../middleware/validation.js";

import { uploadSingle } from "../../utilis/fileUpload.js";
import { addSubCategorySchema, getSubCategoryByIdSchema, updateSubCategorySchema } from "./controller/subCategory.validator.js";

export const subCategoryRoutes = express.Router({mergeParams:true})


subCategoryRoutes.route("/")
.post(uploadSingle('image'),validation(addSubCategorySchema),addSubCategory)
.get(getAllSubCategories)


subCategoryRoutes.route("/:id")
.get(validation(getSubCategoryByIdSchema),getSubCategoryById)
.patch(validation(updateSubCategorySchema),updateSubCategory)
.delete(validation(getSubCategoryByIdSchema),deleteSubCategory)






