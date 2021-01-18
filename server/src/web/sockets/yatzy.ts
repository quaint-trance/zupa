import io from 'socket.io'
import { socketWithAuth } from '.';
import { domain } from '../../index'

export const throwDice =  (socket: socketWithAuth, data: any)=>{
    console.log('thro dice')
    domain.yatzyService.throwDice(socket.handshake.auth.token, data);
}

export const chooseRow =  async(socket: socketWithAuth, data: any)=>{
    console.log('chooseing roiw');
    const result =  await domain.yatzyService.chooseRow(socket.handshake.auth.token, data);
}