import Connect4 from "../../domain/Connect4";
import { Connect4Data } from "../../domain/Connect4/Connect4Types";
import GamesStore from "../../types/GameStore";

export default class implements GamesStore{
    store: Connect4Data[];

    constructor(){
        this.store = [];
    }

    async findById(id: string){
        const gameData = this.store.find(game => game.id === id);
        if(!gameData) return null;
        return Connect4.hydrate(gameData);
    }

    private async push(game: Connect4){
        this.store.push(game.getAll());
    }

    async save(game: Connect4){
        const gameIndex = this.store.findIndex(storedGame => storedGame.id === game.getId());
        if(gameIndex < 0) return this.push(game).then(_=>true);
        this.store[gameIndex] = game.getAll();
        return true;
    }

    async findMany(t?: string){
        return this.store.map(el=>Connect4.hydrate(el));
    }

    async delete(gameId: string){
        this.store = this.store.filter(game=> game.id !== gameId);
    }
}