import { eventType } from '../../types/EventEmitter'

export interface Player{
    id: string;
    name: string;
    score: number;
}

export interface Chunk{
    id: string;
    style:{
        width: number;
        color: string;
    };
    lines: {
        x1: number;
        y1: number;
        x2: number;
        y2: number;
    }[];
}

export interface CharadesData{
    id: string;
    players: Player[];
    canvas: Chunk[];
    drawing: number;
    eventStack: eventType[];
    charade: string;
    roundId: string;
    timeouts: number[];
}