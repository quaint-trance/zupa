import { Game } from "./GameStore";

export interface eventType{
    name: string;
    payload?: any;
}

export default interface EventEmitter{
    emit: (events: eventType, to: string) => void,
}