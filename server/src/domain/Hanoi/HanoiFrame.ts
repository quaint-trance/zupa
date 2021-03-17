import { Player, HanoiData } from './HanoiTypes'

export default class Hanoi {
    protected id: HanoiData['id'];
    protected players: HanoiData['players'];
    protected rods: HanoiData['rods'];
    protected bestTime: HanoiData['bestTime'];
    protected startTime: HanoiData['startTime'];
    protected turn: HanoiData['turn'];
    protected eventStack: HanoiData['eventStack'];
    public t:'hanoi' = 'hanoi';
    
    protected constructor(data: Omit<HanoiData, 'eventStack'>){
        this.id = data.id;
        this.eventStack = [];
        this.players = data.players;
        this.rods = data.rods;
        this.startTime = data.startTime;
        this.bestTime = data.bestTime;
        this.turn = data.turn;
    }
    
    public getId(){
        return this.id;
    }

    public getPlayers(){
        return this.players;
    }

    public getScoreboard(){
        return this.players
            .map(p=>({score: p.score/1000, name: p.name}))
            .sort((a, b)=> b.score - a.score);
    }

    public getEvents(){
        return this.eventStack;
    }

    public getCurrentPlayer():Player|undefined{
        return this.players[this.turn];
    }

    public getAll():HanoiData{
        return {
            bestTime: this.bestTime,
            id: this.id,
            eventStack: this.eventStack,
            players: this.players,
            rods: this.rods,
            startTime: this.startTime,
            turn: this.turn,
        }
    }
}