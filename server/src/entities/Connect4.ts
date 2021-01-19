import { Console } from 'console';
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
    size: {columns: number, rows: number};
    connectToWin: number;
}

export default class Connect4 implements Connect4Data{
    
    id: Connect4Data['id'];
    players: Connect4Data['players'];
    fields: Connect4Data['fields'];
    turn: Connect4Data['turn'];
    eventStack: Connect4Data['eventStack'];
    size: Connect4Data['size'];
    connectToWin: Connect4Data['connectToWin'];

    constructor(data: Omit<Connect4Data, 'eventStack'>){
        this.id = data.id;
        this.players = data.players;
        this.fields = data.fields;
        this.turn = data.turn;
        this.eventStack = [];
        this.size = data.size;
        this.connectToWin = data.connectToWin;
    }

    static create(size:Connect4Data['size'] = {columns: 7, rows: 6}, connectToWin: number = 4){
        return new Connect4({
            id: v4(),
            turn: -1,
            players: [],
            fields: new Array(size.columns).fill(0).map(()=> new Array(size.rows)),
            size,
            connectToWin,
        });

    }

    static hydrate(data: Omit<Connect4Data, 'eventStack'>){
        return new Connect4({
            ...data
        });
    }

    reset(){
        this.turn = -1,
        this.fields = new Array(this.size.columns).fill(0).map(()=> new Array(this.size.rows));
        this.eventStack.push({name: 'reset', 'payload': this.getData() });
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
        if(checkWinnerConnect4(this.fields, this.connectToWin)) return this.win();
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