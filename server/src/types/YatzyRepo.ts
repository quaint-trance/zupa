import Yatzy from '../domain/Yatzy'

export type Game = Yatzy;

export default interface GamesStore{
    findById: (id: string) => Promise<null | Game>,
    findMany: (t?: string)=>Promise<Game[]>,
    save: (data: Game)=> Promise<boolean>,
    delete: (id: string)=>any;
}
