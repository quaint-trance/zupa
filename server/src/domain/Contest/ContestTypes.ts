export interface ContestData{
    id: string;
    ends: Date;
    ended: boolean;
    scoreboard: Record[];
    game: string;
    description: string;
    higherBetter: boolean;

}

export type Record = {
    id: string;
    userId: string;
    score: number;
}