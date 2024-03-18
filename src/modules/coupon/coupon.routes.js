import  express  from "express";
import { validation } from "../../middleware/validation.js";

import { allowTo, protectedRoutes } from "../auth/auth.controller.js";
import { addCouponSchema, getCouponIdSchema, updateCouponSchema } from "./controller/coupon.validator.js";
import { addCoupon, deleteCoupon, getAllCoupons, getCouponById, updateCoupon } from "./controller/coupon.controller.js";

export const couponRoutes = express.Router()


couponRoutes.route("/")
.post(protectedRoutes,allowTo('admin'),validation(addCouponSchema),addCoupon)
.get(getAllCoupons)


couponRoutes.route("/:id")
.get(validation(getCouponIdSchema),getCouponById)
.patch(protectedRoutes,allowTo('admin'),validation(updateCouponSchema),updateCoupon)
.delete(protectedRoutes,allowTo('admin'),validation(getCouponIdSchema),deleteCoupon)




