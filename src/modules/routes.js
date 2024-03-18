import { addressRoutes } from "./address/address.routes.js"
import { authRoutes } from "./auth/auth.routes.js"
import { brandRoutes } from "./brand/brand.routes.js"
import { cartRoutes } from "./cart/cart.routes.js"
import { categoryRoutes } from "./category/category.route.js"
import { couponRoutes } from "./coupon/coupon.routes.js"
import { orderRoutes } from "./order/order.routes.js"
import { productRoutes } from "./product/product.routes.js"
import { reviewRoutes } from "./review/review.routes.js"
import { subCategoryRoutes } from "./subCategory/subCategory.route.js"
import { userRoutes } from "./user/user.routes.js"
import { wishlistRoutes } from "./wishlist/wishlist.routes.js"



export const allRoutes=(app)=>{
    app.use("/api/v1/category",categoryRoutes)
    app.use("/api/v1/subCategory/",subCategoryRoutes)
    app.use("/api/v1/brand/",brandRoutes)
    app.use("/api/v1/product",productRoutes)
    app.use("/api/v1/user",userRoutes)
    app.use("/api/v1/auth/",authRoutes)
    app.use("/api/v1/review/",reviewRoutes)
    app.use("/api/v1/wishlist",wishlistRoutes)
    app.use("/api/v1/address",addressRoutes)
    app.use("/api/v1/coupon",couponRoutes)
    app.use("/api/v1/cart",cartRoutes)
    app.use("/api/v1/order",orderRoutes)


}