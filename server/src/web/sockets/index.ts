import io from 'socket.io'
import checkin from './checkin'
import { throwDice, chooseRow } from './yatzy'
import { chatMessage, command } from './shared'
import { chooseColumn } from './connect4'
import { guess, addPath, getCharade, clearCanvas } from './charades'
import { chooseSet } from './set'
import { move } from './hanoi'

export type socketWithAuth = io.Socket & {
    handshake:{
        auth:{
            token: string
        }
    }
}

export default (socket: socketWithAuth)=>{
    socket.on('checkin', (data, callback)=>checkin(socket, data, callback));
    socket.on('command', (data, callback)=> command(socket, data, callback));
    socket.on('chat message', (data)=> chatMessage(socket, data));
    
    //yatzy
    socket.on('throw dice', (data)=> throwDice(socket, data));
    socket.on('choose row', (data)=> chooseRow(socket, data));
    
    //connect4
    socket.on('choose column', (data)=> chooseColumn(socket, data));
    
    //charades
    socket.on('guess', (data)=> guess(socket, data));
    socket.on('add path', (data)=> addPath(socket, data));
    socket.on('get charade', (data)=> getCharade(socket, data));
    socket.on('clear canvas', ()=> clearCanvas(socket));

    //hanoi
    socket.on('move', (data)=>move(socket, data));

    //set
    //socket.on('choose set', (data)=>chooseSet(socket, data));
}