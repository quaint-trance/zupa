import GameStoreType from "../types/GameStore";

export default class GameStore{

    private gameStore: GameStoreType;

    constructor(infra: {gameStore: GameStoreType}){
        this.gameStore = infra.gameStore;
    }

    getAll(){
        return this.gameStore.getAll();
    }

    getById(id: string){
        return this.gameStore.getById(id);
    }

}