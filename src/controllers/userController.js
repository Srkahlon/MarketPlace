'use strict'
const userService = require('../services/userService.js').UserService;

//Controller for the User Module.
module.exports.UserController = class UserController {
    
    //Function to list all users
    async listUsers(req,res)
    {
        try
        {
            var userServiceObj = new userService();
            var users = await userServiceObj.getUsers();
            res.render('pages/users/index', {
                users: users
            });
        }
        catch(e)
        {
            res.render('errors/500');
        }
    }

    async loginUser(req,res)
    {
        try
        {
            req.session.user = req.body.user;
            await req.session.save();
            res.redirect('/products');
        }
        catch(e)
        {
            res.render('errors/500');
        }
    }

    async logout(req,res)
    {
        try
        {
            req.session.user = null;
            await req.session.save();
            res.redirect('/login');
        }
        catch(e)
        {
            res.render('errors/500');
        }
    }
};