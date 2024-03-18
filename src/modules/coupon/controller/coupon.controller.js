import { handleError } from "../../../middleware/handleAsyncError.js"
import { deleteOne } from "../../handlers/apiHandle.js"
import { appError } from "../../../utilis/appError.js"
import { couponModel } from "../../../../database/models/coupon.model.js"
import  QRCode  from "qrcode"


const addCoupon = handleError(async(req,res,next)=>{
    req.body.createdBy = req.user._id
    let CouponFound = await couponModel.findOne({code:req.body.code})
    if(CouponFound){
            return next(new appError(`coupon already exists`,409))
    }
    let preCoupon = new couponModel(req.body)
    let added = await preCoupon.save()
    
    res.json({message:"added",added})
})
const getAllCoupons = handleError(async (req,res)=>{
    let allCoupons = await couponModel.find()
    res.json({message:"done",allCoupons})
})



const getCouponById = handleError(async(req,res)=>{
    let coupon = await couponModel.findById(req.params.id)
    let url = await QRCode.toDataURL(coupon.code)
    if(coupon){
        res.json({message:"done",coupon,url})
    }else{
        res.json({message:"Coupon not found"})
    }
   
})


const updateCoupon = handleError(async(req,res,next)=>{
    
        let updatedCoupon = await couponModel.findOneAndUpdate({_id:req.params.id,createdBy:req.user._id},req.body,{new:true})
        
    updatedCoupon && res.json({message:"done",updatedCoupon})
    !updatedCoupon && res.json({message:"Coupon not found"})  
        
    
       

     
})

const deleteCoupon =deleteOne(couponModel)



export{
    addCoupon,
    getAllCoupons,
    getCouponById,
    updateCoupon,
    deleteCoupon
}