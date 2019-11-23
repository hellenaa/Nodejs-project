const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const dotenv = require('dotenv').config();
const fs = require('fs');

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
//api docs
app.get('/', (req, res) => {
    fs.readFile("docs/apiDocs.json", (err, data)=> {
        if(err) {
            res.status(400).json({ error: err});
        }
        const docs = JSON.parse(data);
        res.json(docs);
    });
});


//middlewares
app.use(bodyParser.json()); // parse application/json
app.use(cookieParser()); //cookie parser
app.use(cors());  // cors for using different domains and ports(like react 3000 and node 3001)
app.use('/', authRoutes);
app.use('/', usersRoutes);
app.use('/', postsRoutes);
app.use(function (err, req, res, next) {       //jwt token err showing
    if (err.name === 'UnauthorizedError') {
        res.status(401).send('invalid token...');
    }
});


const PORT = process.env.PORT || 3001;

app.listen(PORT, console.log(`Server started on port ${PORT}`));

