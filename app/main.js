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