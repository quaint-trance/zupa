import Connect4 from '../domain/Connect4'
import Yatzy from '../domain/Yatzy'
import Charades from '../domain/Charades'

export default interface GamesStore{
    getAll: ()=>Promise<{id: string, players:{id:string}[], t:string}[]>,
    getById: (id: string)=>Promise< Connect4 | Yatzy | Charades | null >
}
