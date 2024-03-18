import { userModel } from "../../../database/models/userModel.js";
import { handleError } from "../../middleware/handleAsyncError.js";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken" 
import { appError } from "../../utilis/appError.js";
export const signUp =handleError(async (req,res,next)=>{
    const foundUser = await userModel.findOne({email:req.body.email});
    if(foundUser){
        res.json({message:"user already exixts"});
        
    }else{
        let user = new userModel(req.body)
        await user.save()
        res.json({message:"success",user})
    }
  })
  export const signIn = handleError(async (req,res,next)=>{

    let{email,password}= req.body
    const foundUser = await userModel.findOne({email});
    if(foundUser){
        let matched = await bcrypt.compare(password, foundUser.password);
        if (matched) {
            let token = jwt.sign({name:foundUser.name, id: foundUser._id,role:foundUser.role }, process.env.SECRET_KEY)
            res.json({ message: "signIn successfully", token })  
        } else {
          res.json({message:"wrong password"})
        }
    }else{
    res.json({message:"user not found"})
    }
})

export const protectedRoutes = handleError(async(req,res,next)=>{
    let{token}=req.headers
    if(!token) return next(new appError(`please provide token`,409))
    let decodded = await jwt.verify(token,process.env.SECRET_KEY)
    let user = await userModel.findById(decodded.id)
    if(user.changePasswordAt){
        let changePasswordTime =parseInt( user.changePasswordAt.getTime()/1000)
        if(!user) return next(new appError(`user not found`,404))
        if(changePasswordTime>decodded.iat) return next(new appError(`invalid token`,409))
    } 
    req.user = user
    next()
    
})
export const allowTo = (...roles)=>{
    return handleError(async(req,res,next)=>{
        if(!roles.includes(req.user.role)) return next(new appError(`not authorized`,403))
        next()
    })
}

