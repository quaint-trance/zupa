import GamesStore from "../types/GameStore";

export default class GameStoreService{
    gamesStore: GamesStore;

    constructor(gamesStore: GamesStore){
        this.gamesStore = gamesStore;
    }

    getGames(t?: string){
        return this.gamesStore.findMany(t);
    }

    getGame(gameId: string){
        return this.gamesStore.findById(gameId);
    }

    deleteGame(gameId: string){
        return this.gamesStore.delete(gameId);
    }
}