import CharadesRepo from "../types/CharadesRepo";
import Token from '../domain/entities/Token'
import Charades from "../domain/Charades";
import { Chunk } from "../domain/Charades/CharadesTypes";
import EventEmitter from '../types/EventEmitter';
import { domainEventsService } from '../index'

export default class CharadesService{
    
    gameStore: CharadesRepo;
    eventEmitter: EventEmitter;

    constructor(infra: {charadesRepo: CharadesRepo, eventEmitter: EventEmitter }){
        this.gameStore = infra.charadesRepo;
        this.eventEmitter = infra.eventEmitter;
    }
    
    async guess(token: string, charades: string){
        const [ game, playerId ] = await this.hydrateFromToken(token);
        if( !game || !playerId ) return null;
        if( playerId === game.getCurrentPlayer()?.id ) return null;
        
        const result = game.guess(charades, playerId);
        this.save(game);
        return result;
    }
    
    async addPath(token: string, path: Chunk ){
        const [ game, playerId ] = await this.hydrateFromToken(token);
        if( !game || !playerId ) return null;
        if( playerId !== game.getCurrentPlayer()?.id ) return null;
        
        game.addPath(path);
        this.save( game );
    }

    async clearCanvas(token: string){
        const [ game, playerId ] = await this.hydrateFromToken(token);
        if( !game || !playerId ) return null;
        if( playerId !== game.getCurrentPlayer()?.id ) return null;
        
        game.reset();
        this.save( game );
    }

    async getCharade(token: string){
        const [ game, playerId ] = await this.hydrateFromToken(token);
        if( !game || !playerId ) return null;
        if( playerId !== game.getCurrentPlayer()?.id ) return null;
        
        return game.getData().charade;
    }
    
    async start(token: string){
        const [ game, playerId ] = await this.hydrateFromToken(token);
        if( !game || !playerId ) return null;
        
        if( game.getDrawing() >= 0 ) return;
        game.startGame();
        this.save( game );
        return true;
    }
    
    async reset(token: string){
        const [ game, playerId ] = await this.hydrateFromToken(token);
        if( !game || !playerId ) return null;
        
        const result = game.reset();
        this.save( game );
        return result;
    }

    async createGame(playerName: string, timeouts?: number[]){
        const result = Charades.create(timeouts);
        await this.save( result );
        return this.joinPlayer(result.getId(), playerName);
    }

    async endOfTime(gameId: string, roundId: string, phase: number){
        const game = await this.gameStore.findById(gameId);
        if( !game ) return null;

        game.endOfTime(roundId, phase);
        this.save( game )
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

    async hydrateFromToken(token: string):Promise<[null | Charades, null | string]>{
        if(!token) return [null, null];
        const payload = Token.hydrate(token)?.getPayload();
        if(!payload?.gameId || !payload?.playerId) return [null, null];
        
        const game = await this.gameStore.findById(payload.gameId);
        if( !game ) return [null, null];
        return [game, payload.playerId];
    }

    private async save(game: Charades){
        const events = game.getEvents();
        events.map(event=>{

            if( event.name === 'next turn' || event.name === 'start'){
                let sum = 0;
                game.getAll().timeouts.forEach((timeout, index, arr)=>{
                    sum+=timeout;

                    if( index === arr.length-1 ){
                        domainEventsService.newTimeout(application=>{
                            application.charadesService.endOfTime(game.getId(), game.getRountId(), 0)
                        }, 1000*sum)
                    }
                    else{
                        domainEventsService.newTimeout(app=>{
                            app.charadesService.endOfTime(game.getId(), game.getRountId(), index+1);
                        }, 1000*sum);
                    }

                });
            }

            this.eventEmitter.emit(event, game.getId());
        });
        return await this.gameStore.save(game);
    }

};