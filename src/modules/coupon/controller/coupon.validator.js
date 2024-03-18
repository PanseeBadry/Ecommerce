

import Joi from "joi";


export const addCouponSchema = Joi.object({
    code:Joi.string().min(3).required().trim(),
    discount:Joi.number().min(0).required(),
    expires:Joi.date().required(),
    
})


export const getCouponIdSchema = Joi.object({
    id:Joi.string().hex().length(24).required()
})

export const updateCouponSchema = Joi.object({
    id:Joi.string().hex().length(24).required(),
    code:Joi.string().min(3).trim(),
    discount:Joi.number().min(0),
    expires:Joi.date()


   
})


































