import { Game } from "./Connect4Repo";

export interface eventType{
    name: string;
    payload?: any;
}

export default interface EventEmitter{
    emit: (events: eventType, to: string) => void,
}