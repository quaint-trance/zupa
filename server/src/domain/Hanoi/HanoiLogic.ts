import { v4 } from'uuid'
import checkCards from '../../utils/checkCards';
import genDeck from '../../utils/genDeck';
import { Player } from './HanoiTypes';
import HanoiFrame from './HanoiFrame';

export default class HanoiLogic extends HanoiFrame{
    
    public move(from: number, to: number){
        if(!this.startTime) this.startTime = new Date();

        if( from < 0 || from > 2 || to < 0 || to > 2 ) return null;
        const element =  this.rods[from].pop();
        
        if(!element) return null;
        if(element > this.rods[to][this.rods[to].length-1]){
            this.rods[from].push(element);
            return null;
        }
        else this.rods[to].push(element);

        if(this.testWin()) this.win();
    }
    
    public reset(){
        this.rods = [[5, 4, 3, 2, 1], [], []];
    }

    public startGame(){
       
    }

    public joinPlayer(name: string){
        const newPlayer:Player = {
            id: v4(),
            name,
            score: 0,
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
    }

    protected testWin(){
        const b0 = this.rods[0].length === 0;
        const b1 = this.rods[1].length === 0;

        let b2 = true;
        this.rods[2].forEach((el, index, arr)=>{
            if(arr[index+1] && arr[index+1] > el ) b2 = false;
        })

        return b0 && b1 && b2;
    }
}