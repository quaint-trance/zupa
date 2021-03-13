import { v4 } from'uuid'
import randomCharade from '../../utils/randomCharade'
import { Player, Chunk } from './CharadesTypes'
import CharadesFrame from './CharadesFrame';

export default class CharadesLogic extends CharadesFrame{
    
    addPath(path: Chunk){
        this.canvas.push(path);
        this.eventStack.push({name: 'path', payload: path});
    }
    
    guess(charade: string, playerId: string){
        if(!this.players.some(p=>p.id===playerId)) return;
        if( charade.toLowerCase() === this.charade.toLowerCase() ){
            this.correct(playerId);
            return true;
        }
        return false;
    }
    
    correct(playerId: string){
        const winner = this.players.find(p=>p.id === playerId);
        const drawer = this.players[this.drawing];
        winner && (winner.score += 2);
        drawer && (drawer.score+=1);
        this.eventStack.push({name:'guessed', payload: {playerId, ans: this.charade}});
        this.nextTurn();
    }
    
    nextTurn(){
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
        if(phase === 0){
            this.eventStack.push({name: 'eot', payload: this.charade});
            const drawer = this.players[this.drawing];
            drawer && drawer.score--;
            this.nextTurn();
        }
        else this.hint(phase);
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
    
}