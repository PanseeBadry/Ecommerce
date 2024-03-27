import { handleError } from "../../../middleware/handleAsyncError.js"
import { deleteOne } from "../../handlers/apiHandle.js"
import { appError } from "../../../utilis/appError.js"
import { couponModel } from "../../../../database/models/coupon.model.js"
import  QRCode  from "qrcode"
import apiFeatures from "../../../utilis/apiFeature.js"


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
    let apiFeature=    new apiFeatures(couponModel.find(),req.query).pagination().sort().search().fields()
    let allCoupons = await apiFeature.mongooseQuery.exec()
    res.json({message:"done",allCoupons})
})



const getCouponById = handleError(async(req,res,next)=>{
    let coupon = await couponModel.findById(req.params.id)
    let url = await QRCode.toDataURL(coupon.code)
    if(coupon){
        res.json({message:"done",coupon,url})
    }else{
        next(new appError('coupon not found',404))
    }
   
})


const updateCoupon = handleError(async(req,res,next)=>{
    
        let updatedCoupon = await couponModel.findOneAndUpdate({_id:req.params.id,createdBy:req.user._id},req.body,{new:true})
        
    updatedCoupon && res.json({message:"done",updatedCoupon})
    !updatedCoupon && next(new appError('coupon not found',404))
        
    
       

     
})

const deleteCoupon =deleteOne(couponModel)



export{
    addCoupon,
    getAllCoupons,
    getCouponById,
    updateCoupon,
    deleteCoupon
}