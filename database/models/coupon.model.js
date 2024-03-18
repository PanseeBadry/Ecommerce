import mongoose from "mongoose";



const couponSchema = new mongoose.Schema({
    code:{
        type:String,
        required:true,
        trim:true,
        unique:true
    },
    createdBy:{
        type:mongoose.Types.ObjectId,
        ref:'user'
    },
    discount:{
        type:Number,
        min:0,

    },
    expires:Date,

},{timestamps:true})


export const couponModel = mongoose.model('coupon',couponSchema)