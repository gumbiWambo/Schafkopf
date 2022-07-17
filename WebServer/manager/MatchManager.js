const { v4: uuidv4, v1: uuidv1, v5: uuidv5 } = require('uuid');
const Match = require('../classes/match');
let manager;
class MatchManager {
  #matches = [];
  get matches() {
    return this.#matches.filter(match => !match.full);
  }
  constructor() {}

  static getInstance() {
    if(!manager) {
      manager = new MatchManager();
    }
    return manager
  }

  createMatch(matchInformation) {
    const matchId = uuidv4();
    const match = new Match();
    match.id = matchId;
    match.name = matchInformation.name;
    match.allowedGames = matchInformation.allowedGames;
    match.isRanked = matchInformation.isRanked;
    this.#matches.push(match);
    return matchId
  }

  addSocketToGame(ws, id) {
    const match = this.#matches.find(ma => ma.id === id);
    if(match) {
      match.registerWebSocket(ws);
    }
  }

  joinMatch(matchId) {
    const match = this.#matches.find(x => x.id === matchId);
    if (match && !match.full) {
      match.joinedPlayers += 1;
      match.full = match.joinedPlayers === 4;
      return matchId;
    }
    return false;
  }

}

module.exports = MatchManager;