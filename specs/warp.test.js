const Warp = require('../app/Warp')
const Player = require('../app/Player')

describe('Warp', () => {
    describe('setup', () => {
        beforeEach(() => {
            w = new Warp(10, 15)
        });
        it('has a from', () => {
            expect(w.from).toBe(10);
        })
        it('has a to', () => {
            expect(w.to).toBe(15);
        })
        it('shouldnt move to the same position', () => {
            expect(() => { new Warp(10, 10) }).toThrowError(Error)
        });
        it('should apply to a given player', () => {
            p = new Player('Enermis')
            p.position = 10
            w.apply(p)
            expect(p.position).toBe(15);
        });
        it('shouldnt apply if the player is not on the from position', () => {
            p = new Player('Enermis')
            p.position = 12
            w.apply(p)
            expect(p.position).toBe(12);
        });
        it('returns if the warp applied to the player', () => {
            p = new Player('Enermis')
            p.position = 10
            result = w.apply(p)
            expect(result).toBeTruthy();
            p.position = 12
            result = w.apply(p)
            expect(result).not.toBeTruthy();
        });
    });
});