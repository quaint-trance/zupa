import { Player, HanoiData } from './HanoiTypes'

export default class Hanoi {
    protected id: HanoiData['id'];
    protected players: HanoiData['players'];
    protected rods: HanoiData['rods'];
    protected bestTime: HanoiData['bestTime'];
    protected startTime: HanoiData['startTime'];
    protected turn: HanoiData['turn'];
    protected eventStack: HanoiData['eventStack'];
    
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
        return this.bestTime;
    }

    public getEvents(){
        return this.eventStack;
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