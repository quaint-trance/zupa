import { v4 } from'uuid'
import checkCards from '../../utils/checkCards';
import genDeck from '../../utils/genDeck';
import { Player } from './HanoiTypes';
import HanoiFrame from './HanoiFrame';

export default class HanoiLogic extends HanoiFrame{
    
    public move(from: number, to: number){
        if(!this.startTime){
            this.startTime = new Date();
            this.eventStack.push({name:'time start', payload: this.startTime})
        }
        
        if( from < 0 || from > 2 || to < 0 || to > 2 ) return null;
        const element =  this.rods[from].pop();
        
        if(!element) return null;
        if(element > this.rods[to][this.rods[to].length-1]){
            this.rods[from].push(element);
            return null;
        }
        else this.rods[to].push(element);
        
        this.eventStack.push({name: 'disc moved', payload: this.rods})
        
        if(this.testWin()) this.win();
    }
    
    public reset(){
        this.startTime = null;
        this.eventStack.push({name:'time stop'});
        this.rods = [[5, 4, 3, 2, 1], [], []];
        this.eventStack.push({name: 'reset', payload: this.rods});
    }
    
    public startGame(){
        
    }
    
    public joinPlayer(name: string, userId?: string){
        const newPlayer:Player = {
            id: v4(),
            name,
            score: NaN,
            userId
        };
        
        this.players.push(newPlayer);
        this.eventStack.push({name: 'new player', payload: newPlayer});
        return newPlayer;
    }
    
    public kickPlayer(id: string, by: string){
        this.players = this.players.filter(player => player.id !== id);
        this.eventStack.push({name:'kick', payload: {kicked: id, by}});
    }
    
    protected win(){
        if(!this.startTime) return;
        const time = Date.now() - this.startTime.getTime();
        
        this.eventStack.push({name: 'win', payload: time});
        
        if( !this.bestTime ||  time < this.bestTime){
            this.bestTime = time;
        }
        if( !this.players[this.turn].score || time < this.players[this.turn].score){
            this.players[this.turn].score = time;
            if(this.players[this.turn]?.userId)this.eventStack.push({name: 'best', payload: {userId: this.players[this.turn].userId, value: time}})
        }
        
        this.nextTurn();
    }
    
    protected testWin(){
        const b0 = this.rods[0].length === 0;
        const b1 = this.rods[1].length === 0;
        
        return b0 && b1;
    }
    
    public nextTurn(){
        this.startTime = null;
        this.eventStack.push({name:'time stop'});
        this.turn = (this.turn+1)%this.players.length;
        this.reset();
        this.eventStack.push({name: 'next turn', payload: {turn: this.turn, rods: this.rods}});
    }
}