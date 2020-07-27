const Tile = require('../app/Tile')

describe('Tile', () => {
    it('it should have a position', () => {
        t = new Tile(12)
        expect(t.position).toBe(12)
    })
});
