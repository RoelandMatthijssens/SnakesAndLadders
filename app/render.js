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