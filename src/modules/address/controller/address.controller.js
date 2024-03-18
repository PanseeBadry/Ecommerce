import { userModel } from "../../../../database/models/userModel.js"
import { handleError } from "../../../middleware/handleAsyncError.js"




const addAddress = handleError(async(req,res,next)=>{
    
    let address = await userModel.findByIdAndUpdate(req.user._id,{$addToSet:{adressess:req.body}},{new:true})
    address && res.json({message:"done",address:address.adressess})
    !address && res.json({message:"Address not found"})  
           
})

const removeAddress = handleError(async(req,res,next)=>{
    
    let address = await userModel.findByIdAndUpdate(req.user._id,{$pull:{adressess:{_id:req.params.id}}},{new:true})
    address && res.json({message:"done",address:address.adressess})
    !address && res.json({message:"Address not found"})  
           
})
const getAllAddressess = handleError(async(req,res,next)=>{
    let userAddress = await userModel.findById(req.user._id)
    res.json({message:"Done",userAddress:userAddress.adressess})
})
export{

    addAddress,
    removeAddress,
    getAllAddressess
    
}