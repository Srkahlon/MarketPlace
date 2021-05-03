'use strict'
const { BaseModel } = require('./baseModel');
const helpers = require('../commons/helpers.js').Helpers;
const fs = require('fs');
const promises = fs.promises;

module.exports.UserModel = class UserModel extends BaseModel {
    
    async getUsers()
    {
        try
        {
            var users = await this.read({filePath: '/../database/names.json',encoding: 'utf8'});
            return JSON.parse(users);
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
            var helperObj = new helpers();
            var users = await this.read({filePath: '/../database/names.json',encoding: 'utf8'});
            users = JSON.parse(users);
            var userIndex = helperObj.search(users,"id",parseInt(userId));
            if (userIndex != null)
            {
                return users[userIndex];
            }
            return null;
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
            var helperObj = new helpers();
            var followers = await this.read({filePath: '/../database/users.json',encoding: 'utf8'});
            followers = JSON.parse(followers);
            var followerIndex = helperObj.search(followers,"id",parseInt(userId));
            if (followerIndex != null)
            {
                return followers[followerIndex];
            }
            return null;
        }
        catch(e)
        {
            throw new Error();
        }
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