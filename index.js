const express = require('express');
const path = require('path');
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