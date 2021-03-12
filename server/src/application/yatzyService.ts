import Yatzy from "../domain/Yatzy";
import YatzyRepo from "../types/YatzyRepo";
import Token from '../domain/entities/Token'
import EventEmitter from "../types/EventEmitter";

export default class YatzyService{

    yatzyRepo: YatzyRepo;
    eventEmitter: EventEmitter;

    constructor(infra: {yatzyRepo: YatzyRepo, eventEmitter: EventEmitter}){
        this.yatzyRepo = infra.yatzyRepo;
        this.eventEmitter = infra.eventEmitter;
    }

    async hydrateYatzyFromToken(token: string):Promise<[null | Yatzy, null | string]>{
        if(!token) return [null, null];
        const payload = Token.hydrate(token)?.getPayload();
        if(!payload?.gameId || !payload?.playerId) return [null, null];

        const game = await this.yatzyRepo.findById(payload.gameId);
        if( !game ) return [null, null];
        return [game, payload.playerId];
    }

    async createGame(playerName: string){
        const game = Yatzy.create();
        await this.save(game);
        return this.joinPlayer(game.getId(), playerName);
    }

    async joinPlayer(gameId: string, playerName: string){
        const game = await this.yatzyRepo.findById(gameId);
        if( !game ) return null;
        
        const player = game.joinPlayer(playerName);
        this.save(game);
        const token = Token.create({ gameId, playerId: player.id }).getToken();
        return {...player, token, gameId};
    }

    async throwDice(token: string, selectedDice: boolean[]){
        const [game, playerId] = await this.hydrateYatzyFromToken(token);
        if( !game || !playerId ) return null;
        if( game.getCurrentPlayer()?.id !== playerId ) return;
        
        const result = game.throwDice(selectedDice);
        this.save(game);
        return result;
    }

    async chooseRow(token: string, row: number){
        const [ game, playerId ] = await this.hydrateYatzyFromToken(token);
        if( !game || !playerId ) return null;
        if( !game.isTurn(playerId) ) return;
        
        const result = game.chooseRow(row);
        if( result === undefined ) return null;
        this.save(game);
        return result;
    }
    
    async start(token: string){
        const [ game, playerId ] = await this.hydrateYatzyFromToken(token);
        if( !game || !playerId ) return null;
        
        const result = game.start();
        await this.save(game);
        return result;
    }
    
    async restart(token: string){
        const [ game, playerId ] = await this.hydrateYatzyFromToken(token);
        if( !game || !playerId ) return null;
        
        const result = game.reset();
        this.save(game);
        return result;
    }

    private async save(game: Yatzy){
        const events = game.getEvents();
        events.map(event=>{
            this.eventEmitter.emit(event, game.getId());
        });
        return await this.yatzyRepo.save(game);
    }

};