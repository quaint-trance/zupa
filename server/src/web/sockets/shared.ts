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


export const command =  async(socket: socketWithAuth, data: {content: string})=>{
    try{
        const token = socket.handshake.auth.token;
        const gameId = domain.entities.Token.hydrate(socket.handshake.auth.token).getPayload().gameId;
        const game = await domain.gameStoreService.getGame(gameId);
        if(!game) throw new Error();
        if( game.t === 'connect4'){
            if(data.content === '/start') domain.connect4Service.start(token);
            if(data.content === '/reset') domain.connect4Service.reset(token);
            if(data.content === '/new') domain.connect4Service.reset(token);
        }
        if( game.t === 'yatzy' ){
            console.log(game.t, data.content);
        }
    }
    catch(err){
        console.error(err);
    }
}