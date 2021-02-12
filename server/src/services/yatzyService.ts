import Yatzy from "../entities/Yatzy";
import GamesStore, { Game } from "../types/GameStore";
import Token from '../entities/Token'

export default class YatzyService{

    gamesStore: GamesStore;

    constructor(gamesStore: GamesStore){
        this.gamesStore = gamesStore;
    }

    async hydrateYatzyFromToken(token: string):Promise<[null | Yatzy, null | string]>{
        if(!token) return [null, null];
        const payload = Token.hydrate(token)?.getPayload();
        if(!payload?.gameId || !payload?.playerId) return [null, null];

        const gameData = await this.gamesStore.findById(payload.gameId);
        if(!gameData || gameData.t !== 'yatzy') return [null, null];
        return [Yatzy.hydrate(gameData), payload.playerId];
    }

    async createGame(playerName: string){
        const result = Yatzy.create();
        await this.gamesStore.push({...result, t: 'yatzy'});
        return this.joinPlayer(result.id, playerName);
    }

    async joinPlayer(gameId: string, playerName: string){
        const gameData = await this.gamesStore.findById(gameId);
        if(!gameData || gameData.t !== 'yatzy') return null;
        const game = Yatzy.hydrate(gameData);
        
        const player = game.joinPlayer(playerName);
        this.gamesStore.save({...game, t: 'yatzy'});
        const token = Token.create({ gameId, playerId: player.id }).getToken();
        return {...player, token, gameId};
    }
    async throwDice(token: string, selectedDice: boolean[]){
        const [game, playerId] = await this.hydrateYatzyFromToken(token);
        if( !game || !playerId ) return null;
        if( game.getCurrentPlayer()?.id !== playerId ) return;
        
        const result = game.throwDice(selectedDice);
        this.gamesStore.save({...game, t: 'yatzy'});
        return result;
    }
    async chooseRow(token: string, row: number){
        const [ game, playerId ] = await this.hydrateYatzyFromToken(token);
        if( !game || !playerId ) return null;
        if( game.getCurrentPlayer()?.id !== playerId ) return;
        
        const result = game.chooseRow(row);
        if( result === undefined ) return null;
        this.gamesStore.save({...game.getAll(), t: 'yatzy'});
        return result;
    }
    
    async start(token: string){
        const [ game, playerId ] = await this.hydrateYatzyFromToken(token);
        if( !game || !playerId ) return null;
        
        const result = game.start();
        this.gamesStore.save({...game.getAll(), t: 'yatzy'});
        return result;
    }
    
    async restart(token: string){
        const [ game, playerId ] = await this.hydrateYatzyFromToken(token);
        if( !game || !playerId ) return null;
        
        const result = game.reset();
        this.gamesStore.save({...game.getAll(), t: 'yatzy'});
        return result;
    }

};