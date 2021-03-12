import { eventType } from '../../types/EventEmitter';

export interface Player{
    id: string,
    name: string,
    score: number,
    usedRows: number[],
}

export interface yatzyData{
    id: string;
    players: Player[];
    turn: number;
    throwCount: number;
    dice: number[];
    eventStack: eventType[];
}