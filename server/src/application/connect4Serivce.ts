import GamesStore from "../types/GameStore";
import Token from '../domain/entities/Token'
import Connect4 from "../domain/Connect4";
import { UserStore } from "../types/UserStore";
import UserSkinService from "../domain/UserSkinService";
import { SkinStore } from "../types/SkinStore";
import EventEmitter from '../types/EventEmitter';

export default class Connect4Service{

    gameRepo: GamesStore;
    userRepo: UserStore;
    userSkinService: UserSkinService;
    eventEmitter: EventEmitter;

    constructor(infra: {connect4Repo: GamesStore, userRepo: UserStore, skinRepo: SkinStore, eventEmitter: EventEmitter}){
        this.gameRepo = infra.connect4Repo;
        this.userRepo = infra.userRepo;
        this.eventEmitter = infra.eventEmitter;
        this.userSkinService = new UserSkinService(infra.skinRepo);
    }
    
    async hydrateFromToken(token: string):Promise<[null | Connect4, null | string]>{
        if(!token) return [null, null];
        const payload = Token.hydrate(token)?.getPayload();
        if(!payload?.gameId || !payload?.playerId) return [null, null];

        const game = await this.gameRepo.findById(payload.gameId);
        if( !game ) return [null, null];
        return [game, payload.playerId];
    }

    async createGame(playerName: string, size?:{columns: number, rows: number}, connectToWin?: number, userToken?: string){
        const game = Connect4.create(size, connectToWin);
        await this.save(game);
        return this.joinPlayer(game.getId(), playerName, userToken);
    }

    async joinPlayer(gameId: string, playerName: string, userToken?: string){
        const game = await this.gameRepo.findById(gameId);
        if( !game || !playerName) return null;
        
        const userName = userToken && Token.hydrate(userToken).payload.name;
        const user = await this.userRepo.findByName(userName);
        const skinValue = user && await this.userSkinService.getSkinValue(user);

        const player = game.joinPlayer(playerName, userName, skinValue || undefined);
        await this.save(game);

        const token = Token.create({ gameId, playerId: player.id, userName }).getToken();
        return {...player, token, gameId};
    }

    async start(token: string){
        const [ game, playerId ] = await this.hydrateFromToken(token);
        if( !game || !playerId ) return null;
        
        if( game.hasStarted() ) return null;
        game.startGame();
        await this.save(game);
        return true;
    }

    async kickPlayer(token: string, id: string){
        const [ game, playerId ] = await this.hydrateFromToken(token);
        if( !game || !playerId ) return null;
        
        game.kickPlayer(id, playerId);
        await this.save(game);
        return null;
    }

    async chooseColumn(token: string, row: number){
        const [ game, playerId ] = await this.hydrateFromToken(token);
        if( !game || !playerId ) return null;
        if( game.getCurrentPlayer()?.id !== playerId ) return;
        
        const result = game.chooseColumn(row);
        if( result === undefined ) return null;
        await this.save(game);
        return result;
    }

    async reset(token: string){
        const [ game, playerId ] = await this.hydrateFromToken(token);
        if( !game || !playerId ) return null;
        
        game.reset();
        await this.save(game);
    }

    async getScoreboard(gameId: string){
        const game = await this.gameRepo.findById(gameId);
        if( !game ) return null;
        return game.getScoreboard();
    }

    async getGame(gameId: string){
        return await this.gameRepo.findById(gameId);
    }

    private async save(game: Connect4){
        const events = game.getEvents();
        events.map(event=>{
            this.eventEmitter.emit(event, game.getId());
        });
        return await this.gameRepo.save(game);
    }
    
};