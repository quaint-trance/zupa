import GamesStore from "../types/GameStore";
import Token from '../entities/Token'
import Set, { Card } from "../entities/Set";

export default class SetService{
    
    gamesStore: GamesStore;
    
    constructor(gamesStore: GamesStore){
        this.gamesStore = gamesStore;
    }
    
    async chooseSet(token: string, cardsId: string[]){
        const [ game, playerId ] = await this.hydrateFromToken(token);
        if( !game || !playerId ) return null;
        
        const result = game.chooseCards(cardsId, playerId);
        this.gamesStore.save({...game.getAll(), t: 'set'});
        return result;
    }
    
    async start(token: string){
        const [ game, playerId ] = await this.hydrateFromToken(token);
        if( !game || !playerId ) return null;
        
        game.startGame();
        this.gamesStore.save({...game, t: 'set'});
        return true;
    }
    
    async reset(token: string){
        const [ game, playerId ] = await this.hydrateFromToken(token);
        if( !game || !playerId ) return null;
        
        const result = game.reset();
        this.gamesStore.save({...game.getAll(), t: 'set'});
        return result;
    }

    async createGame(playerName: string, timeouts?: number[]){
        const result = Set.create();
        await this.gamesStore.push({...result, t: 'set'});
        return this.joinPlayer(result.id, playerName);
    }

    async joinPlayer(gameId: string, playerName: string){
        const gameData = await this.gamesStore.findById(gameId);
        if(!gameData || gameData.t !== 'set') return null;
        const game = Set.hydrate(gameData);
        
        const player = game.joinPlayer(playerName);
        this.gamesStore.save({...game, t: 'set'});
        const token = Token.create({ gameId, playerId: player.id }).getToken();
        return {...player, token, gameId};
    }
    
    async kickPlayer(token: string, id: string){
        const [ game, playerId ] = await this.hydrateFromToken(token);
        if( !game || !playerId ) return null;
        
        const result = game.kickPlayer(id, playerId);
        this.gamesStore.save({...game.getAll(), t: 'set'});
        return result;
    }
    
    async getScoreboard(gameId: string){
        const gameData = await this.gamesStore.findById(gameId);
        if(!gameData || gameData.t !== 'set') return null;
        const game = Set.hydrate(gameData);
        return game.getScoreboard();
    }

    async hydrateFromToken(token: string):Promise<[null | Set, null | string]>{
        if(!token) return [null, null];
        const payload = Token.hydrate(token)?.getPayload();
        if(!payload?.gameId || !payload?.playerId) return [null, null];
        
        const gameData = await this.gamesStore.findById(payload.gameId);
        if(!gameData || gameData.t !== 'set') return [null, null];
        return [Set.hydrate(gameData), payload.playerId];
    }
};