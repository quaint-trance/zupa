import { Connect4Data } from "../entities/Connect4";
import { yatzyData } from "../entities/Yatzy";

export type Game = (yatzyData & {t: 'yatzy'}) | (Connect4Data & {t: 'connect4'});

export default interface GamesStore{
    findById: (id: string) => Promise<null | Game>,
    findMany: (t?: string)=>Promise<Game[]>,
    push: (data: Game)=> Promise<any>,
    save: (data: Game)=> Promise<boolean>,
}
