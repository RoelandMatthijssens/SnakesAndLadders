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