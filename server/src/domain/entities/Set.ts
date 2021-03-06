import { SourceMap } from 'module';
import { v4 } from'uuid'
import { eventType } from '../../types/EventEmitter';
import checkCards from '../../utils/checkCards';
import genDeck from '../../utils/genDeck';

export interface Player{
    id: string;
    name: string;
    score: number;
    wantMore: boolean;
}

export interface Card{
    id: string;
    color: number;
    shape: number;
    quantity: number;
    fill: number;
}

export interface SetData{
    id: string;
    players: Player[];
    table: Card[];
    deck: Card[];
    eventStack: eventType[];
}

export default class Set implements SetData{
    id: SetData['id'];
    players: SetData['players'];
    table: SetData['table'];
    deck: SetData['deck'];
    eventStack: SetData['eventStack'];
    
    constructor(data: Omit<SetData, 'eventStack'>){
        this.id = data.id;
        this.players = data.players;
        this.table = data.table;
        this.deck = data.deck;
        this.eventStack = [];
    }
    
    chooseCards(cardsId: string[], playerId: string){
        const cards = cardsId.map( id => this.table.find(card=>card.id == id) );
        if( cards.some(card=>!card) ) return null;
        //@ts-ignore
        const result = checkCards( cards );
        if( !result ) return null;
        else this.correct(cardsId, playerId);
        return true;
    }

    correct(cardsId: string[], playerId: string){
        if(this.deck.length <= 0) return;
        this.table = this.table.map(card=>{
            if(!cardsId.includes(card.id)) return card;
            const newCard = this.deck.pop();
            if(!newCard) throw new Error();
            return newCard;
        });
        this.eventStack.push({name: 'replace',  payload: this.table});
    }
    
    addCardsToTable(){
        const stack:Card[] = [];
        for(let i = 0; i < 3; i++){
            const card = this.deck.pop();
            card && stack.push( card );
        }
        stack.forEach(card=>this.table.push(card));
        return stack;
    }
    
    end(){ //TODO
        this.eventStack.push({name:'end', payload: this.getScoreboard()[0]});
    }
    
    static create(shuffle?:boolean){
        return new Set({
            id: v4(),
            players: [],
            table: [],
            deck: genDeck(shuffle),
        });
    }
    
    static hydrate(data: Omit<SetData, 'eventStack'>){
        return new Set({
            ...data
        });
    }
    
    reset(){
        this.table = [];
        this.deck = genDeck();
        this.players.forEach(p=> p.score = 0);
        this.eventStack.push({name: 'reset', 'payload': this.getData() });
    }

    getId(){
        return this.id;
    }

    getPlayers(){
        return this.players;
    }

    getScoreboard(){
        return this.players
            .map(p=>({score: p.score, name: p.name}))
            .sort((a, b)=> b.score - a.score);
    }

    getData():Omit<SetData, 'eventStack'>{
        return {
            id: this.id,
            players: this.players,
            deck: this.deck,
            table: this.table,
        };
    }

    getAll():SetData{
        return {
            ...this.getData(),
           eventStack: this.eventStack
        }
    }

    startGame(){
        [0, 0, 0, 0].forEach( ()=>this.addCardsToTable() );
        this.eventStack.push({name: 'start', payload: this.table});
    }

    joinPlayer(name: string){
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

    kickPlayer(id: string, by: string){
        this.players = this.players.filter(player => player.id !== id);
        this.eventStack.push({name:'kick', payload: {kicked: id, by}});
    }

}