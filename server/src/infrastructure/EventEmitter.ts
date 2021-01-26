import EventEmitterType, { eventType } from '../types/EventEmitter'
import sockets from '../web/sockets'
import { Server } from 'socket.io'
import { Game } from '../types/GameStore';
import { domain } from '..';

export default class EventEmitter implements EventEmitterType{

    io: Server;

    constructor(io: Server){
        this.io = io;
    }

    emit(events: eventType[], gameId: string, gameData: Game){
        events.forEach(event=>{
            //console.log(`emitting ${event.name} data ${JSON.stringify(event.payload)}`)
            console.log(event.name)
            this.io.to(gameId).emit(event.name, event.payload);
            
            if( gameData.t === 'charades' ){
                if( event.name === 'next turn' || event.name === 'start'){
                    setTimeout(()=>domain.charadesService.endOfTime(gameId, gameData.roundId, 1), 1000*60*1);
                    setTimeout(()=>domain.charadesService.endOfTime(gameId, gameData.roundId, 2), 1000*60*2);
                    setTimeout(()=>domain.charadesService.endOfTime(gameId, gameData.roundId, 3), 1000*60*3);
                }
            }
            
        });
    }
}