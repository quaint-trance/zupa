import { eventType } from '../../types/EventEmitter';

export interface Player{
    id: string;
    name: string;
    score: number;
    userName?: string;
    color: string;
    skin?: string;
}

export interface Connect4Data{
    id: string;
    players: Player[];
    fields: string[][];
    turn: number;
    eventStack: eventType[];
    size: {columns: number, rows: number};
    connectToWin: number;
}
