import mongoose from "mongoose";



const categorySchema = new mongoose.Schema({
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
    image:String,
    createdBy:{
        type:mongoose.Types.ObjectId,
        ref:'user'
    }


},{timestamps:true})
categorySchema.post('init',function(doc){
    doc.image = process.env.BASEURL + doc.image
    
})

export const categoryModel = mongoose.model('Category',categorySchema)