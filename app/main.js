const Game = require('../app/Game')
const Player = require('../app/Player')
const renderGame = require('../app/render')

const game = new Game(10, 10, "2d6")
const board = game.board
board.addWarp(3, 37)
board.addWarp(64, 45)
//game.addPlayer(new Player("Enermis"))
game.addPlayer(new Player("Fulgens"))
function setup() {
    createCanvas(800, 800);
    background(0)
    frameRate(5)
    rectMode(CENTER)
    textAlign(CENTER, CENTER)
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