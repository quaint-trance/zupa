import { eventType } from '../../types/EventEmitter';

export interface Player{
    id: string;
    name: string;
    score: number;
    wantMore: boolean;
}

export interface Card{
    id: string;
    color: number;
    shape: number;
    quantity: number;
    fill: number;
}

export interface SetData{
    id: string;
    players: Player[];
    table: Card[];
    deck: Card[];
    eventStack: eventType[];
}