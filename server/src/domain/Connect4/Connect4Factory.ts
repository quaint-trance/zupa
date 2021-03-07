import { v4 } from'uuid'
import Connect4Logic from './Connect4Logic';
import { Connect4Data, Player } from './Connect4Types';


export default class Connect4Factory extends Connect4Logic{
    
    static create(size:Connect4Data['size'] = {columns: 7, rows: 6}, connectToWin: number = 4){
        return new Connect4Factory({
            id: v4(),
            turn: -1,
            players: [],
            fields: new Array(size.columns).fill(0).map(()=> new Array(size.rows)),
            size,
            connectToWin,
        });

    }

    static hydrate(data: Omit<Connect4Data, 'eventStack'>){
        return new Connect4Factory({
            ...data
        });
    }
}