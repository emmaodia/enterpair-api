const express = require("express");
const app = express();
const bodyParser = require('body-parser');
const port = 3000;

app.get('/', (req, res) => res.json({msg: "Hello!"}))

app.listen(port, () => console.log(`App running on port ${port}!`))

module.exports = app;