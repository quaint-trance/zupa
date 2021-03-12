import { socketWithAuth } from '.';
import { application } from '../../index'

export const chatMessage =  async(socket: socketWithAuth, data: any)=>{
    let gameId: string | undefined;
    try{
        gameId = application.entities.Token.hydrate(socket.handshake.auth.token).getPayload().gameId;
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
        const gameId = application.entities.Token.hydrate(socket.handshake.auth.token).getPayload().gameId;
        const game = await application.gameStoreService.getById(gameId);
        if(!game) throw new Error();
        
        if( game.t === 'connect4' ){
            if(data.content === '/start') application.connect4Service.start(token);
            else if(data.content === '/reset') application.connect4Service.reset(token);
            else if(data.content === '/new'){
                await application.connect4Service.reset(token);
                await application.connect4Service.start(token)
            }
            else if(data.content === '/scoreboard') callback({name: 'scoreboard', payload: await application.connect4Service.getScoreboard(gameId)});
            else if(data.content === '/players') callback({name:'players', payload: game.getAll().players});
            else if(data.content.includes('/kick')){
                let id = data.content.replace('/kick ', '');
                application.connect4Service.kickPlayer(token, id);
            }
            else callback({name: 'unknown'});
        }
        
        if( game.t === 'yatzy' ){
            if(data.content === '/start') application.yatzyService.start(token);
            else if(data.content === '/reset') application.yatzyService.restart(token);
            else if(data.content === '/new'){
                await application.yatzyService.restart(token);
                application.yatzyService.start(token);
            }
        }

        if( game.t === 'charades'){
            if(data.content === '/start') application.charadesService.start(token);
            else if(data.content === '/reset') application.charadesService.reset(token);
            else if(data.content === '/new') application.charadesService.reset(token);
            //else if(data.content === '/delete') application.gameStoreService.deleteGame(gameId);
            else if(data.content === '/scoreboard') callback({name: 'scoreboard', payload: await application.charadesService.getScoreboard(gameId)});
            else if(data.content === '/players') callback({name:'players', payload: game.getPlayers()});
            else if(data.content.includes('/kick')){
                let id = data.content.replace('/kick ', '');
                application.charadesService.kickPlayer(token, id);
            }
            else callback({name: 'unknown'});
        }
        /*if( game.t === 'set' ){
            if(data.content === '/start') application.setService.start(token);
        }*/
    }
    catch(err){
        console.error(err);
    }
}