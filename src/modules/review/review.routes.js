import  express  from "express";
import { validation } from "../../middleware/validation.js";

import { uploadSingle } from "../../utilis/fileUpload.js";
import { addReview, deleteReview, getAllReviews, getReviewById, updateReview } from "./controller/review.controller.js";
import { addReviewSchema, getReviewByIdSchema, updateReviewSchema } from "./controller/review.validator.js";
import { allowTo, protectedRoutes } from "../auth/auth.controller.js";

export const reviewRoutes = express.Router()


reviewRoutes.route("/")
.post(protectedRoutes,allowTo('User'),validation(addReviewSchema),addReview)
.get(getAllReviews)


reviewRoutes.route("/:id")
.get(validation(getReviewByIdSchema),getReviewById)
.patch(protectedRoutes,allowTo('User'),validation(updateReviewSchema),updateReview)
.delete(protectedRoutes,allowTo('User','admin'),validation(getReviewByIdSchema),deleteReview)




