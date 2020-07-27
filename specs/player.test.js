const Player = require('../app/Player')

describe('Player', () => {
    beforeEach(() => {
        p = new Player('john doe')
    });
    it('has a name', () => {
        expect(p.name).toBe('john doe');
    })
    it('has a position', () => {
        expect(p.position).toBe(0);
    })
});