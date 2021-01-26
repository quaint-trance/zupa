import EventEmitter from '../types/EventEmitter';
import { Game } from '../types/GameStore'

export default class gamesStore{
    store: Game[];
    eventEmitter: EventEmitter;

    constructor(eventEmitter: EventEmitter){
        this.store = [];
        this.eventEmitter = eventEmitter;
    }

    async findById(id: string){
        const result = this.store.find(game => game.id === id);
        if(!result) return null;
        return result;
    }

    async push(data: Game){
        this.store.push(data);
    }

    async save(data: Game){
        const gameIndex = this.store.findIndex(game => game.id === data.id);
        if(gameIndex < 0) return false;
        this.store[gameIndex] = data;
        this.eventEmitter.emit(data.eventStack, data.id, data);
        return true;
    }

    async findMany(t?: string){
        return this.store;
    }

    async delete(gameId: string){
        this.store = this.store.filter(game=> game.id !== gameId);
    }
}