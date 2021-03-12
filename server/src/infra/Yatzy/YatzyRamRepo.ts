import Yatzy from "../../domain/Yatzy";
import { YatzyData } from "../../domain/Yatzy/YatzyTypes";
import GamesStore from "../../types/YatzyRepo";

export default class implements GamesStore{
    store: YatzyData[];

    constructor(){
        this.store = [];
    }

    async findById(id: string){
        const gameData = this.store.find(game => game.id === id);
        if(!gameData) return null;
        return Yatzy.hydrate(gameData);
    }

    private async push(game: Yatzy){
        this.store.push(game.getAll());
    }

    async save(game: Yatzy){
        const gameIndex = this.store.findIndex(storedGame => storedGame.id === game.getId());
        if(gameIndex < 0) return this.push(game).then(_=>true);
        this.store[gameIndex] = game.getAll();
        return true;
    }

    async findMany(t?: string){
        return this.store.map(el=>Yatzy.hydrate(el));
    }

    async delete(gameId: string){
        this.store = this.store.filter(game=> game.id !== gameId);
    }
}