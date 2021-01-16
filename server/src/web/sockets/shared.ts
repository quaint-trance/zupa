import io from 'socket.io'
import { socketWithAuth } from '.';
import { domain } from '../../index'

export const chatMessage =  async(socket: socketWithAuth, data: any)=>{
    const gameId = domain.entities.Token.hydrate(socket.handshake.auth.token).getPayload().gameId;
    socket.to(gameId).emit('chat message', data);
}