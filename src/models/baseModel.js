'use strict'

module.exports.BaseModel = class BaseModel {
    
    async read(data)
    {
        //Read Method to be overriden by Child Class
    }

    async write(data)
    {
        //Write Method to be overriden by Child Class
    }
};