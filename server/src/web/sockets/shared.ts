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


export const command =  async(socket: socketWithAuth, data: {content: string}, callback: any)=>{
    try{
        const token = socket.handshake.auth.token;
        const gameId = domain.entities.Token.hydrate(socket.handshake.auth.token).getPayload().gameId;
        const game = await domain.gameStoreService.getGame(gameId);
        if(!game) throw new Error();
        if( game.t === 'connect4'){
            if(data.content === '/start') domain.connect4Service.start(token);
            else if(data.content === '/reset') domain.connect4Service.reset(token);
            else if(data.content === '/new') domain.connect4Service.reset(token);
            else if(data.content === '/scoreboard') callback({name: 'scoreboard', payload: await domain.connect4Service.getScoreboard(gameId)});
            else if(data.content === '/players') callback({name:'players', payload: game.players});
            else if(data.content.includes('/kick')){
                let id = data.content.replace('/kick ', '');
                domain.connect4Service.kickPlayer(token, id);
            }
            else callback({name: 'unknown'});
        }   
        if( game.t === 'yatzy' ){
            console.log(game.t, data.content);
        }
    }
    catch(err){
        console.error(err);
    }
}