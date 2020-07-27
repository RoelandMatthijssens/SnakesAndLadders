const Tile = require('../app/Tile')

class Board {
    constructor(height, width) {
        this.height = height
        this.width = width
        this.tiles = []
        this.snakes = []
        this.ladders = []
        this.players = []
        this.initialize()
    }
    initialize() {
        for (let i = 0; i < this.height * this.width; i++) {
            this.tiles.push(new Tile(i))
        }
    }
    get(position) {
        return this.tiles[position]
    }
    addLadder(from, to) {
        this.ladders.push(1)
    }
    addSnake(from, to) {
        this.snakes.push(1)
    }
}

module.exports = Board