/**
 *  A lightweight JavaScript date library for parsing, validating,
 *  manipulating, and formatting dates.
 */
const moment = require('moment');

// A middleware to append the token to the request
const logger = (request, response, next)=>{
    const bearerHeader = request.headers['authorization'];

    if(typeof(bearerHeader)!=='undefined')
    {
        const token = bearerHeader.split(' ')[1];
        request.token = token;
        next();
    }
    else{
        response.sendStatus(403);
    }

};

module.exports = logger;
