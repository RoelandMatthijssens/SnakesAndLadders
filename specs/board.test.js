const Board = require('../app/Board')
const Player = require('../app/Player')

describe('Board', () => {
    describe('setup', () => {
        beforeEach(() => {
            b = new Board(20, 10)
        });
        it('has a size', () => {
            expect(b.height).toBe(20);
            expect(b.width).toBe(10);
        })
        it('has many tiles', () => {
            expect(b.tiles.length).toBe(200);
        });
        it('has many snakes', () => {
            expect(b.snakes).toBeInstanceOf(Array)
        });
        it('has many ladders', () => {
            expect(b.ladders).toBeInstanceOf(Array)
        });
    });
    describe('behavior', () => {
        beforeEach(() => {
            b = new Board(20, 10)
        });
        it('should get a tile', () => {
            tile = b.get(12)
            expect(tile.position).toBe(12);
        });
        it('should add a ladder', () => {
            b.addLadder(20, 50)
            expect(b.ladders.length).toBe(1);
        });
        it('should add a snakes', () => {
            b.addSnake(15, 10)
            expect(b.snakes.length).toBe(1);
        });
    });
});
