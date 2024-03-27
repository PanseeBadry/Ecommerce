import { cartModel } from "../../../../database/models/cart.model.js"
import { couponModel } from "../../../../database/models/coupon.model.js"
import { productModel } from "../../../../database/models/productModel.js"
import { handleError } from "../../../middleware/handleAsyncError.js"
import { appError } from "../../../utilis/appError.js"

const calcTotalPrice=(cart)=>{
    let totalPrice = 0
    cart.cartItems.forEach((item)=>{
        totalPrice += item.quantity*item.price 
    })
    cart.totalPrice = totalPrice
    if(cart.discount){
        let totalPriceAfterDiscount = cart.totalPrice - (cart.totalPrice*cart.discount)/100;
        cart.totalPriceAfterDiscount = totalPriceAfterDiscount
    }
}


const addToCart = handleError(async(req,res,next)=>{
    let productFound = await productModel.findById(req.body.product)
    if(!productFound) return next(new appError(`product not found`,404))
    if(productFound.quantity < req.body.quantity) return next(new appError(`sold out`,401))
    req.body.price = productFound.price
    let cartFound = await cartModel.findOne({userId:req.user._id})
    if(!cartFound){
        let cart = new cartModel({
            userId:req.user._id,
            cartItems:[req.body]
        })
        calcTotalPrice(cart)
        await cart.save()
        cart && res.json({message:"done",cart})
        !cart && next(new appError('cart not found',404))  
    }else{
        let item=cartFound.cartItems.find((item)=>item.product==req.body.product)

        if(item) {
            if(item.quantity>=productFound.quantity) return next(new appError(`sold out`,401))
            item.quantity += req.body.quantity || 1
        }
        else cartFound.cartItems.push(req.body)
        calcTotalPrice(cartFound)
        await cartFound.save()
        res.json({message:"Done",cartFound})
    }
     
           
})

const removeItemFromCart = handleError(async(req,res,next)=>{
    
    let cart = await cartModel.findOneAndUpdate({userId:req.user._id},{$pull:{cartItems:{_id:req.params.id}}},{new:true})
    calcTotalPrice(cart)
    await cart.save()
    cart && res.json({message:"done",cart})
    !cart && next(new appError('cart not found',404))   
           
})
const updateQuantity  = handleError(async(req,res,next)=>{
    
    let cart = await cartModel.findOne({userId:req.user._id})
    !cart && next(new appError('cart not found',404))  
    let item= cart.cartItems.find((item)=>item._id == req.params.id)
    let productFound = await productModel.findOne({_id:item.product})
    if(!item) return next(new appError(`item not found`,404)) 
    item.quantity = req.body.quantity
    if(item.quantity>=productFound.quantity) return next(new appError(`sold out`,401))    
    calcTotalPrice(cart)
    await cart.save()
    cart && res.json({message:"done",cart})            
})
const getUserCart = handleError(async(req,res,next)=>{
    let cart = await cartModel.findOne({userId:req.user._id}).populate('cartItems.product')
    cart && res.json({message:"Done",cart})
    !cart && next(new appError('cart not found',404)) 
})
const removeCart = handleError(async(req,res,next)=>{
    let cartRemoved = await cartModel.findOneAndDelete({userId:req.user._id})
    cartRemoved && res.json({message:"Done",cartRemoved})
    !cartRemoved && next(new appError('cart not found',404)) 

})
const applyCoupon = handleError(async(req,res,next)=>{
    let coupon = await couponModel.findOne({code:req.body.coupon,expires:{$gte:Date.now()}})
    if(!coupon) return next(new appError(`invalid coupon`,404))
    let cart = await cartModel.findOne({userId:req.user._id})
    if(!cart) return next(new appError(`cart not found`,404))
    let totalPriceAfterDiscount = cart.totalPrice - (cart.totalPrice*coupon.discount)/100;
    cart.totalPriceAfterDiscount = totalPriceAfterDiscount
    cart.discount = coupon.discount
    await cart.save()
    res.json({message:"Done",cart}) 

})


export{

    addToCart,
    removeItemFromCart,
    updateQuantity,
    getUserCart,
    removeCart,
    applyCoupon
}