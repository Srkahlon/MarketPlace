'use strict'
const userModel = require('../models/userModel.js').UserModel;

module.exports.UserService = class UserService {
    
    async getUsers()
    {
        try
        {
            var userModelObj = new userModel();
            var users = await userModelObj.getUsers();
            return users;
        }
        catch(e)
        {
            throw new Error();
        }
    }

    async getUser(userId)
    {
        try
        {
            var userModelObj = new userModel();
            var users = await userModelObj.getUser(userId);
            return users;
        }
        catch(e)
        {
            throw new Error();
        }
    }

    async getUserFollowers(userId)
    {
        try
        {
            var userModelObj = new userModel();
            var users = await userModelObj.getUserFollowers(userId);
            return users;
        }
        catch(e)
        {
            throw new Error();
        }
    }
};