import YatzyService from '../src/services/yatzyService' 
import dummyGamesStore from '../src/infrastructure/gamesStore'
import Token from '../src/entities/Token'
import { EventEmitter } from 'events';
import GamesStore from '../src/infrastructure/gamesStore';
import dummyEventsEmitter from './infrastructure/dummyEventsEmitter';

const yatzyService = new YatzyService(new GamesStore( new dummyEventsEmitter() ));

describe('players', ()=>{
    
    
    it('join', async ()=>{
        const result = await yatzyService.createGame('Piotrek32');
        if(!result) return;
        const player = await yatzyService.joinPlayer(result.gameId, 'mixi_999');
        expect(player?.name).toBe('mixi_999');
    });
});