import GamesStore, { Game } from "../types/GameStore";
import Token from '../entities/Token'
import Connect4 from "../entities/Connect4";

export default class Connect4Service{

    gamesStore: GamesStore;

    constructor(gamesStore: GamesStore){
        this.gamesStore = gamesStore;
    }

    async hydrateFromToken(token: string):Promise<[null | Connect4, null | string]>{
        if(!token) return [null, null];
        const payload = Token.hydrate(token)?.getPayload();
        if(!payload?.gameId || !payload?.playerId) return [null, null];

        const gameData = await this.gamesStore.findById(payload.gameId);
        if(!gameData || gameData.t !== 'connect4') return [null, null];
        return [Connect4.hydrate(gameData), payload.playerId];
    }

    async createGame(playerName: string, size?:{columns: number, rows: number}, connectToWin?: number){
        let result;
        if( size && connectToWin) result = Connect4.create(size, connectToWin);
        else if( size ) result = Connect4.create(size);
        else if( connectToWin ) result = Connect4.create(undefined ,connectToWin);
        else result = Connect4.create();

        await this.gamesStore.push({...result, t: 'connect4'});
        return this.joinPlayer(result.id, playerName);
    }

    async joinPlayer(gameId: string, playerName: string){
        const gameData = await this.gamesStore.findById(gameId);
        if(!gameData || gameData.t !== 'connect4') return null;
        const game = Connect4.hydrate(gameData);
        
        const player = game.joinPlayer(playerName);
        this.gamesStore.save({...game, t: 'connect4'});
        const token = Token.create({ gameId, playerId: player.id }).getToken();
        return {...player, token, gameId};
    }

    async start(token: string){
        const [ game, playerId ] = await this.hydrateFromToken(token);
        if( !game || !playerId ) return null;
        
        if( game.turn >= 0 ) return;
        const result = game.startGame();
        this.gamesStore.save({...game, t: 'connect4'});
        return true;
    }

    async kickPlayer(token: string, id: string){
        const [ game, playerId ] = await this.hydrateFromToken(token);
        if( !game || !playerId ) return null;
        
        const result = game.kickPlayer(id, playerId);
        this.gamesStore.save({...game.getAll(), t: 'connect4'});
        return result;
    }

    async chooseColumn(token: string, row: number){
        const [ game, playerId ] = await this.hydrateFromToken(token);
        if( !game || !playerId ) return null;
        if( game.getCurrentPlayer()?.id !== playerId ) return;
        
        const result = game.chooseColumn(row);
        if( result === undefined ) return null;
        this.gamesStore.save({...game.getAll(), t: 'connect4'});
        return result;
    }

    async reset(token: string){
        const [ game, playerId ] = await this.hydrateFromToken(token);
        if( !game || !playerId ) return null;
        
        const result = game.reset();
        this.gamesStore.save({...game.getAll(), t: 'connect4'});
        return result;
    }

    async getScoreboard(gameId: string){
        const gameData = await this.gamesStore.findById(gameId);
        if(!gameData || gameData.t !== 'connect4') return null;
        const game = Connect4.hydrate(gameData);

        return game.getScoreboard();
    }
};