import { Connect4Data, Player } from './Connect4Types';


export default class Connect4{
    
    protected id: Connect4Data['id'];
    protected players: Connect4Data['players'];
    protected fields: Connect4Data['fields'];
    protected turn: Connect4Data['turn'];
    protected eventStack: Connect4Data['eventStack'];
    protected size: Connect4Data['size'];
    protected connectToWin: Connect4Data['connectToWin'];

    protected constructor(data: Omit<Connect4Data, 'eventStack'>){
        this.id = data.id;
        this.players = data.players;
        this.fields = data.fields;
        this.turn = data.turn;
        this.eventStack = [];
        this.size = data.size;
        this.connectToWin = data.connectToWin;
    }

    getId(){
        return this.id;
    }

    getPlayers(){
        return this.players;
    }

    getCurrentPlayer(){
        if(this.turn < 0 || !this.players[this.turn]) return null;
        return this.players[this.turn];
    }

    getScoreboard(){
        return this.players
            .map(p=>({score: p.score, name: p.name}))
            .sort((a, b)=> b.score - a.score);
    }

    getData(){
        return {
            id: this.id,
            players: this.players,
            fields: this.fields,
            turn: this.turn,
            size: this.size,
            connectToWin: this.connectToWin,
        };
    }

    getAll(){
        return {
            ...this.getData(),
           eventStack: this.eventStack
        }
    }
}