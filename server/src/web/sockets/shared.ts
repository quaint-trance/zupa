import io from 'socket.io'
import { socketWithAuth } from '.';
import { domain } from '../../index'

export const chatMessage =  async(socket: socketWithAuth, data: any)=>{
    let gameId: string | undefined;
    try{
        gameId = domain.entities.Token.hydrate(socket.handshake.auth.token).getPayload().gameId;
    }
    catch{
        gameId = data.gameId;
    }
    finally{
        if(!gameId) return;
        socket.to(gameId).emit('chat message', data);
    }
}