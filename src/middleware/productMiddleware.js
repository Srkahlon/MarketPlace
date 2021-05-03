'use strict'
const { check,validationResult } = require('express-validator');

module.exports.ProductMiddleware = class ProductMiddleware
{
    getValidations(req,res,next)
    {
        return [
            check('product_name', 'Product Name is required').notEmpty(),
            check('product_category', 'Product Category is required').notEmpty(),
            check('stock', 'Product Stock is required').notEmpty(),
            check('product_sale_price', 'Product Sale Price is required').notEmpty(),
            check('product_price', 'Product Price is required').notEmpty(),
            check('product_image_url', 'Product Image URL is required').notEmpty()
        ];
    }
    
    //Check if required fields are present.
    async validateRequest(req,res,next) {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            const alert = errors.array()
            res.render(`errors/400`, {
                alert
            });
        }
        else
        {
            next();
        }
    }
}