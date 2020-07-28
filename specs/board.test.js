const Board = require('../app/Board')
const Player = require('../app/Player')
const Warp = require('../app/Warp')

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
        it('has many warps', () => {
            expect(b.warps).toBeInstanceOf(Array)
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
    });
    describe('warps', () => {
        beforeEach(() => {
            b = new Board(20, 10)
            p = new Player('Enermis')
        });
        describe('Creation', () => {
            it('should add a warp', () => {
                b.addWarp(20, 50)
                expect(b.warps.length).toBe(1);
                expect(b.warps[0]).toBeInstanceOf(Warp);
            });
        });
        describe('Application', () => {
            it('applies warps', () => {
                b.addWarp(20, 50)
                p.position = 20
                b.applyWarps(p)
                expect(p.position).toBe(50);
            });
            it('doesnt chain warps', () => {
                b.addWarp(20, 50)
                b.addWarp(50, 55)
                p.position = 20
                b.applyWarps(p)
                expect(p.position).toBe(50);
            });
        });
    });
});
