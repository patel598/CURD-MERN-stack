import Joi from 'joi';

const productValidationSchema = Joi.object({
    metaTitle: Joi.string().required(),
    productName: Joi.string().required(),
    price: Joi.string().required(),
    discountedPrice: Joi.string().required(),
    description: Joi.string().required(),
    qty: Joi.string(),
    isActive: Joi.boolean(),
    image:Joi.string()

});

export default productValidationSchema