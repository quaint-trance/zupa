import Charades from "../../domain/Charades";
import { CharadesData } from "../../domain/Charades/CharadesTypes";
import GamesStore from "../../types/CharadesRepo";

export default class implements GamesStore{
    store: CharadesData[];

    constructor(){
        this.store = [];
    }

    async findById(id: string){
        const gameData = this.store.find(game => game.id === id);
        if(!gameData) return null;
        return Charades.hydrate(gameData);
    }

    private async push(game: Charades){
        this.store.push(game.getAll());
    }

    async save(game: Charades){
        const gameIndex = this.store.findIndex(storedGame => storedGame.id === game.getId());
        if(gameIndex < 0) return this.push(game).then(_=>true);
        this.store[gameIndex] = game.getAll();
        return true;
    }

    async findMany(t?: string){
        return this.store.map(el=>Charades.hydrate(el));
    }

    async delete(gameId: string){
        this.store = this.store.filter(game=> game.id !== gameId);
    }
}