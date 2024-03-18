

import Joi from "joi";


export const addReviewSchema = Joi.object({
    text:Joi.string().min(3).max(40).required().trim(),
    rate:Joi.number().min(0).max(5).required(),
    product:Joi.string().hex().length(24).required(),
    
})


export const getReviewByIdSchema = Joi.object({
    id:Joi.string().hex().length(24).required()
})

export const updateReviewSchema = Joi.object({
    id:Joi.string().hex().length(24).required(),
    text:Joi.string().min(3).max(40).trim(),
    rate:Joi.number().min(0).max(5),
    product:Joi.string().hex().length(24)


   
})


































