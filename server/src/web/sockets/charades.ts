import { socketWithAuth } from '.'
import { application } from '../../index'

export const guess = (socket: socketWithAuth, data: any) => {
    application.charadesService.guess(socket.handshake.auth.token, data);
}

export const addPath = (socket: socketWithAuth, data: any) => {
    application.charadesService.addPath(socket.handshake.auth.token, data);
}

export const getCharade = async (socket: socketWithAuth, callback: any)=>{
    const result = await application.charadesService.getCharade(socket.handshake.auth.token);
    if(!result) return;
    callback(result);
}

export const clearCanvas = async (socket: socketWithAuth)=>{
    application.charadesService.clearCanvas(socket.handshake.auth.token);
}