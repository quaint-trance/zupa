import { join } from 'path';
import io from 'socket.io'
import { domain } from '../../index'

export default async (socket: io.Socket, data: any, callback: any)=>{
    console.log('checkin');
    socket.join(data.gameId);
    const result = await domain.gameStoreService.getGame(data.gameId);
    callback(result);
}