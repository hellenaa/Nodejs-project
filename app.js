const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const dotenv = require('dotenv').config();

const app = express();

//database
const db = require('./config/database');

//test db
db.authenticate()
    .then(() => console.log('Database connected'))
    .catch(err => console.log('Error'+ err));

//bringing routes
const authRoutes = require('./routes/auth');
const usersRoutes = require('./routes/users');
const postsRoutes = require('./routes/posts');


//middlewares
app.use(bodyParser.json()); // parse application/json
app.use(cookieParser()); //cookie parser
app.use('/api', authRoutes);
app.use('/api', usersRoutes);
app.use('/api', postsRoutes);
app.use(function (err, req, res, next) {       //jwt token err showing
    if (err.name === 'UnauthorizedError') {
        res.status(401).send('invalid token...');
    }
});


const PORT = process.env.PORT || 3001;

app.listen(PORT, console.log(`Server started on port ${PORT}`));

