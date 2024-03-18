import  express  from "express";
import { addCategory, deleteCategory, getAllCategories, getCategoryById, updateCategory } from "./controller/category.controller.js";
import { validation } from "../../middleware/validation.js";
import { addCategorySchema, getCategoryByIdSchema, updateCategorySchema } from "./controller/category.validator.js";
import { uploadSingle } from "../../utilis/fileUpload.js";
import { subCategoryRoutes } from "../subCategory/subCategory.route.js";

export const categoryRoutes = express.Router()

categoryRoutes.use("/:category/subCategory",subCategoryRoutes)
categoryRoutes.route("/")
.post(uploadSingle('image'),validation(addCategorySchema),addCategory)
.get(getAllCategories)


categoryRoutes.route("/:id")
.get(validation(getCategoryByIdSchema),getCategoryById)
.patch(validation(updateCategorySchema),updateCategory)
.delete(validation(getCategoryByIdSchema),deleteCategory)




