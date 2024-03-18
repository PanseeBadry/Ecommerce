import { handleError } from "../../../middleware/handleAsyncError.js"
import { deleteOne } from "../../handlers/apiHandle.js"
import { reviewModel } from "../../../../database/models/reviews.model.js"
import { appError } from "../../../utilis/appError.js"



const addReview = handleError(async(req,res,next)=>{
    req.body.createdBy=req.user._id
    let reviewFound = await reviewModel.findOne({createdBy:req.user._id,product:req.body.product})
    if(reviewFound){
            return next(new appError(`user already reviewed this product`,409))
    }
    let preReview = new reviewModel(req.body)
    let added = await preReview.save()
    
    res.json({message:"added",added})
})
const getAllReviews = handleError(async (req,res)=>{
    let allReviews = await reviewModel.find()
    res.json({message:"done",allReviews})
})



const getReviewById = handleError(async(req,res)=>{
    let review = await reviewModel.findById(req.params.id)
    if(review){
        res.json({message:"done",review})
    }else{
        res.json({message:"Review not found"})
    }
   
})


const updateReview = handleError(async(req,res,next)=>{
    let reviewFound = await reviewModel.findById(req.params.id)
    
    if(reviewFound.createdBy ==req.user._id.toString() ){
        let updatedReview = await reviewModel.findByIdAndUpdate(req.params.id,req.body,{new:true})
    updatedReview && res.json({message:"done",updatedReview})
    !updatedReview && res.json({message:"Review not found"})  
        
    }else{
         next(new appError(`not authorized to update this review`,401))
    }

     
})

const deleteReview =deleteOne(reviewModel)



export{
    addReview,
    getAllReviews,
    getReviewById,
    updateReview,
    deleteReview
}