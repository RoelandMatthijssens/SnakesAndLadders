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
    playTurn() {
        this.activePlayer.takeTurn(this.dice)
        this.preventOvershoot(this.activePlayer)
        this.board.applyWarps(this.activePlayer)
        this.nextPlayer()
    }
    isFinished() {
        let finished = false
        for (const player of this.players) {
            if (player.position === this.board.size - 1) {
                finished = true
            }
        }
        return finished
    }
    preventOvershoot(player) {
        const maxPosition = this.board.size - 1
        if (player.position > maxPosition) {
            player.position = maxPosition - (player.position - maxPosition)
        }
    }
}

module.exports = Game