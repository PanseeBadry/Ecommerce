import slugify from "slugify"
import { handleError } from "../../../middleware/handleAsyncError.js"
import { productModel } from "../../../../database/models/productModel.js"
import { deleteOne } from "../../handlers/apiHandle.js"



const addProduct = handleError(async(req,res)=>{
    
    req.body.slug = slugify(req.body.title)
 
    req.body.imageCover = req.files.imageCover[0].filename
    req.body.images = req.files.images.map(ele =>ele.filename)
    let preProduct = new productModel(req.body)
    let added = await preProduct.save()
    
    res.json({message:"added",added})
})
const getAllProducts = handleError(async (req,res)=>{

   
    //pagination
    let page = req.query.page*1 ||1
    if(req.query.page <=0 ) page =1
    let skip = (page-1)*4;

    //filters
    let filterObject = {...req.query}
    
    let excutedQuery =['fields','sort','keyword','page']
    excutedQuery.forEach((q)=>{
        delete filterObject[q]

    }) 
    
    filterObject=JSON.stringify(filterObject)
    filterObject=filterObject.replace(/\bgt|gte|lt|lte\b/g,match => `$${match}`)
    filterObject = JSON.parse(filterObject)
    console.log(filterObject)

    //sort

    //build query
    let mongooseQuery = productModel.find(filterObject).skip(skip).limit(4)
    
    if(req.query.sort){
        let sortBy = req.query.sort.split(",").join(" ")
        console.log(sortBy)
        mongooseQuery.sort(sortBy)
    }
    //excute query

    //search
    if(req.query.keyword){
        mongooseQuery.find({
            $or:[
                {title:{$regex:req.query.keyword,$options:'i'}},
                {discription:{$regex:req.query.keyword,$options:'i'}},

            ]
        })
    }

    //fields
    if(req.query.fields){
        
            const fields = req.query.fields.split(",").join(" ")
            console.log(fields)
            mongooseQuery =mongooseQuery.select(fields) 
        
        
         
    }


    let allProducts = await mongooseQuery.exec()
    res.json({message:"done",page,allProducts})
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