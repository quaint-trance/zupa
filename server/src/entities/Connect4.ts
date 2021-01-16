import { v4 } from'uuid'

export interface Player{
    id: string;
    name: string;
}

export interface Connect4Data{
    id: string;
    players: any[];
    fields: string[][];
    turn: number;
    eventStack:{name: string, data: any}[];
}

export default class Connect4 implements Connect4Data{
    id: string;
    players: any[];
    fields: string[][];
    turn: number;
    eventStack:{name: string, data: any}[];

    constructor(data: Omit<Connect4Data, 'eventStack'>){
        this.id = data.id;
        this.players = data.players;
        this.fields = data.fields;
        this.turn = data.turn;
        this.eventStack = [];
    }

    static create(){
        return new Connect4({
            id: v4(),
            turn: 0,
            players: [],
            fields: new Array(7).fill(0).map(()=> new Array(6))
        });
    }

    static hydrate(data: Omit<Connect4Data, 'eventStack'>){
        return new Connect4({
            ...data
        });
    }

    getId(){
        return this.id;
    }

    getPlayers(){
        return this.players;
    }

    getCurrentPlayer(){
        return this.players[this.turn];
    }

    getAll(){
        return{
            id: this.id,
            players: this.players,
            fields: this.fields,
            turn: this.turn,
            eventStack: this.eventStack
        }
    }

    joinPlayer(name: string){
        const newPlayer:Player = {
            id: v4(),
            name
        };
        this.players.push(newPlayer);
        this.eventStack.push({name: 'new player', data: newPlayer});
        return newPlayer;
    }

    nextTurn(){
        this.turn = (this.turn+1)%this.players.length;
        this.eventStack.push({name:'next turn', data: this.turn});
    }

    chooseColumn(column: number){
        if(!this.fields[column]) return null;
        if(this.fields[column][this.fields[column].length-1]) return null;
        let index = 0;
        for(let row = this.fields[column].length-1; row>=0; row--){
            if(this.fields[column][row]){
                index = row+1;
                break;
            }
        }
        this.fields[column][index] = this.getCurrentPlayer().id;
        this.eventStack.push({name: 'field selected', data: index});
        this.nextTurn();
        return index;
    }

}