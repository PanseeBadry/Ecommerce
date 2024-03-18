

import Joi from "joi";


export const createOrderSchema = Joi.object({
    id:Joi.string().hex().length(24).required(),
    shippingAddress:Joi.object({
        street:Joi.string().trim().required(),
        city:Joi.string().trim().required(),
        phone:Joi.string().trim().required(),
    }).required()
})
// export const getSpecificOrderSchema = Joi.object({
//     id:Joi.string().hex().length(24).required()
// }) 





































