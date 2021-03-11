import Connect4Frame from './Connect4Frame'
import { v4 } from'uuid'
import { Connect4Data, Player } from './Connect4Types';
import checkWinnerConnect4 from '../../utils/checkWinnerConnect4';

export default class Connect4Logic extends Connect4Frame{
    
    public reset(){
        this.turn = -1,
        this.fields = new Array(this.size.columns).fill(0).map(()=> new Array(this.size.rows));
        this.eventStack.push({name: 'reset', 'payload': this.getData() });
    }

    public startGame(){
        if(this.turn !== -1) return;
        this.turn = 0;
        this.eventStack.push({name: 'start'});
    }

    public joinPlayer( name: string, userName?: string, skin?:string ){
        
        const newPlayer:Player = {
            id: v4(),
            name,
            score: 0,
            userName,
            color: this.getDefaultSkin(),
            skin,
        };
        this.players.push(newPlayer);
        this.eventStack.push({name: 'new player', payload: newPlayer});
        return newPlayer;
    }

    public kickPlayer(id: string, by: string){
        const turnId = this.players[this.turn]?.id;
        if(!turnId) return;
        this.players = this.players.filter(player => player.id !== id);
        this.eventStack.push({name:'kick', payload: {kicked: id, by}});
        
        this.turn = this.players.findIndex(p=>p.id===turnId);
        this.nextTurn(0);
    }

    private win(){
        const currentPlayer = this.getCurrentPlayer();
        if(!currentPlayer) return;
        currentPlayer.score ++;
        this.eventStack.push({name:'win', payload: this.getCurrentPlayer()});
        this.turn = -2;
    }    
    
    public chooseColumn(column: number){
        console.log(this.players)
        const currentPlayer = this.getCurrentPlayer();
        if(!currentPlayer) return;
        if(!this.fields[column]) return null;
        if(this.fields[column][this.fields[column].length-1]) return null;
        let index = 0;
        for(let row = this.fields[column].length-1; row>=0; row--){
            if(this.fields[column][row]){
                index = row+1;
                break;
            }
        }
        this.fields[column][index] = currentPlayer.id;
        const data = {column, row: index, id: currentPlayer.id };
        this.eventStack.push({name: 'field selected', payload: data});
        this.nextTurn();
        return index;
    }

    public hasStarted(){
        return this.turn >= 0 ? true : false;
    }
    
    private nextTurn(plus = 1){
        if(checkWinnerConnect4(this.fields, this.connectToWin)) return this.win();
        this.turn = (this.turn+plus)%this.players.length;
        this.eventStack.push({name:'next turn', payload: this.turn});
    }

    private getDefaultSkin(){
        const colors = [
            'tomato',
            'lightblue',
            'lightgreen',
            'orange',
            'pink',
        ];
        return colors[this.players.length];
    }
}