import io from 'socket.io'
import { application } from '../../index'

export default async (socket: io.Socket, data: any, callback: any)=>{
    console.log('checkin');
    socket.join(data.gameId);
    const result = await application.connect4Service.getGame(data.gameId);
    callback(result);
}