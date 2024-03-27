import slugify from "slugify"
import { handleError } from "../../../middleware/handleAsyncError.js"
import { brandModel } from "../../../../database/models/brand.model.js"
import { deleteOne } from "../../handlers/apiHandle.js"
import apiFeatures from "../../../utilis/apiFeature.js"
import { appError } from "../../../utilis/appError.js"



const addBrand = handleError(async(req,res)=>{
    
    req.body.slug = slugify(req.body.title)
 
    req.body.logo = req.file.filename
    
    let preBrand = new brandModel(req.body)
    let added = await preBrand.save()
    
    res.json({message:"added",added})
})
const getAllBrands = handleError(async (req,res)=>{
    let apiFeature=    new apiFeatures(brandModel.find(),req.query).pagination().sort().search().fields()
    let allBrands = await apiFeature.mongooseQuery.exec()
    res.json({message:"done",allBrands})
})



const getBrandById = handleError(async(req,res,next)=>{
    let brand = await brandModel.findById(req.params.id)
    if(brand){
        res.json({message:"done",brand})
    }else{
        next(new appError('brand not found',404)) 

    }
   
})


const updateBrand = handleError(async(req,res,next)=>{
    req.body.slug = slugify(req.body.title)
    if(req.file) req.body.logo=req.file.filename
    let updatedBrand = await brandModel.findByIdAndUpdate(req.params.id,req.body,{new:true})
    updatedBrand && res.json({message:"done",updatedBrand})
    !updatedBrand && next(new appError('brand not found',404))    
})

const deleteBrand =deleteOne(brandModel)




export{
    addBrand,
    getAllBrands,
    getBrandById,
    updateBrand,
    deleteBrand
}