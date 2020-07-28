const Game = require('../app/Game')
const Board = require('../app/Board')
const Player = require('../app/Player')
const Dice = require('../app/Dice')

describe('Game', () => {
    describe('setup', () => {
        beforeEach(() => {
            g = new Game(10, 10, '2d6')
        });
        it('has a board', () => {
            expect(g.board).toBeInstanceOf(Board);
        });
        it('has many players', () => {
            expect(g.players).toBeInstanceOf(Array);
        });
        it('has an active player', () => {
            g.addPlayer(new Player('Enermis'))
            expect(g.activePlayer).toBeInstanceOf(Player);
        });
        it('has dice', () => {
            expect(g.dice).toBeInstanceOf(Dice);
        });
    });
    describe('behavior', () => {
        beforeEach(() => {
            g = new Game(10, 10, '2d6')
        });
        it('should add a player', () => {
            p = new Player('Enermis')
            g.addPlayer(p)
            expect(g.players.length).toBe(1);
        });
        it('should get the active player', () => {
            g.addPlayer(new Player('Enermis'))
            g.addPlayer(new Player('Fulgens'))
            expect(g.activePlayer.name).toBe('Enermis');
        });
        it('should set the next active player', () => {
            g.addPlayer(new Player('Enermis'))
            g.addPlayer(new Player('Fulgens'))
            g.nextPlayer()
            expect(g.activePlayer.name).toBe('Fulgens');
        });
        it('should play the turn', () => {
            p = new Player('Enermis')
            g.addPlayer(p)
            expect(p.position).toBe(0);
            g.playTurn()
            expect(p.position).toBeGreaterThan(0);
        });
        it('uses the game dice to play a player turn', () => {
            p = new Player('Enermis')
            g.dice.setLambda(() => { return 15 })
            g.addPlayer(p)
            g.playTurn()
            expect(p.position).toBe(15);
        });
        it('should consider warps when playing a turn', () => {
            p = new Player('Enermis')
            g.dice.setLambda(() => { return 10 })
            g.board.addWarp(10, 30)
            g.addPlayer(p)
            g.playTurn()
            expect(p.position).toBe(30);
        });
        it('should progress the turn to the next player', () => {
            g.addPlayer(new Player('Enermis'))
            g.addPlayer(new Player('Fulgens'))
            g.playTurn()
            expect(g.activePlayer.name).toBe('Fulgens');
        });
    });
});