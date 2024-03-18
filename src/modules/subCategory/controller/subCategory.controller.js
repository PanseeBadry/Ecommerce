import slugify from "slugify"
import { handleError } from "../../../middleware/handleAsyncError.js"
import { subCategoryModel } from "../../../../database/models/subCategory.model.js"
import { deleteOne } from "../../handlers/apiHandle.js"



const addSubCategory = handleError(async(req,res)=>{
    
    req.body.slug = slugify(req.body.title)
 
    req.body.image = req.file.filename
    
    let newSubCategory = new subCategoryModel(req.body)
    let added = await newSubCategory.save()
    console.log(newSubCategory)
    res.json({message:"added",added})
})
const getAllSubCategories = handleError(async (req,res)=>{
    console.log(req.params)
    let filterObject={}
    if(req.params.category){
        filterObject.category =req.params.category 
    }
    let allSubCategories = await subCategoryModel.find(filterObject)
    res.json(allSubCategories)
})



const getSubCategoryById = handleError(async(req,res)=>{
    let subCategory = await subCategoryModel.findById(req.params.id)
    if(subCategory){
        res.json(subCategory)
    }else{
        res.json({message:"subCategory not found"})
    }
   
})


const updateSubCategory = handleError(async(req,res)=>{
    req.body.slug = slugify(req.body.title)
    let updatedSubCategory = await subCategoryModel.findByIdAndUpdate(req.params.id,req.body,{new:true})
    updatedSubCategory && res.json(updatedSubCategory)
    !updatedSubCategory && res.json({message:"subCategory not found"})   
})

const deleteSubCategory = deleteOne(subCategoryModel)



export{
    addSubCategory,
    getAllSubCategories,
    getSubCategoryById,
    updateSubCategory,
    deleteSubCategory
}