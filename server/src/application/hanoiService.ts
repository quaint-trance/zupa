import HanoiRepo from "../types/HanoiRepo";
import Token from '../domain/entities/Token'
import Hanoi from "../domain/Hanoi";
import EventEmitter from '../types/EventEmitter';
import { domainEventsService } from '../index'

export default class HanoiService{
    
    gameStore: HanoiRepo;
    eventEmitter: EventEmitter;

    constructor(infra: {hanoiRepo: HanoiRepo, eventEmitter: EventEmitter }){
        this.gameStore = infra.hanoiRepo;
        this.eventEmitter = infra.eventEmitter;
    }
    
    async move(token: string, from: number, to: number){
        const [ game, playerId ] = await this.hydrateFromToken(token);
        if( !game || !playerId ) return null;
        if( playerId !== game.getCurrentPlayer()?.id ) return null;
        
        game.move(from, to);
        this.save( game );
    }

    async reset(token: string){
        const [ game, playerId ] = await this.hydrateFromToken(token);
        if( !game || !playerId ) return null;
        
        const result = game.reset();
        this.save( game );
        return result;
    }

    async createGame(playerName: string){
        const result = Hanoi.create();
        await this.save( result );
        return this.joinPlayer(result.getId(), playerName);
    }

    async joinPlayer(gameId: string, playerName: string){
        const game = await this.gameStore.findById(gameId);
        if( !game ) return null;
        
        const player = game.joinPlayer(playerName);
        this.save( game );
        const token = Token.create({ gameId, playerId: player.id }).getToken();
        return {...player, token, gameId};
    }
    
    async kickPlayer(token: string, id: string){
        const [ game, playerId ] = await this.hydrateFromToken(token);
        if( !game || !playerId ) return null;
        
        const result = game.kickPlayer(id, playerId);
        this.save(game);
        return result;
    }
    
    async getScoreboard(gameId: string){
        const game = await this.gameStore.findById(gameId);
        if( !game ) return null;
        return game.getScoreboard();
    }

    async hydrateFromToken(token: string):Promise<[null | Hanoi, null | string]>{
        if(!token) return [null, null];
        const payload = Token.hydrate(token)?.getPayload();
        if(!payload?.gameId || !payload?.playerId) return [null, null];
        
        const game = await this.gameStore.findById(payload.gameId);
        if( !game ) return [null, null];
        return [game, payload.playerId];
    }

    private async save(game: Hanoi){
        const events = game.getEvents();
        events.map(event=>{
            this.eventEmitter.emit(event, game.getId());
        });
        return await this.gameStore.save(game);
    }

};