import GamesStore, { Game } from "../types/GameStore";
import Token from '../domain/entities/Token'
import Connect4 from "../domain/Connect4";
import { UserStore } from "../types/UserStore";
import { UserType } from "../domain/User/UserLogic";
import UserSkinService from "../domain/UserSkinService";
import { SkinStore } from "../types/SkinStore";

export default class Connect4Service{

    gamesStore: GamesStore;
    userStore: UserStore;
    userSkinService: UserSkinService;

    constructor(gamesStore: GamesStore, userStore: UserStore, skinStore: SkinStore){
        this.gamesStore = gamesStore;
        this.userStore = userStore;
        this.userSkinService = new UserSkinService(skinStore);
    }
    
    async hydrateFromToken(token: string):Promise<[null | Connect4, null | string]>{
        if(!token) return [null, null];
        const payload = Token.hydrate(token)?.getPayload();
        if(!payload?.gameId || !payload?.playerId) return [null, null];

        const game = await this.gamesStore.findById(payload.gameId);
        if( !game ) return [null, null];
        return [game, payload.playerId];
    }

    async createGame(playerName: string, size?:{columns: number, rows: number}, connectToWin?: number, userToken?: string){
        const game = Connect4.create(size, connectToWin);
        await this.gamesStore.save(game);
        return this.joinPlayer(game.getId(), playerName, userToken);
    }

    async joinPlayer(gameId: string, playerName: string, userToken?: string){
        const game = await this.gamesStore.findById(gameId);
        console.log('3', gameId, game);
        if( !game || !playerName) return null;
        
        const userName = userToken && Token.hydrate(userToken).payload.name;
        const user = await this.userStore.findByName(userName);
        const skinValue = user && await this.userSkinService.getSkinValue(user);

        const player = game.joinPlayer(playerName, userName, skinValue || undefined);
        await this.gamesStore.save(game);

        const token = Token.create({ gameId, playerId: player.id, userName }).getToken();
        return {...player, token, gameId};
    }

    async start(token: string){
        console.log('start');
        const [ game, playerId ] = await this.hydrateFromToken(token);
        if( !game || !playerId ) return null;
        
        if( game.hasStarted() ) return null;
        game.startGame();
        await this.gamesStore.save(game);

        console.log(true);
        return true;
    }

    async kickPlayer(token: string, id: string){
        const [ game, playerId ] = await this.hydrateFromToken(token);
        if( !game || !playerId ) return null;
        
        game.kickPlayer(id, playerId);
        await this.gamesStore.save(game);
        return null;
    }

    async chooseColumn(token: string, row: number){
        console.log('column');
        const [ game, playerId ] = await this.hydrateFromToken(token);
        if( !game || !playerId ) return null;
        if( game.getCurrentPlayer()?.id !== playerId ) return;
        
        const result = game.chooseColumn(row);
        if( result === undefined ) return null;
        await this.gamesStore.save(game);
        console.log(result);
        return result;
    }

    async reset(token: string){
        const [ game, playerId ] = await this.hydrateFromToken(token);
        if( !game || !playerId ) return null;
        
        game.reset();
        await this.gamesStore.save(game);
    }

    async getScoreboard(gameId: string){
        const game = await this.gamesStore.findById(gameId);
        if( !game ) return null;
        return game.getScoreboard();
    }

    async getGame(gameId: string){
        return await this.gamesStore.findById(gameId);
    }
    
};