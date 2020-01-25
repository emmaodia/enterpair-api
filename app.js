const express = require("express");
const app = express();
const bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.get('/', (req, res) => res.json({msg: "Hello!"}))

//Router Paths
const userRoute = require('./routes/user');
const pairRequestRoute = require('./routes/pairRequest');

//Endpoints
app.use('/api/v1/user', userRoute);
app.use('/api/v1/pairRequest', pairRequestRoute);

function connectDatabaseAndStartApp() {

}

//Database Configuration
const mongoose = require("mongoose");
const url = "mongodb://localhost:27017/enterpair-api";

mongoose.Promise = global.Promise;

// Connecting to the database
mongoose.connect( url , {
    keepAlive: true,
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false
  })
  .then(() => {
      console.log("Successfully connected to the database");
  }).catch(err => {
      console.log('Could not connect to the database. Exiting now...');
      console.log(err)
      process.exit();
  });

//Error Handling set up
app.use((req, res, next) => {
    const error = new Error('404 Page Not found');
    error.status = 404;
    next(error);
  });
  
  app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
      error: {
        message: error.message
      }
    });
  });

module.exports = app;