

import Joi from "joi";


export const addToWishlistSchema = Joi.object({
 
    product:Joi.string().hex().length(24).required(),
    
})


export const getWishlistByIdSchema = Joi.object({
    id:Joi.string().hex().length(24).required()
})

export const updateWishlistSchema = Joi.object({
    product:Joi.string().hex().length(24)


   
})


































