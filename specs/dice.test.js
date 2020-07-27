const Dice = require('../app/Dice')

describe('Dice', () => {
    beforeEach(() => {
        d = new Dice('2d6')
    });
    it('rolls', () => {
        expect(Number.isInteger(d.roll())).toBeTruthy()
    });
    it('should roll a d6', () => {
        d = new Dice('1d6')
        roll = d.roll()
        expect(roll).toBeGreaterThanOrEqual(1);
        expect(roll).toBeLessThanOrEqual(6);
    });
    it('should roll each value about the same amount', () => {
        d = new Dice('1d6')
        results = [0, 0, 0, 0, 0, 0]
        let i = 0
        while (i <= 1000) {
            i++
            roll = d.roll()
            results[roll - 1] = results[roll - 1] + 1
        }
        const sum = results.reduce((a, b) => a + b, 0);
        const avg = (sum / results.length) || 0;
        for (const amount of results) {
            // error margin of 25%
            expect(amount).toBeGreaterThanOrEqual(avg * 0.75);
            expect(amount).toBeLessThanOrEqual(avg * 1.25);
        }
    });
});