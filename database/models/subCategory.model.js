import mongoose from "mongoose";



const subCategorySchema = new mongoose.Schema({
    title:{
        type:String,
        required:true,
        minLength:[3,"title is too short"],
        trim:true,
        unique:true
    },
    slug:{
        type:String,
        required:true,
        lowercase:true
    },
    category :{
        type:mongoose.Types.ObjectId,
        ref:'category'
    },
    createdBy:{
        type:mongoose.Types.ObjectId,
        ref:'user'
    },
    image:String


},{timestamps:true})
subCategorySchema.post('init',function(doc){
    doc.image = process.env.BASEURL + doc.image
    
})

export const subCategoryModel = mongoose.model('subCategory',subCategorySchema)