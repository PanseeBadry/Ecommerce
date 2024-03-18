

import Joi from "joi";


export const addToCartSchema = Joi.object({
    product:Joi.string().hex().length(24).required(),
    quantity:Joi.number().integer().options({convert:false}),    
})


export const getCartByIdSchema = Joi.object({
    id:Joi.string().hex().length(24).required()
})

export const updateQuantitySchema = Joi.object({
    id:Joi.string().hex().length(24).required(),
  
    quantity:Joi.number().required()   
})


































