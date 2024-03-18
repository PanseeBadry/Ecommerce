import mongoose, { Schema } from "mongoose";



const brandSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true,
        minLength:[3,"title is too short"],
        trim:true,
        unique:true
    },
    logo:String,
    slug:{
        type:String,
        required:true,
        lowercase:true
    },
    image:String,
    createdBy:{
        type:mongoose.Types.ObjectId,
        ref:'user'
    }


},{timestamps:true})

brandSchema.post("init",function(doc){
    doc.logo = process.env.BASEURL + 'uploads/' + doc.logo
})
export const brandModel = mongoose.model('brand',brandSchema)