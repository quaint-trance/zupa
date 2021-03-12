import Connect4 from '../domain/Connect4'

export type Game = Connect4

export default interface GamesStore{
    findById: (id: string) => Promise<null | Game>,
    findMany: (t?: string)=>Promise<Game[]>,
    save: (data: Game)=> Promise<boolean>,
    delete: (id: string)=>any;
}
