const {v4: uuidv4, v1: uuidv1} = require('uuid');
const MatchManager = require('../manager/MatchManager');
class MatchesController {
  #app;
  #matchManager;
  #connections = [];

  constructor(app) {
    this.#app = app;
    this.#matchManager = MatchManager.getInstance();
    this.initGets();
    this.initDeletes();
    this.initPosts();
    this.initPuts();
    this.setUpWebSocket();
    console.log('MatchesController created!');
  }


  initGets() {
    this.initGetAllMatches();
  }

  initPuts() {
    this.initPutSingleMatch();
  }

  initPosts() {

  }

  initDeletes() {

  }
  setUpWebSocket() {
    this.#app.ws('/matches', (ws, req) => {
      const connectionId = uuidv1();
      const connection = {id: connectionId, webSocket: ws};
      this.#connections.push(connection);
      ws.send(JSON.stringify(this.#matchManager.matches));
      ws.on('close', () => this.#connections.splice(this.#connections.findIndex(x => x.id === connectionId), 1));
    });
  }

  initGetAllMatches() {
    this.#app.get('/matches', (req, res) => {
      res.send(this.this.#matchManager.matches).sendStatus(200);
    });
  }

  initPutSingleMatch() {
    this.#app.put('/match', (req, res) => {
      console.log(req.body);
      if (!this.validateMatchPutBody(req.body)) {
        res.sendStatus(400);
      }
      const matchId = this.#matchManager.createMatch(req.body);
      this.sendMatchesToAllConnections();
      res.send(JSON.stringify(matchId)).sendStatus(200);
    });
  }

  validateMatchPutBody(body) {
    return typeof body.isRanked === 'boolean' && Array.isArray(body.allowedGames)
  }

  sendMatchesToAllConnections() {
    const data = JSON.stringify(this.#matchManager.matches);
    this.#connections.forEach(x => {
      x.webSocket.send(data);
    })
  }
}

module.exports = MatchesController;