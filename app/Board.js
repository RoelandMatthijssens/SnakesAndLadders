const Tile = require('../app/Tile')
const Warp = require('../app/Warp')

class Board {
    constructor(height, width) {
        this.height = height
        this.width = width
        this.tiles = []
        this.warps = []
        this.snakes = []
        this.ladders = []
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

    get size() {
        return this.tiles.length
    }

    addWarp(from, to) {
        this.warps.push(new Warp(from, to))
    }

    applyWarps(player) {
        for (const warp of this.warps) {
            const warped = warp.apply(player)
            if (warped) {
                break
            }
        }
    }
}

module.exports = Board