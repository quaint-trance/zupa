import Charades from '../domain/Charades'

export type Game = Charades;

export default interface GamesStore{
    findById: (id: string) => Promise<null | Game>,
    findMany: (t?: string)=>Promise<Game[]>,
    save: (data: Game)=> Promise<boolean>,
    delete: (id: string)=>any;
}
