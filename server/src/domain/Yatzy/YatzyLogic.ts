import { v4 } from 'uuid'
import calcScore from '../../utils/calcScoreYatzy';
import random from '../../utils/random';
import YatzyFrame from './YatzyFrame';
import { Player, YatzyData } from './YatzyTypes'

export default class YatzyLogic extends YatzyFrame{
    
    joinPlayer(name: string){
        const newPlayer:Player = {
            id: v4(),
            name,
            score: 0,
            usedRows: new Array(15).fill(-1)
        };

        this.players.push(newPlayer);
        this.eventStack.push({name: 'new player', payload: newPlayer});
        return newPlayer;
    }

    nextTurn(){
        this.throwCount = 0;
        this.turn = (this.turn + 1)%this.players.length;
        this.eventStack.push({name: 'next turn', payload: this.turn});
        if(this.players.some(p=>p.usedRows.some(r=> r===-1))) 'e';
        else {
            const winner = this.players.reduce((a, b)=> b.score > a.score ? b : a);
            this.eventStack.push({name: 'win', payload: winner});
        }
    }
    
    throwDice(arr: boolean[]){
        let dices = [arr[0], arr[1], arr[2], arr[3], arr[4]];
        if(this.throwCount === 0) dices = [true, true, true, true, true];
        this.throwCount++;
        if(this.throwCount > 3) return;
        const result =  dices.map((el, index)=>{
            if(el && this.throwCount!==1) return null;
            const r = random(1, 6);
            this.dice[index] = r;
            return r;
        });
        this.eventStack.push({name: 'dice throw', payload: result});
        return result;
    }
    
    chooseRow(row: number){
        const currentPlayer = this.getCurrentPlayer();
        if(!currentPlayer) return;
        if(this.throwCount === 0) return 0;
        if(currentPlayer.usedRows[row] >=0 ) return;
        const score = calcScore(this.dice, row);
        if(score === undefined) return;

        currentPlayer.usedRows[row] = score;
        currentPlayer.score += score;
        this.eventStack.push({name: 'row chosen', payload: {row, score, turn: this.turn}});
        this.nextTurn();
        return score;
    }

    start(){
        if(this.turn >= 0) return;
        this.turn = 0;
        this.eventStack.push({name:'start'});
    }
    
    reset(){
        this.turn = -1;
        this.throwCount = 0;
        this.players.forEach(player=>{
            player.score = 0;
            player.usedRows = new Array(15).fill(-1);
        });
        this.eventStack.push({name:'reset', payload: this.players});
    }

}