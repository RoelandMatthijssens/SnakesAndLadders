(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
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
    addLadder(from, to) {
        this.ladders.push(new Ladder(from, to))
    }
    addSnake(from, to) {
        this.snakes.push(new Snake(from, to))
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
},{"../app/Tile":5,"../app/Warp":6}],2:[function(require,module,exports){
class Game {
    constructor(description) {
        this.lambda = () => {
            const min = 1
            const max = 6
            return Math.floor(Math.random() * (max + 1 - min)) + min;
        }
    }
    roll() {
        return this.lambda()
    }
    setLambda(lambda) {
        this.lambda = lambda
    }

}

module.exports = Game
},{}],3:[function(require,module,exports){
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
},{"../app/Board":1,"../app/Dice":2}],4:[function(require,module,exports){
class Player {
    constructor(name) {
        this.position = 0
        this.name = name
    }
    move(amount) {
        this.position += amount
    }
    takeTurn(dice) {
        const roll = dice.roll()
        this.move(roll)
    }
}

module.exports = Player
},{}],5:[function(require,module,exports){
class Tile {
    constructor(position) {
        this.position = position
    }
}

module.exports = Tile
},{}],6:[function(require,module,exports){
class Warp {
    constructor(from, to) {
        this.from = from
        this.to = to
        if (from === to) {
            throw new Error("Warps shouldn't move to same position")
        }
    }
    apply(player) {
        if (player.position === this.from) {
            player.position = this.to
            return true
        }
        return false
    }
}

module.exports = Warp
},{}],7:[function(require,module,exports){
const Game = require('../app/Game')
const Player = require('../app/Player')
const renderGame = require('../app/render')

const game = new Game(10, 10, "2d6")
const board = game.board
const snakes = [
    [32, 10],
    [34, 6],
    [48, 27],
    [63, 18],
    [88, 24],
    [95, 56],
    [97, 78],
]
const ladders = [
    [8, 20],
    [4, 14],
    [2, 38],
    [21, 42],
    [28, 76],
    [50, 67],
    [71, 92],
    [80, 98],
]
function setup() {
    createCanvas(800, 800);
    background(0)
    frameRate(5)
    rectMode(CENTER)
    textAlign(CENTER, CENTER)

    game.addPlayer(new Player("Enermis"))
    game.addPlayer(new Player("Fulgens"))
    for (const [from, to] of ladders) {
        board.addWarp(from, to)
    }
    for (const [from, to] of snakes) {
        board.addWarp(from, to)
    }

    renderGame(game, canvas)
}

function draw() {
    background(0)
    game.playTurn()
    renderGame(game, canvas)
    if (game.isFinished()) {
        noLoop()
    }
}

window.setup = setup
window.draw = draw
},{"../app/Game":3,"../app/Player":4,"../app/render":8}],8:[function(require,module,exports){
function renderGame(game, canvas) {
    renderBoard(game.board, canvas)

    for (let player of game.players) {
        renderPlayer(player, game.board)
    }
}

function renderBoard(board, canvas) {
    const tileSize = canvas.height / board.height

    for (let tile of board.tiles) {
        [x, y] = tileCenterPixel(tile, board)
        renderTile(tile, tileSize, x, y)
    }

    for (let warp of board.warps) {
        renderWarp(warp, board)
    }
}

function renderTile(tile, size, x, y) {
    noFill()
    stroke(200)
    strokeWeight(1)
    rect(x, y, size, size)
    text(tile.position, x, y)
}

function tileCenterPixel(tile, board) {
    const x = tile.position % board.width
    const y = floor(tile.position / board.height)
    const tileSize = canvas.height / board.height
    return [
        x * tileSize + tileSize / 2,
        y * tileSize + tileSize / 2
    ]
}

function positionCenterPixel(pos, board) {
    return tileCenterPixel(board.get(pos), board)
}

function renderWarp(warp, board) {
    const SNAKE_COLOR = 100
    const LADDER_COLLOR = 200
    const [x1, y1] = positionCenterPixel(warp.from, board)
    const [x2, y2] = positionCenterPixel(warp.to, board)
    stroke(warp.from.position > warp.to.position ? SNAKE_COLOR : LADDER_COLLOR)
    noFill()
    strokeWeight(3)
    line(x1, y1, x2, y2)
}

function renderPlayer(player, board) {
    const [x, y] = positionCenterPixel(player.position, board)
    noFill()
    strokeWeight(3)
    ellipse(x, y, 20)
    strokeWeight(1)
    text(player.name[0], x, y)
}

module.exports = renderGame
},{}]},{},[7]);
