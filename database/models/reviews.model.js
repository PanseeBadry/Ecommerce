import mongoose from "mongoose";



const reviewSchema = new mongoose.Schema({
    text:{
        type:String,
        required:true,
        trim:true,
        unique:true
    },
    rate:{
        type:Number,
        min:0,
        max:5
    },
    image:String,
    createdBy:{
        type:mongoose.Types.ObjectId,
        ref:'user'
    },
    product:{
        type:mongoose.Types.ObjectId,
        ref:'product'
    }


},{timestamps:true})

export const reviewModel = mongoose.model('review',reviewSchema)