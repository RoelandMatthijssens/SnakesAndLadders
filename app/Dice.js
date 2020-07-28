class Dice {
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

module.exports = Dice