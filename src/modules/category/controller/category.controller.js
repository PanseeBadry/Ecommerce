import { categoryModel } from "../../../../database/models/categoryModel.js"
import slugify from "slugify"
import { handleError } from "../../../middleware/handleAsyncError.js"
import { deleteOne } from "../../handlers/apiHandle.js"
import apiFeatures from "../../../utilis/apiFeature.js"
import { appError } from "../../../utilis/appError.js"



const addCategory = handleError(async(req,res)=>{
    
    req.body.slug = slugify(req.body.title)
 
    req.body.image = req.file.filename
    
    let newCategory = new categoryModel(req.body)
    let added = await newCategory.save()
    console.log(newCategory)
    res.json({message:"added",added})
})
const getAllCategories = handleError(async (req,res)=>{

    let apiFeature=    new apiFeatures(categoryModel.find(),req.query).pagination().sort().search().fields()
   let allCategories = await apiFeature.mongooseQuery.exec()
    res.json({message:"success",allCategories})
})



const getCategoryById = handleError(async(req,res,next)=>{
    let category = await categoryModel.findById(req.params.id)
    if(category){
        res.json(category)
    }else{
        next(new appError('category not found',404)) 
    }
   
})


const updateCategory = handleError(async(req,res,next)=>{
    req.body.slug = slugify(req.body.title)
    let updatedCategory = await categoryModel.findByIdAndUpdate(req.params.id,req.body,{new:true})
    updatedCategory && res.json(updatedCategory)
    !updatedCategory && next(new appError('category not found',404))   
})

const deleteCategory = deleteOne(categoryModel)




export{
    addCategory,
    getAllCategories,
    getCategoryById,
    updateCategory,
    deleteCategory
}