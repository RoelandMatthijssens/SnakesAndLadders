const Board = require('../app/Board')
const Dice = require('../app/Dice')

class Game {
    constructor(height, width, dice) {
        this.board = new Board(height, width)
        this.players = []
        this.dice = new Dice(dice)
    }
    addPlayer(player) {
        this.players.push(player)
    }
    get activePlayer() {
        if (this.players.length !== 0) {
            return this.players[0]
        }
    }
    nextPlayer() {
        this.players = this.players.slice(1, this.players.length).concat(this.players.slice(0, 1));
    }
}

module.exports = Game