import mongoose from "mongoose";



const orderSchema = new mongoose.Schema({
   userId:{type:mongoose.Types.ObjectId,ref:'user'},
   orderItems:[{
   product:{type:mongoose.Types.ObjectId,ref:'product'},
   quantity:Number,      
   price:Number
   }],
   orderTotalPrice:Number,
   shippingAddress:{
    street:String,
    phone:String,
    city:String
   },
   paymentType:{
    type:String,
    enum:['cash','card'],
    default:'cash'
   },
   isDelivered:{
    type:Boolean,
    default:false
   },
   deliverAt:Date,
   isPaid:{
    type:Boolean,
    default:false
   },
   paidAt:Date

},{timestamps:true})


export const orderModel = mongoose.model('order',orderSchema)