import GamesStore, { Game } from "../types/Connect4Repo";
import Token from '../domain/entities/Token'
import Charades, { Chunk } from "../domain/entities/Charades";
import { time } from "console";

export default class CharadesService{
    
    gamesStore: GamesStore;
    
    constructor(gamesStore: GamesStore){
        this.gamesStore = gamesStore;
    }
    
    async guess(token: string, charades: string){
        const [ game, playerId ] = await this.hydrateFromToken(token);
        if( !game || !playerId ) return null;
        if( playerId === game.getCurrentPlayer()?.id ) return null;
        
        const result = game.guess(charades, playerId);
        this.gamesStore.save({...game.getAll(), t: 'charades'});
        return result;
    }
    
    async addPath(token: string, path: Chunk ){
        const [ game, playerId ] = await this.hydrateFromToken(token);
        if( !game || !playerId ) return null;
        if( playerId !== game.getCurrentPlayer()?.id ) return null;
        
        game.addPath(path);
        this.gamesStore.save({...game.getAll(), t: 'charades'});
    }

    async clearCanvas(token: string){
        const [ game, playerId ] = await this.hydrateFromToken(token);
        if( !game || !playerId ) return null;
        if( playerId !== game.getCurrentPlayer()?.id ) return null;
        
        game.reset();
        this.gamesStore.save({...game.getAll(), t: 'charades'});
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
        
        if( game.drawing >= 0 ) return;
        game.startGame();
        this.gamesStore.save({...game, t: 'charades'});
        return true;
    }
    
    async reset(token: string){
        const [ game, playerId ] = await this.hydrateFromToken(token);
        if( !game || !playerId ) return null;
        
        const result = game.reset();
        this.gamesStore.save({...game.getAll(), t: 'charades'});
        return result;
    }

    async createGame(playerName: string, timeouts?: number[]){
        const result = Charades.create(timeouts);
        await this.gamesStore.push({...result, t: 'charades'});
        return this.joinPlayer(result.id, playerName);
    }

    async endOfTime(gameId: string, roundId: string, phase: number){
        const gameData = await this.gamesStore.findById(gameId);
        if( !gameData || gameData.t!=='charades') return null;
        const game = Charades.hydrate(gameData);

        game.endOfTime(roundId, phase);
        this.gamesStore.save({...game.getAll(), t: 'charades'})
    }
    
    async joinPlayer(gameId: string, playerName: string){
        const gameData = await this.gamesStore.findById(gameId);
        if(!gameData || gameData.t !== 'charades') return null;
        const game = Charades.hydrate(gameData);
        
        const player = game.joinPlayer(playerName);
        this.gamesStore.save({...game, t: 'charades'});
        const token = Token.create({ gameId, playerId: player.id }).getToken();
        return {...player, token, gameId};
    }
    
    async kickPlayer(token: string, id: string){
        const [ game, playerId ] = await this.hydrateFromToken(token);
        if( !game || !playerId ) return null;
        
        const result = game.kickPlayer(id, playerId);
        this.gamesStore.save({...game.getAll(), t: 'charades'});
        return result;
    }
    
    async getScoreboard(gameId: string){
        const gameData = await this.gamesStore.findById(gameId);
        if(!gameData || gameData.t !== 'charades') return null;
        const game = Charades.hydrate(gameData);
        return game.getScoreboard();
    }

    async hydrateFromToken(token: string):Promise<[null | Charades, null | string]>{
        if(!token) return [null, null];
        const payload = Token.hydrate(token)?.getPayload();
        if(!payload?.gameId || !payload?.playerId) return [null, null];
        
        const gameData = await this.gamesStore.findById(payload.gameId);
        if(!gameData || gameData.t !== 'charades') return [null, null];
        return [Charades.hydrate(gameData), payload.playerId];
    }
};