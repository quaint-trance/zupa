import EventEmitter, { eventType } from "../../types/EventEmitter";
import { Server } from 'socket.io'

export default class EventEmitterSocketio implements EventEmitter{

    private io: Server;

    constructor(io: Server){
        this.io = io;
    }

    emit(event: eventType, to: string){
        this.io.to(to).emit(event.name, event.payload);
    }
}