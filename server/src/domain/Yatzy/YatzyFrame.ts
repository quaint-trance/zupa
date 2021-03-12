import { eventType } from '../../types/EventEmitter';
import { Player, YatzyData } from './YatzyTypes'

export default class YatzyFrame{
    protected id: string;
    protected players: Player[];
    protected turn: number;
    protected throwCount: number;
    protected dice: number[];
    protected eventStack: eventType[];

    protected constructor(data: Omit<YatzyData, 'eventStack'>){
        this.id = data.id;
        this.players = data.players;
        this.turn = data.turn;
        this.throwCount = data.throwCount;
        this.dice = data.dice;
        this.eventStack = [];
    }

    public getPlayers(){
        return this.players;
    }
    
    public getTurn(){
        return this.turn;
    }
    
    public getDice(){
        return this.dice;
    }
    
    public getCurrentPlayer():Player | undefined{
        return this.players[this.turn];
    }

    public getId(){
        return this.id;
    }

    public getAll(){
        return{
            id: this.id,
            players: this.players,
            turn: this.turn,
            throwCount: this.throwCount,
            dice: this.dice,
            eventStack: this.eventStack
        }
    }

    public getEventStack(){
        return this.eventStack;
    }

    public getScoreboard(){
        return this.players
            .map(p=>({score: p.score, name: p.name}))
            .sort((a, b)=> b.score - a.score);
    }

}