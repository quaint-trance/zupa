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
                    let sum = 0;
                    gameData.timeouts.forEach((timeout, index, arr)=>{
                        sum+=timeout;
                        if( index === arr.length-1 ) setTimeout(()=>domain.charadesService.endOfTime(gameId, gameData.roundId, 0), 1000*sum);
                        else setTimeout(()=>domain.charadesService.endOfTime(gameId, gameData.roundId, index+1), 1000*sum);
                    });
                }
            }
            
        });
    }
}