import slugify from "slugify"
import { handleError } from "../../../middleware/handleAsyncError.js"
import { brandModel } from "../../../../database/models/brand.model.js"
import { deleteOne } from "../../handlers/apiHandle.js"
import apiFeatures from "../../../utilis/apiFeature.js"



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



const getBrandById = handleError(async(req,res)=>{
    let brand = await brandModel.findById(req.params.id)
    if(brand){
        res.json({message:"done",brand})
    }else{
        res.json({message:"brand not found"})
    }
   
})


const updateBrand = handleError(async(req,res)=>{
    req.body.slug = slugify(req.body.title)
    if(req.file) req.body.logo=req.file.filename
    let updatedBrand = await brandModel.findByIdAndUpdate(req.params.id,req.body,{new:true})
    updatedBrand && res.json({message:"done",updatedBrand})
    !updatedBrand && res.json({message:"brand not found"})   
})

const deleteBrand =deleteOne(brandModel)




export{
    addBrand,
    getAllBrands,
    getBrandById,
    updateBrand,
    deleteBrand
}