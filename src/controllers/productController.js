'use strict'
const productService = require('../services/productService.js').ProductService;
const userService = require('../services/userService.js').UserService;
const moment = require("moment");

//Controller for the Product Module.
module.exports.ProductController = class ProductController {
    
    //Lists all products
    async listProducts(req,res)
    {
        try
        {
            var productServiceObj = new productService();
            var userServiceObj = new userService();
            var products = await productServiceObj.listProducts();
            var user;
            if(req.session.user)
            {
                user = await userServiceObj.getUser(req.session.user);
            }
            res.render('pages/products/index', {
                products: products,
                moment: moment,
                user: user
            });
        }
        catch(e)
        {
            res.render('errors/500');
        }
    }

    //Render edit product page
    async editProduct(req,res)
    {
        try
        {
            var productId = parseInt(req.params.id);
            var productServiceObj = new productService();
            var product = await productServiceObj.getProduct(productId);
            if(product)
            {
                res.render('pages/products/edit', {
                    product: product
                });
            }
            else
            {
                res.render('errors/404');
            }
        }
        catch(e)
        {
            res.render('errors/500');
        }
    }

    //Update a product
    async updateProduct(req,res)
    {
        try
        {
            var productId = parseInt(req.params.id);
            var data = req.body;
            var productServiceObj = new productService();
            await productServiceObj.updateProduct(productId,data);
            res.redirect('/products');
        }
        catch(e)
        {
            res.render('errors/500');
        }
    }

    //Get a specific product
    async getProduct(req,res)
    {
        try
        {
            var productId = parseInt(req.params.id);
            var productServiceObj = new productService();
            var userServiceObj = new userService();
            var product;
            var userId = null;
            if(req.session.user)
            {
                userId = req.session.user;
            }
            product = await productServiceObj.getProduct(productId,userId);
            if(product)
            {
                var users = [];
                if(product.hasOwnProperty("views") && product.views.length > 0)
                {
                    for(var user of product.views)
                    {
                        users.push(await userServiceObj.getUser(user));
                    }
                }
                res.render('pages/products/details', {
                    product: product,
                    moment: moment,
                    users: users
                });
            }
            else
            {
                res.render('errors/404');
            }
        }
        catch(e)
        {
            res.render('errors/500');
        }
    }

    //Add a product
    async addProduct(req,res)
    {
        try
        {
            var data = req.body;
            var productServiceObj = new productService();
            await productServiceObj.addProduct(data);
            res.redirect('/products');
        }
        catch(e)
        {
            res.render('errors/500');
        }
    }

    //Get product recommendations
    async getProductRecommendation(req,res)
    {
        try
        {
            if(req.session.user)
            {
                var productServiceObj = new productService();
                var userServiceObj = new userService();
                var userId = req.session.user;
                var user = await userServiceObj.getUserFollowers(userId);
                var products = [];
                if(user != null)
                {
                    products = await productServiceObj.getProductRecommendation(user);
                }
                res.render('pages/products/recommendation', {
                    products: products
                });
            }
            else
            {
                res.render('errors/403');
            }
        }
        catch(e)
        {
            res.render('errors/500');
        }
    }

};