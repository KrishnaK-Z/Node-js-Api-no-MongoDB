// Fast, unopinionated, minimalist web framework for node.
const express = require('express');

// To store the object for the Express
const app = express();

// working with file and directory paths
const path = require('path');

// JSON Web Token (JWT)
const jwt = require('jsonwebtoken');

// Server side templating -view handler
const exphs = require('express-handlebars');

// designed to work in an asynchronous environment.
const mongoose = require('mongoose');

// loads environment variables from a .env file into process.env
require('dotenv/config');

// Returns a object that contains the company details --Model
const companies = require('./Companies');

// enable CORS with various options.
const cors = require('cors');

// Custom middleware
const logger = require('./middleware/logger');

// To enable CROS
app.use(cors());

// handlebars middleware
app.engine('handlebars', exphs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

/**
 * operations that are called BETWEEN processing the Request
 * and sending the Response in your application method.
 */
app.use(express.json()); // Request as JSON Object
app.use(express.urlencoded({ extended: false })); // Request as string or array

// Init middleware
// app.use(logger);

/**
 * Route for view handlers example.
 * Second parameter -> object of data.
 */
app.get('/', (request, response) => {
    response.render('index', {
        title: "Companies App",
        companies
    });
});

/**
 * For JWT practice
 * Autherization : Bearer <access_token>
 */

app.post('/api/login', (request, response) => {
    // Payload unique for each user
    const user = {
        id: 1,
        email: 'krishna@gmail.com',
        password: 'krishna_z'
    };
    // Asynchronously
    jwt.sign({ user }, 'secret', { expiresIn: '30s' }, (error, token) => {
        if (error) {
            response.sendStatus(403); //Forbidden
        } else {
            response.json({
                token
            });
        }
    });
});

/**
 * Send the request with authentication header containing token value
 * logger middleware appends the token to the request.token
 */
app.post('/api/posts', logger, (request, response) => {
    jwt.verify(request.token, 'secret', (error, authData) => {
        if (error) {
            response.sendStatus(403);
        } else {
            response.json({
                message: "Post created...",
                authData
            });
        }
    });
});

/**
 * end of JWT Token
 */



/**
 * MongoDB practice
 * Define a schema in model
 */

// mongoose.connect(
//         process.env.DB_CONNECTION, { useNewUrlParser: true })
//     .then(() => console.log("Mongo db connected"))
//     .catch(error => console.log(error));

// require the mongodb | get the MongoClient object from it.
const mongo = require('mongodb').MongoClient;

// Connect to the mongoDB
mongo.connect(process.env.DB_CONNECTION, { useNewUrlParser: true }, (error, client) => {
    if (error) {
        console.log(error);
        return;
    }
    // select a database using the client.db()
    const db = client.db('todo');

    // To select  the collection
    const collection = db.collection('companies');

    companies.forEach((company, index, companies) => {

        collection.find({ id: company.id }).toArray((error, item) => {
            if (error) {
                console.log(error);
                return;
            }
            if (item.length === 0) {

                collection.insertOne(company, (error, item) => {
                    if (error) {
                        console.log(error);
                        return;
                    }
                    console.log(item);
                });
            } else {
                return;
            }

        });
    });


    // collection.insertMany(companies, (error, result) => {
    //     if (error) {
    //         console.error("Error in inserting data ", error);
    //         return;
    //     }
    //     console.log(result);
    // });
});

// contains the logic for an end point --for mongo db
const postsRoute = require('./routes/api/mongo/posts');

app.use('/mongo', postsRoute);

/**
 * End of MongoDB
 */


// set the static folder
app.use(express.static(path.join(__dirname, 'public')));

app.use('/api/members', require('./routes/api/members'));


// To set the port number in which the server is running
const PORT = process.env.PORT || 5000;

// Create a Server
app.listen(PORT, () => {
    console.log(`Listening to port ${PORT}`);
});