import Joi from "joi";


export const addProductSchema = Joi.object({
    title:Joi.string().min(3).max(40).required().trim(),
    discription:Joi.string().min(3).max(400).required().trim(),
    price:Joi.number().min(0).required(),
    priceAfterDiscount:Joi.number().min(0).required(),
    quantity:Joi.number().min(0).required(),
    category:Joi.string().hex().length(24).required(),
    subCategory:Joi.string().hex().length(24).required(),
    brand:Joi.string().hex().length(24).required(),
    createdBy:Joi.string().hex().length(24).optional(),
    imageCover:Joi.array().items(Joi.object({
        fieldname: Joi.string().required(),
        originalname: Joi.string().required(),
        encoding: Joi.string().required(),
        mimetype: Joi.string().valid('image/jpeg','image/png','image/jpg').required(),
        destination: Joi.string().required(),
        filename: Joi.string().required(),
        path: Joi.string().required(),
        size: Joi.number().max(5242880).required()     
    }).required()).required(),
    images:Joi.array().items(Joi.object({
        fieldname: Joi.string().required(),
        originalname: Joi.string().required(),
        encoding: Joi.string().required(),
        mimetype: Joi.string().valid('image/jpeg','image/png','image/jpg').required(),
        destination: Joi.string().required(),
        filename: Joi.string().required(),
        path: Joi.string().required(),
        size: Joi.number().max(5242880).required()     
    }).required()).required()

    


})


export const getProductByIdSchema = Joi.object({
    id:Joi.string().hex().length(24).required()
})

export const updateProductSchema = Joi.object({
    id:Joi.string().hex().length(24).required(),
    title:Joi.string().min(3).max(40).required(),
    imageCover:Joi.array().items(Joi.object({
        fieldname: Joi.string().required(),
        originalname: Joi.string().required(),
        encoding: Joi.string().required(),
        mimetype: Joi.string().valid('image/jpeg','image/png','image/jpg').required(),
        destination: Joi.string().required(),
        filename: Joi.string().required(),
        path: Joi.string().required(),
        size: Joi.number().max(5242880).required()     
    }).required()).required(),
    images:Joi.array().items(Joi.object({
        fieldname: Joi.string().required(),
        originalname: Joi.string().required(),
        encoding: Joi.string().required(),
        mimetype: Joi.string().valid('image/jpeg','image/png','image/jpg').required(),
        destination: Joi.string().required(),
        filename: Joi.string().required(),
        path: Joi.string().required(),
        size: Joi.number().max(5242880).required()     
    }).required()).required()
   
})


