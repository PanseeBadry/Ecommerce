import Joi from "joi";


export const addSubCategorySchema = Joi.object({
    title:Joi.string().min(3).max(40).required(),
    category:Joi.string().hex().length(24).required(),
    image:Joi.object({
            fieldname: Joi.string().required(),
            originalname: Joi.string().required(),
            encoding: Joi.string().required(),
            mimetype: Joi.string().valid('image/jpeg','image/png','image/jpg').required(),
            destination: Joi.string().required(),
            filename: Joi.string().required(),
            path: Joi.string().required(),
            size: Joi.number().max(5242880).required()     
    }).required()
})

export const getSubCategoryByIdSchema = Joi.object({
    id:Joi.string().hex().length(24).required()
})

export const updateSubCategorySchema = Joi.object({
    id:Joi.string().hex().length(24).required(),
    title:Joi.string().min(3).max(40).required()
   
})
