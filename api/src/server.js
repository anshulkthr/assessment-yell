const express = require('express');
const bodyParser = require('body-parser');
const cors = require("cors");

const app = express();

const fs = require('fs');

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const routes = require('./routes/routes.js')(app, fs);

exports.startServer = () => {
  const port = process.env.PORT || "3001";
  app.listen(port, () => console.log("Listening on :3001"));
}