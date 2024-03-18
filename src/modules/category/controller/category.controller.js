import { categoryModel } from "../../../../database/models/categoryModel.js"
import slugify from "slugify"
import { handleError } from "../../../middleware/handleAsyncError.js"
import { deleteOne } from "../../handlers/apiHandle.js"



const addCategory = handleError(async(req,res)=>{
    
    req.body.slug = slugify(req.body.title)
 
    req.body.image = req.file.filename
    
    let newCategory = new categoryModel(req.body)
    let added = await newCategory.save()
    console.log(newCategory)
    res.json({message:"added",added})
})
const getAllCategories = handleError(async (req,res)=>{
    let allCategories = await categoryModel.find()
    res.json(allCategories)
})



const getCategoryById = handleError(async(req,res)=>{
    let category = await categoryModel.findById(req.params.id)
    if(category){
        res.json(category)
    }else{
        res.json({message:"category not found"})
    }
   
})


const updateCategory = handleError(async(req,res)=>{
    req.body.slug = slugify(req.body.title)
    let updatedCategory = await categoryModel.findByIdAndUpdate(req.params.id,req.body,{new:true})
    updatedCategory && res.json(updatedCategory)
    !updatedCategory && res.json({message:"category not found"})   
})

const deleteCategory = deleteOne(categoryModel)




export{
    addCategory,
    getAllCategories,
    getCategoryById,
    updateCategory,
    deleteCategory
}