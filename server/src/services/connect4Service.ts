import GamesStore, { Game } from "../types/GameStore";
import Token from '../domain/entities/Token'
import Connect4 from "../domain/entities/Connect4";
import { UserStore } from "../types/UserStore";
import { UserType } from "../domain/User/User";

export default class Connect4Service{

    gamesStore: GamesStore;
    User: UserType;
    userStore: UserStore;

    constructor(gamesStore: GamesStore, userStore: UserStore, User: UserType){
        this.gamesStore = gamesStore;
        this.userStore = userStore;
        this.User = User;
    }

    async hydrateFromToken(token: string):Promise<[null | Connect4, null | string]>{
        if(!token) return [null, null];
        const payload = Token.hydrate(token)?.getPayload();
        if(!payload?.gameId || !payload?.playerId) return [null, null];

        const gameData = await this.gamesStore.findById(payload.gameId);
        if(!gameData || gameData.t !== 'connect4') return [null, null];
        return [Connect4.hydrate(gameData), payload.playerId];
    }

    async createGame(playerName: string, size?:{columns: number, rows: number}, connectToWin?: number, userToken?: string){
        if(!playerName) return null;
        let result;
        if( size && connectToWin) result = Connect4.create(size, connectToWin);
        else if( size ) result = Connect4.create(size);
        else if( connectToWin ) result = Connect4.create(undefined ,connectToWin);
        else result = Connect4.create();

        await this.gamesStore.push({...result, t: 'connect4'});
        return this.joinPlayer(result.id, playerName, userToken);
    }

    async joinPlayer(gameId: string, playerName: string, userToken?: string){
        const gameData = await this.gamesStore.findById(gameId);
        if(!gameData || gameData.t !== 'connect4' || !playerName) return null;
        const game = Connect4.hydrate(gameData);
        let userName;
        try{
            userName = userToken && Token.hydrate(userToken).payload.name;
        }catch{};
        const userData = await this.userStore.findByName(userName);
        const user = userData && this.User.hydrate(userData);
        await user?.loadSkins();
        
        const player = game.joinPlayer(playerName, userName, user?.gameSettings?.connect4?.skin);
        this.gamesStore.save({...game, t: 'connect4'});

        const token = Token.create({ gameId, playerId: player.id, userName }).getToken();
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