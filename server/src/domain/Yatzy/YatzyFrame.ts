import { eventType } from '../../types/EventEmitter';
import { Player, YatzyData } from './YatzyTypes'

export default class YatzyFrame{
    protected id: string;
    protected players: Player[];
    protected turn: number;
    protected throwCount: number;
    protected dice: number[];
    protected eventStack: eventType[];
    public t: 'yatzy';

    protected constructor(data: Omit<YatzyData, 'eventStack'>){
        this.id = data.id;
        this.players = data.players;
        this.turn = data.turn;
        this.throwCount = data.throwCount;
        this.dice = data.dice;
        this.eventStack = [];
        this.t = 'yatzy';
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

    public getEvents(){
        return this.eventStack;
    }

    public getScoreboard(){
        return this.players
            .map(p=>({score: p.score, name: p.name}))
            .sort((a, b)=> b.score - a.score);
    }

    public isTurn(playerId: string){
        const currentPlayerId = this.getCurrentPlayer()?.id;
        if(!currentPlayerId) return false;
        return currentPlayerId === playerId;
    }

}