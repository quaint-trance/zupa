import { socketWithAuth } from '.'
import { domain } from '../../index'

export const guess = (socket: socketWithAuth, data: any) => {
    console.log('4', data);
    domain.charadesService.guess(socket.handshake.auth.token, data);
}

export const addPath = (socket: socketWithAuth, data: any) => {
    domain.charadesService.addPath(socket.handshake.auth.token, data);
}

export const getCharade = async (socket: socketWithAuth, callback: any)=>{
    const result = await domain.charadesService.getCharade(socket.handshake.auth.token);
    if(!result) return;
    callback(result);
}

export const clearCanvas = async (socket: socketWithAuth)=>{
    console.log('clear canvas');
    const result = await domain.charadesService.clearCanvas(socket.handshake.auth.token);

}