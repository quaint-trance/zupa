import Connect4 from '../domain/Connect4'
import Yatzy from '../domain/Yatzy'
import Charades from '../domain/Charades'

export default interface GamesStore{
    getAll: ()=>Promise<{id: string, players:{id:string}[], t:string}[]>,
    getById: (id: string)=>Promise< Connect4 | Yatzy | Charades | null >
}
export type gameInfo = AsyncReturnType<GamesStore['getAll']>[0]


type AsyncReturnType<T extends (...args: any) => any> =
	T extends (...args: any) => Promise<infer U> ? U :
	T extends (...args: any) => infer U ? U :
	any;