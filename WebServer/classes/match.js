class Match {
  name = '';
  allowedGames = [];
  isRanked = false;
  id = '';
  joinedPlayers = 0;
  full = false;
  sockets = [];

  constructor() {}

  registerWebSocket(ws) {
    if(!(this.full && this.joinedPlayers === this.sockets.length)) {
      this.sockets.push(ws);
    }
    
  }

  sendToAllSockets(telegram) {
    this.sockets.forEach(ws => {
      ws.send(JSON.stringify(telegram));
    });
  }
  
}

module.exports = Match;
