const Player = require('../app/Player')
const Dice = require('../app/Dice')

describe('Player', () => {
    describe('setup', () => {
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
    describe('behavior', () => {

        beforeEach(() => {
            p = new Player('john doe')
        });
        it('should take a turn', () => {
            d = new Dice('1d6')
            p.takeTurn(d)
            expect(p.position).not.toBe(0);
        })
        it('should move the player', () => {
            p.move(2)
            expect(p.position).toBe(2);
        });
    });
});