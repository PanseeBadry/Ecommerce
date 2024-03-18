import { userModel } from "../../../../database/models/userModel.js"
import { handleError } from "../../../middleware/handleAsyncError.js"




const addProductToWishlist = handleError(async(req,res,next)=>{
    
    let addToWishlist = await userModel.findByIdAndUpdate(req.user._id,{$addToSet:{wishlist:req.body.product}},{new:true}).populate('wishlist')
    addToWishlist && res.json({message:"done",addToWishlist:addToWishlist.wishlist})
    !addToWishlist && res.json({message:"Wishlist not found"})  
           
})

const removeFromWishlist = handleError(async(req,res,next)=>{
    
    let wishlist = await userModel.findByIdAndUpdate(req.user._id,{$pull:{wishlist:req.params.id}},{new:true}).populate('wishlist')
    wishlist && res.json({message:"done",wishlist:wishlist.wishlist})
    !wishlist && res.json({message:"Wishlist not found"})  
           
})
const getAllProductsInWishlist = handleError(async(req,res,next)=>{
    let userWishlist = await userModel.findById(req.user._id).populate('wishlist')
    res.json({message:"Done",userWishlist:userWishlist.wishlist})
})
export{

    addProductToWishlist,
    removeFromWishlist,
    getAllProductsInWishlist
}