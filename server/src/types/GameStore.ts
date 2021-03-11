import { CharadesData } from "../domain/entities/Charades";
import { SetData } from "../domain/entities/Set";
import { yatzyData } from "../domain/entities/Yatzy";
import Connect4 from '../domain/Connect4'
import User from '../domain/User'

export type Game = 
    // (Yatzy ) | 
    (Connect4)
    //(CharadesData & {t: 'charades'}) |
    //(SetData & {t: 'set'});

export default interface GamesStore{
    findById: (id: string) => Promise<null | Game>,
    findMany: (t?: string)=>Promise<Game[]>,
    save: (data: Game)=> Promise<boolean>,
    delete: (id: string)=>any;    
}
