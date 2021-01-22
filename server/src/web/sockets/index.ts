import io from 'socket.io'
import checkin from './checkin'
import { throwDice, chooseRow } from './yatzy'
import { chatMessage, command } from './shared'
import { chooseColumn } from './connect4'
import { guess, addPath } from './charades'

export type socketWithAuth = io.Socket & {
    handshake:{
        auth:{
            token: string
        }
    }
}

export default (socket: socketWithAuth)=>{
    socket.on('checkin', (data, callback)=>checkin(socket, data, callback));
    socket.on('throw dice', (data)=> throwDice(socket, data));
    socket.on('choose row', (data)=> chooseRow(socket, data));
    socket.on('chat message', (data)=> chatMessage(socket, data));
    socket.on('choose column', (data)=> chooseColumn(socket, data));
    socket.on('command', (data, callback)=> command(socket, data, callback));
    socket.on('guess', (data)=> guess(socket, data));
    socket.on('add path', (data)=> addPath(socket, data));
}