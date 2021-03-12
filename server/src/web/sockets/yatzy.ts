import io from 'socket.io'
import { socketWithAuth } from '.';
import { application } from '../../index'

export const throwDice =  (socket: socketWithAuth, data: any)=>{
    application.yatzyService.throwDice(socket.handshake.auth.token, data);
}

export const chooseRow =  async(socket: socketWithAuth, data: any)=>{
    await application.yatzyService.chooseRow(socket.handshake.auth.token, data);
}