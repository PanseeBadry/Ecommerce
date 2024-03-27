import { userModel } from "../../../../database/models/userModel.js"
import { handleError } from "../../../middleware/handleAsyncError.js"
import apiFeatures from "../../../utilis/apiFeature.js"
import { appError } from "../../../utilis/appError.js"




const addAddress = handleError(async(req,res,next)=>{
    
    let address = await userModel.findByIdAndUpdate(req.user._id,{$addToSet:{adressess:req.body}},{new:true})
    address && res.json({message:"done",address:address.adressess})
    !address && new appError('Address not found',404) 
           
})

const removeAddress = handleError(async(req,res,next)=>{
    
    let address = await userModel.findByIdAndUpdate(req.user._id,{$pull:{adressess:{_id:req.params.id}}},{new:true})
    address && res.json({message:"done",address:address.adressess})
    !address && !address && next(new appError('Address not found',404)) 
  
           
})
const getAllAddressess = handleError(async(req,res,next)=>{
    let apiFeature=    new apiFeatures(userModel.findById(req.user._id),req.query).pagination().sort().search().fields()
    let userAddress = await apiFeature.mongooseQuery.exec()
    res.json({message:"Done",userAddress:userAddress.adressess})
})
export{

    addAddress,
    removeAddress,
    getAllAddressess
    
}