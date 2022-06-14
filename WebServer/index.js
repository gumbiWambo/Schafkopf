"use strict";
const express = require('express');
const expressWs = require('express-ws')
const MatchesController = require('./controller/MatchesController');


const app = express();
expressWs(app);
app.use(express.json());

app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.header('Access-Control-Allow-Methods', '*');
  next();
});

const matches = new MatchesController(app);


app.listen(1337, () => {
  console.log('Server is up bitcheeees');
});

