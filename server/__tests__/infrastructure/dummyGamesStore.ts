import { Game } from '../../src/types/GameStore'

export default class gamesStore{
    store: Game[];

    constructor(){
        this.store = [];
    }

    findById(id: string){
        const result = this.store.find(game => game.id === id);
        if(!result) return null;
        return result;
    }

    push(data: Game){
        this.store.push(data);
    }

    save(data: Game){
        const gameIndex = this.store.findIndex(game => game.id === data.id);
        if(!gameIndex) return false;
        this.store[gameIndex] = data;
        return true;
    }
}