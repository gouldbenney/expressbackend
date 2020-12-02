// modules
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');

const app = express();

// variable
const dbLink = process.env.DBLINK;
const port = process.env.PORT;
const userRoutes = require('./src/routes/userRoutes')

mongoose.connect(dbLink, { useNewUrlParser: true, useUnifiedTopology: true, usecreateIndex: true}, () => {
    app.listen(port, () => {
        console.info('DATABSE CONNECTED, SERVER IS UP')
    })
})

// middlewares
app.use(express.json())


// routes
app.use(userRoutes)

app.use('/index', express.static('public'))

app.get('/', (req, res) => {
    res.status(200).send('<h1> Hey you, Watsup </h1>')

    

})



