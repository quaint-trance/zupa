import Hanoi from "../../domain/Hanoi";
import { HanoiData } from "../../domain/Hanoi/HanoiTypes";
import GamesStore from "../../types/HanoiRepo";

export default class implements GamesStore{
    store: HanoiData[];

    constructor(){
        this.store = [];
    }

    async findById(id: string){
        const gameData = this.store.find(game => game.id === id);
        if(!gameData) return null;
        return Hanoi.hydrate(gameData);
    }

    private async push(game: Hanoi){
        this.store.push(game.getAll());
    }

    async save(game: Hanoi){
        const gameIndex = this.store.findIndex(storedGame => storedGame.id === game.getId());
        if(gameIndex < 0) return this.push(game).then(_=>true);
        this.store[gameIndex] = game.getAll();
        return true;
    }

    async findMany(t?: string){
        return this.store.map(el=>Hanoi.hydrate(el));
    }

    async delete(gameId: string){
        this.store = this.store.filter(game=> game.id !== gameId);
    }
}