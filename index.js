const express = require('express');
const path = require('path');
const jwt = require('jsonwebtoken');
const exphs = require('express-handlebars');
const companies = require('./Companies');

const logger = require('./middleware/logger');

const app = express();

// handlebars middleware
app.engine('handlebars', exphs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

app.use(express.json());
app.use(express.urlencoded({extended: false }));
// Init middleware
// app.use(logger);

app.post('/api/posts',logger, (request, response)=>{
    jwt.verify(request.token, 'secret', (error, authData) => {
        if(error)
        {
            response.sendStatus(403);
        } else{
            response.json({
                message: "Post created...",
                authData
            });     
        }
    });
});

app.post('/api/login', (request, response)=>{
    const user = {
        id: 1,
        email: 'krishna@gmail.com',
        password: 'krishna_z'
    };
    jwt.sign({user}, 'secret', { expiresIn: '30s' }, (error, token) => {
        if(error)
        {
            response.sendStatus(403);
        }
        else{
            response.json({
                token
            });
        }
    });
});

// Format of token
// Autherozation : Bearer <access_token>
function verifyToken(request, response, next){
    // get auth header value
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
}

app.get('/', (request, response)=>{
    response.render('index', {
        title: "Companies App",
        companies
    });
});

// set the static folder
app.use(express.static(path.join(__dirname,'public')));

app.use('/api/members', require('./routes/api/members'));



const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Listening to port ${PORT}`);
});