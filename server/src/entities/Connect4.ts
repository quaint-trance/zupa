import { v4 } from'uuid'
import { eventType } from '../types/EventEmitter';
import checkWinnerConnect4 from '../utils/checkWinnerConnect4';

export interface Player{
    id: string;
    name: string;
}

export interface Connect4Data{
    id: string;
    players: any[];
    fields: string[][];
    turn: number;
    eventStack: eventType[];
}

export default class Connect4 implements Connect4Data{
    id: string;
    players: any[];
    fields: string[][];
    turn: number;
    eventStack: eventType[];

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
            turn: -1,
            players: [],
            fields: new Array(7).fill(0).map(()=> new Array(6))
        });
    }

    static hydrate(data: Omit<Connect4Data, 'eventStack'>){
        return new Connect4({
            ...data
        });
    }

    reset(){
        this.turn = -1,
        this.fields = new Array(7).fill(0).map(()=> new Array(6));
        this.eventStack.push({name: 'reset', 'payload': {
            id: this.id,
            players: this.players,
            fields: this.fields,
            turn: this.turn,
        }});
        console.log(this.getAll());
    }

    getId(){
        return this.id;
    }

    getPlayers(){
        return this.players;
    }

    getCurrentPlayer(){
        if(this.turn < 0) return null;
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

    startGame(){
        this.turn = 0;
        this.eventStack.push({name: 'start'});
    }

    joinPlayer(name: string){
        const newPlayer:Player = {
            id: v4(),
            name
        };
        this.players.push(newPlayer);
        this.eventStack.push({name: 'new player', payload: newPlayer});
        return newPlayer;
    }

    win(){
        this.eventStack.push({name:'win', payload: this.getCurrentPlayer()});
        this.turn = -5;
    }

    nextTurn(){
        if(checkWinnerConnect4(this.fields)) return this.win();
        this.turn = (this.turn+1)%this.players.length;
        this.eventStack.push({name:'next turn', payload: this.turn});
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
        const data = {column, row: index, id: this.getCurrentPlayer().id };
        this.eventStack.push({name: 'field selected', payload: data});
        this.nextTurn();
        return index;
    }

}