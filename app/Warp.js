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