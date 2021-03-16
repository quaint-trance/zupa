import { eventType } from '../../types/EventEmitter';

export interface Player{
    id: string;
    name: string;
    score: 0;
}


export interface HanoiData{
    id: string;
    players: Player[];
    rods: [number[], number[], number[]];
    bestTime: number;
    startTime: Date | null;
    turn: number;
    eventStack: eventType[];
}