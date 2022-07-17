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
    this.initPutJoinMatch();
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
    this.#app.ws('/game', (ws, req) => {
      console.log(req.query.id);
      
      ws.on('message', () => {});
      ws.on('close', () => {});
      ws.on('error', () => {});
    });
  }

  initGetAllMatches() {
    this.#app.get('/matches', (req, res) => {
      res.send(this.this.#matchManager.matches).sendStatus(200);
    });
  }

  initPutSingleMatch() {
    this.#app.put('/match', (req, res) => {
      if (!this.validateMatchPutBody(req.body)) {
        res.sendStatus(400);
      }
      const matchId = this.#matchManager.createMatch(req.body);
      this.sendMatchesToAllConnections();
      res.send(JSON.stringify(matchId)).sendStatus(200);
    });
  }

  initPutJoinMatch() {
    this.#app.put('/join', (req, res) => {
      if (!this.validateJoinMatchBody(req.body)) {
        res.sendStatus(400);
      }
      const id = this.#matchManager.joinMatch(req.body.matchId);
      if (id) {
        this.sendMatchesToAllConnections();
        res.send(JSON.stringify(id)).sendStatus(200);
      } else {
        res.sendStatus(404);
      }
    });
  }

  validateMatchPutBody(body) {
    return typeof body.isRanked === 'boolean' && Array.isArray(body.allowedGames)
  }
  
  validateJoinMatchBody(body) {
    return typeof body.matchId === 'string' && !!body.matchId;
  }

  sendMatchesToAllConnections() {
    const data = JSON.stringify(this.#matchManager.matches);
    this.#connections.forEach(x => {
      x.webSocket.send(data);
    })
  }
}

module.exports = MatchesController;