const express = require('express');
const path = require('path');
const logger = require('./middleware/logger');

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: false }));
// Init middleware
// app.use(logger);

// set the static folder
app.use(express.static(path.join(__dirname,'public')));

app.use('/api/members', require('./routes/api/members'));



const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Listening to port ${PORT}`);
});