import { v4 } from'uuid'
import checkCards from '../../utils/checkCards';
import genDeck from '../../utils/genDeck';
import { Card, SetData, Player } from './SetTypes';
import SetFrame from './SetFrame';

export default class SetLogic extends SetFrame{
    
    public chooseCards(cardsId: string[], playerId: string){
        const cards = cardsId.map( id => this.table.find(card=>card.id == id) );
        if( cards.some(card=>!card) ) return null;
        //@ts-ignore
        const result = checkCards( cards );
        if( !result ) return null;
        else this.correct(cardsId, playerId);
        return true;
    }

    protected correct(cardsId: string[], playerId: string){
        if(this.deck.length <= 0) return;
        this.table = this.table.map(card=>{
            if(!cardsId.includes(card.id)) return card;
            const newCard = this.deck.pop();
            if(!newCard) throw new Error();
            return newCard;
        });
        this.eventStack.push({name: 'replace',  payload: this.table});
    }
    
    protected addCardsToTable(){
        const stack:Card[] = [];
        for(let i = 0; i < 3; i++){
            const card = this.deck.pop();
            card && stack.push( card );
        }
        stack.forEach(card=>this.table.push(card));
        return stack;
    }
    
    protected end(){ //TODO
        this.eventStack.push({name:'end', payload: this.getScoreboard()[0]});
    }
    
    public reset(){
        this.table = [];
        this.deck = genDeck();
        this.players.forEach(p=> p.score = 0);
        this.eventStack.push({name: 'reset', 'payload': this.getData() });
    }

    public startGame(){
        [0, 0, 0, 0].forEach( ()=>this.addCardsToTable() );
        this.eventStack.push({name: 'start', payload: this.table});
    }

    public joinPlayer(name: string){
        const newPlayer:Player = {
            id: v4(),
            name,
            score: 0,
            wantMore: false,
        };

        this.players.push(newPlayer);
        this.eventStack.push({name: 'new player', payload: newPlayer});
        return newPlayer;
    }

    public kickPlayer(id: string, by: string){
        this.players = this.players.filter(player => player.id !== id);
        this.eventStack.push({name:'kick', payload: {kicked: id, by}});
    }

}