import { CharadesData } from "../entities/Charades";
import { Connect4Data } from "../entities/Connect4";
import { SetData } from "../entities/Set";
import { yatzyData } from "../entities/Yatzy";

export type Game = 
    (yatzyData & {t: 'yatzy'}) | 
    (Connect4Data & {t: 'connect4'}) | 
    (CharadesData & {t: 'charades'}) |
    (SetData & {t: 'set'});

export default interface GamesStore{
    findById: (id: string) => Promise<null | Game>,
    findMany: (t?: string)=>Promise<Game[]>,
    push: (data: Game)=> Promise<any>,
    save: (data: Game)=> Promise<boolean>,
    delete: (id: string)=>any;    
}
