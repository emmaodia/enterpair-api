const express = require("express");
const app = express();
const bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.get('/', (req, res) => res.json({msg: "Hello ${req.user}!"}))

//Router Paths
const userRoute = require('./routes/user');
const pairRequestRoute = require('./routes/pairRequest');

//Endpoints
app.use('/api/v1/user', userRoute);
app.use('/api/v1/pairRequest', pairRequestRoute);

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

//Server COnfiguration
const port = 3000;  
app.listen(port, () => console.log(`App running on port ${port}!`))

module.exports = app;