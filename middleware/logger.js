const moment = require('moment');

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