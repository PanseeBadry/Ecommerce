import slugify from "slugify"
import { handleError } from "../../../middleware/handleAsyncError.js"
import { subCategoryModel } from "../../../../database/models/subCategory.model.js"
import { deleteOne } from "../../handlers/apiHandle.js"
import apiFeatures from "../../../utilis/apiFeature.js"
import { appError } from "../../../utilis/appError.js"



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
    let apiFeature=    new apiFeatures(subCategoryModel.find(filterObject),req.query).pagination().sort().search().fields()
    let allSubCategories = await apiFeature.mongooseQuery.exec()
    
    res.json({message:"Done",allSubCategories})
})



const getSubCategoryById = handleError(async(req,res,next)=>{
    let subCategory = await subCategoryModel.findById(req.params.id)
    if(subCategory){
        res.json(subCategory)
    }else{
        next(new appError('subcategory not found',404))
    }
   
})


const updateSubCategory = handleError(async(req,res)=>{
    req.body.slug = slugify(req.body.title)
    let updatedSubCategory = await subCategoryModel.findByIdAndUpdate(req.params.id,req.body,{new:true})
    updatedSubCategory && res.json(updatedSubCategory)
    !updatedSubCategory && next(new appError('subcategory not found',404))   
})

const deleteSubCategory = deleteOne(subCategoryModel)



export{
    addSubCategory,
    getAllSubCategories,
    getSubCategoryById,
    updateSubCategory,
    deleteSubCategory
}