import { handleError } from "../../../middleware/handleAsyncError.js"

import { deleteOne } from "../../handlers/apiHandle.js"
import { userModel } from "../../../../database/models/userModel.js"
import apiFeatures from "../../../utilis/apiFeature.js"
import { appError } from "../../../utilis/appError.js"



const addUser = handleError(async(req,res)=>{
    let userFound = await userModel.findOne({email:req.body.email})
   
    if(userFound){
        res.json({message:"user already exists"})
    }else{
        let preUser = new userModel(req.body)
        let added = await preUser.save()        
        res.json({message:"added",added})
    } 
    
})
const getAllUsers = handleError(async (req,res)=>{
    let apiFeature=    new apiFeatures(userModel.find(),req.query).pagination().sort().search().fields()
    let allUsers = await apiFeature.mongooseQuery.exec()
    res.json({message:"done",allUsers})
})
const getUserById = handleError(async(req,res,next)=>{
    let User = await userModel.findById(req.params.id)
    if(User){
        res.json({message:"done",User})
    }else{
        next(new appError('user not found',404))
    }
   
})
const updateUser = handleError(async(req,res)=>{
    let updatedUser = await userModel.findByIdAndUpdate(req.params.id,req.body,{new:true})
    updatedUser && res.json({message:"done",updatedUser})
    !updatedUser && next(new appError('user not found',404))   
})

const deleteUser =deleteOne(userModel)
const changePassword = handleError(async(req,res)=>{
    req.body.changePasswordAt = Date.now() 
    console.log(req.body.changePasswordAt)
    let updatedUser = await userModel.findOneAndUpdate({_id:req.params.id},req.body,{new:true})
    updatedUser && res.json({message:"done",updatedUser})
    !updatedUser && next(new appError('user not found',404))   
})



export{
    addUser,
    getAllUsers,
    getUserById,
    updateUser,
    deleteUser,
    changePassword
}