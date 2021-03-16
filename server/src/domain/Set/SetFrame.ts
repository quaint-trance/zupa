import { Card, Player, SetData } from './SetTypes'

export default class Set {
    protected id: SetData['id'];
    protected players: SetData['players'];
    protected table: SetData['table'];
    protected deck: SetData['deck'];
    protected eventStack: SetData['eventStack'];
    
    protected constructor(data: Omit<SetData, 'eventStack'>){
        this.id = data.id;
        this.players = data.players;
        this.table = data.table;
        this.deck = data.deck;
        this.eventStack = [];
    }
    
    public getId(){
        return this.id;
    }

    public getPlayers(){
        return this.players;
    }

    public getScoreboard(){
        return this.players
            .map(p=>({score: p.score, name: p.name}))
            .sort((a, b)=> b.score - a.score);
    }

    public getData():Omit<SetData, 'eventStack'>{
        return {
            id: this.id,
            players: this.players,
            deck: this.deck,
            table: this.table,
        };
    }

    public getAll():SetData{
        return {
            ...this.getData(),
           eventStack: this.eventStack
        }
    }
}