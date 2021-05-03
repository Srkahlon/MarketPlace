'use strict'
const helpers = require('../commons/helpers.js').Helpers;
const { BaseModel } = require('./baseModel');
const fs = require('fs');
const promises = fs.promises;

module.exports.ProductModel = class ProductModel extends BaseModel{
    
    async getProducts()
    {
        try
        {
            var products = await this.read({filePath: '/../database/products.json', encoding:'utf8'});
            products = this.sortProductsByDateModified(JSON.parse(products));
            return products;
        }
        catch(e)
        {
            throw new Error();
        }
    }

    async getProduct(productId,userId)
    {
        try
        {
            var helperObj = new helpers();
            var products = await this.read({filePath: '/../database/products.json', encoding:'utf8'});
            products = JSON.parse(products);
            var productIndex = helperObj.search(products,"productId",productId);
            if (productIndex != null)
            {
                if(userId)
                {
                    if(products[productIndex].views)
                    {
                        if(!(products[productIndex].views).includes(userId))
                        {
                            products[productIndex].views.push(userId);
                            await this.write({filePath:'/../database/products.json', content: products,encoding:'utf-8'});
                        }
                    }
                    else
                    {
                        products[productIndex]["views"] = [userId];
                        await this.write({filePath:'/../database/products.json', content: products,encoding:'utf-8'});
                    }
                }
                return products[productIndex];
            }
            return null;
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
            var helperObj = new helpers();
            var products = await this.read({filePath: '/../database/products.json', encoding:'utf8'});
            products = JSON.parse(products);
            var productIndex = helperObj.search(products,"productId",productId);
            if (productIndex)
            {
                products[productIndex].productCategory = data.product_category;
                products[productIndex].productName = data.product_name;
                products[productIndex].productImage = data.product_image_url;
                if(data.stock == "1")
                {
                    products[productIndex].productStock = true;
                }
                else
                {
                    products[productIndex].productStock = false;
                }
                products[productIndex].productPrice = data.product_price;
                products[productIndex].salePrice = data.product_sale_price;
                products[productIndex].dateModified = new Date();
                await this.write({filePath:'/../database/products.json', content: products,encoding:'utf-8'});
                return products;
            }
            else
            {
                return product;
            }
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
            var products = await this.read({filePath: '/../database/products.json', encoding:'utf8'});
            products = JSON.parse(products);
            var lastProductId = products[products.length-1].productId;
            var stock;
            if(data.stock == "1")
            {
                stock = true;
            }
            else
            {
                stock = false;
            }
            products.push(
                {
                    productId : lastProductId + 1,
                    productCategory : data.product_category,
                    productName : data.product_name,
                    productImage : data.product_image_url,
                    productStock : stock,
                    productPrice : data.product_price,
                    salePrice : data.product_sale_price,
                    dateModified : new Date()
                }   
            )
            await this.write({filePath:'/../database/products.json', content: products,encoding:'utf-8'});
            products = this.sortProductsByDateModified(products);
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
            var products = await this.read({filePath: '/../database/products.json', encoding:'utf8'});
            products = JSON.parse(products);
            var recommended_products =  products.filter(function(product) {
                if(product.hasOwnProperty("views") && product.views.length > 0 && !product.views.includes((user.id).toString()))
                {
                    var common = user.following.filter(value => product.views.includes((value).toString()));
                    if(common.length > 0)
                    {
                        return product;
                    }
                }
            });
            return recommended_products;
        }
        catch(e)
        {
            throw new Error();
        }
    }

    sortProductsByDateModified(products)
    {
        var sortedProducts = products.slice().sort((a, b) =>{
            if(a.dateModified < b.dateModified)
            {
                return 1;
            }
            else if(a.dateModified > b.dateModified){
                return -1;
            } 
            else
            {
                if(a.productId > b.productId)
                {
                    return 1;
                }
                else
                {
                    return -1;
                }    
            }
        })
        return sortedProducts;
    }

    async read(data)
    {
        try
        {
            var content = await promises.readFile(__dirname + data.filePath, data.encoding);
            return content;
        }
        catch(e)
        {
            throw new Error();
        }
    }

    async write(data)
    {
        try
        {
            await promises.writeFile(__dirname + data.filePath, JSON.stringify(data.content), data.encoding);
            return 1;
        }
        catch(e)
        {
            throw new Error();
        }
    }
};