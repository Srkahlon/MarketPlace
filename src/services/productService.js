'use strict'
const productModel = require('../models/productModel.js').ProductModel;

module.exports.ProductService = class ProductService {
    
    async listProducts()
    {
        try
        {
            var productModelObj = new productModel();
            var products = await productModelObj.getProducts();
            return products;
        }
        catch(e)
        {
            throw new Error();
        }
    }

    async getProduct(productId,userId=null)
    {
        try
        {
            var productModelObj = new productModel();
            var product = await productModelObj.getProduct(productId,userId);
            return product;
        }
        catch(e)
        {
            throw new Error();
        }
    }

    async updateProduct(productId,data)
    {
        try
        {
            var productModelObj = new productModel();
            var products = await productModelObj.updateProduct(productId,data);
            return products;
        }
        catch(e)
        {
            throw new Error();
        }
    }

    async addProduct(data)
    {
        try
        {
            var productModelObj = new productModel();
            var products = await productModelObj.addProduct(data);
            return products;
        }
        catch(e)
        {
            throw new Error();
        }
    }

    async getProductRecommendation(user)
    {
        try
        {
            var productModelObj = new productModel();
            var products = await productModelObj.getProductRecommendation(user);
            return products;
        }
        catch(e)
        {
            throw new Error();
        }
    }
};