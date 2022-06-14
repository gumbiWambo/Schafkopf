const {v4: uuidv4, v1: uuidv1} = require('uuid');
let manager;
class MatchManager {
  #matches = [];
  get matches() {
    return this.#matches;
  }
  constructor() {}
  static getInstance() {
    if(!manager) {
      manager = new MatchManager();
    }
    return manager
  }
  createMatch(matchInformation) {
    const matchId = uuidv4()
    const match = { id: matchId, ...matchInformation }
    this.#matches.push(match);
    return matchId
  }
}

module.exports = MatchManager;