"use strict";
import express from 'express';

class MatchesController {
  #app
  #matches = [];
  constructor(app) {
    this.#app = app;
    this.initGets();
    this.initDeletes();
    this.initPosts();
    this.initPuts();
    console.log('MatchesController created!');
  }


  initGets () {
    this.initGetAllMatches();
  }

  initPuts () {

  }

  initPosts () {

  }

  initDeletes () {

  }

  initGetAllMatches() {
    this.#app.get('/matches', (req, res) => {
      res.send(this.#matches).sendStatus(200);
    });
  }
}

const app = express();

app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.header('Access-Control-Allow-Methods', '*');
  next();
});

new MatchesController(app);


app.listen(1337, () => {
  console.log('Server is up bitcheeees');
});







