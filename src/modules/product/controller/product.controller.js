import slugify from "slugify"
import { handleError } from "../../../middleware/handleAsyncError.js"
import { productModel } from "../../../../database/models/productModel.js"
import { deleteOne } from "../../handlers/apiHandle.js"
import apiFeatures from "../../../utilis/apiFeature.js"



const addProduct = handleError(async(req,res)=>{
    
    req.body.slug = slugify(req.body.title)
 
    req.body.imageCover = req.files.imageCover[0].filename
    req.body.images = req.files.images.map(ele =>ele.filename)
    let preProduct = new productModel(req.body)
    let added = await preProduct.save()
    
    res.json({message:"added",added})
})
const getAllProducts = handleError(async (req,res)=>{
let apiFeature=    new apiFeatures(productModel.find(),req.query).pagination().sort().search().fields()
   let allProducts = await apiFeature.mongooseQuery.exec()
    res.json({message:"done",page:apiFeature.page,allProducts})
})



const getProductById = handleError(async(req,res)=>{
    let product = await productModel.findById(req.params.id)
    if(product){
        res.json({message:"done",product})
    }else{
        res.json({message:"product not found"})
    }
   
})


const updateProduct = handleError(async(req,res)=>{
    
    req.body.slug = slugify(req.body.title)

    if(req.files.imageCover) req.body.imageCover=req.files.imageCover[0].filename
    if(req.files.images) req.body.images=req.files.images.map(ele=>ele.filename)
    let updatedProduct = await productModel.findByIdAndUpdate(req.params.id,req.body,{new:true})
    updatedProduct && res.json({message:"done",updatedProduct})
    !updatedProduct && res.json({message:"product not found"})   
})

const deleteProduct = deleteOne(productModel)




export{
    addProduct,
    getAllProducts,
    getProductById,
    updateProduct,
    deleteProduct
}