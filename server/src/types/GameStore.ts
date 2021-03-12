import Connect4 from '../domain/Connect4'
import Yatzy from '../domain/Yatzy'

export default interface GamesStore{
    getAll: ()=>Promise<{id: string, players:{id:string}[], t:string}[]>,
}
