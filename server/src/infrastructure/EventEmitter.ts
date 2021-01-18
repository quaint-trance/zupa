import EventEmitterType, { eventType } from '../types/EventEmitter'
import sockets from '../web/sockets'
import { Server } from 'socket.io'

export default class EventEmitter implements EventEmitterType{

    io: Server;

    constructor(io: Server){
        this.io = io;
    }

    emit(events: eventType[], gameId: string){
        events.reverse().forEach(event=>{
            //console.log(`emitting ${event.name} data ${event.payload}`)
            this.io.to(gameId).emit(event.name, event.payload);
        });
    }
}