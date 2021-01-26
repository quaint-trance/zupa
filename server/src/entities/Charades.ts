import { hasUncaughtExceptionCaptureCallback } from 'process';
import { v4 } from'uuid'
import { eventType } from '../types/EventEmitter'
import randomCharade from '../utils/randomCharade'

export interface Player{
    id: string;
    name: string;
    score: number;
}

export interface Chunk{
    id: string;
    style:{
        width: number;
        color: string;
    };
    lines: {
        x1: number;
        y1: number;
        x2: number;
        y2: number;
    }[];
}

export interface CharadesData{
    id: string;
    players: Player[];
    canvas: Chunk[];
    drawing: number;
    eventStack: eventType[];
    charade: string;
    roundId: string;
}

export default class Charades implements CharadesData{
    
    id: CharadesData['id'];
    players: CharadesData['players'];
    drawing: CharadesData['drawing'];
    eventStack: CharadesData['eventStack'];
    canvas: CharadesData['canvas'];
    charade: CharadesData['charade'];
    roundId: CharadesData['roundId'];
    
    constructor(data: Omit<CharadesData, 'eventStack'>){
        this.id = data.id;
        this.players = data.players;
        this.drawing = data.drawing;
        this.eventStack = [];
        this.canvas = data.canvas;
        this.charade = data.charade;
        this.roundId = data.roundId;
    };
    
    addPath(path: Chunk){
        this.canvas.push(path);
        this.eventStack.push({name: 'path', payload: path});
    }
    
    guess(charade: string, playerId: string){
        if(charade === this.charade){
            this.correct(playerId);
            return true;
        }
        return false;
    }
    
    correct(playerId: string){
        const winner = this.players.find(p=>p.id === playerId);
        winner && winner.score++;
        this.eventStack.push({name:'guessed', payload: {playerId, ans: this.charade}});
        this.nextTurn();
    }
    
    nextTurn(){
        console.log('nowa runda')
        this.drawing = (this.drawing+1)%this.players.length;
        this.roundId = v4();
        this.eventStack.push({name:'next turn', payload: this.drawing});
        this.charade = randomCharade();
        this.reset();
    }
    
    reset(){
        this.canvas = [];
        this.eventStack.push({name: 'reset'});
    }
    startGame(){
        this.drawing = 0;
        this.charade = randomCharade();
        this.eventStack.push({name: 'start'});
    }


    endOfTime(roundId: string, phase: number){
        if(roundId !== this.roundId) return;
        if(phase === 1 || phase === 2) this.hint(phase);
        else if(phase === 3) this.nextTurn();
    }
    hint(phase: number){
        this.eventStack.push({name: 'hint', payload: this.charade.slice(0, phase)});
    }


    
    joinPlayer(name: string){
        const newPlayer:Player = {
            id: v4(),
            name,
            score: 0,
        };
        this.players.push(newPlayer);
        this.eventStack.push({name: 'new player', payload: newPlayer});
        return newPlayer;
    }

    kickPlayer(id: string, by: string){
        const drawingId = this.players[this.drawing]?.id;
        if(!drawingId) return;
        this.players = this.players.filter(player => player.id !== id);
        this.eventStack.push({name:'kick', payload: {kicked: id, by}});
        
        if( drawingId === id ) this.nextTurn();
        else {
            this.drawing = this.players.findIndex(player => player.id === drawingId);
            this.eventStack.push({name:'next turn', payload: this.drawing});
        }
    }

    static create(){
        return new Charades({
            id: v4(),
            drawing: -1,
            players: [],
            canvas: [],
            charade: 'initial',
            roundId: v4(),
        });
        
    }

    static hydrate(data: Omit<CharadesData, 'eventStack'>){
        return new Charades({
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
        if(this.drawing < 0 || !this.players[this.drawing]) return null;
        return this.players[this.drawing];
    }
    
    getScoreboard(){
        return this.players
        .map(p=>({score: p.score, name: p.name}))
        .sort((a, b)=> b.score - a.score);
    }
    
    getData():Omit<CharadesData, 'eventStack'>{
        return {
            id: this.id,
            players: this.players,
            drawing: this.drawing,
            canvas: this.canvas,
            charade: this.charade,
            roundId: this.roundId,
        };
    }
    
    getAll():CharadesData{
        return {
            ...this.getData(),
            eventStack: this.eventStack,
        }
    }
    
}