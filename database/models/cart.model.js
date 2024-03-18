import mongoose from "mongoose";



const cartSchema = new mongoose.Schema({
   userId:{type:mongoose.Types.ObjectId,ref:'user'},
   cartItems:[{
   product:{
        type:mongoose.Types.ObjectId,ref:'product'
    },
   quantity:{
      type:Number,
      default:1
   },
   price:Number
   }],
   totalPrice:Number,
   totalPriceAfterDiscount:Number,
   discount:Number

},{timestamps:true})


export const cartModel = mongoose.model('cart',cartSchema)