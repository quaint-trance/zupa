import io from 'socket.io'
import { application } from '../../index'

export default async (socket: io.Socket, data: any, callback: any)=>{
    socket.join(data.gameId);
    const result = await application.gameStoreService.getById(data.gameId);
    console.log('check', result)
    callback(result?.getAll());
}