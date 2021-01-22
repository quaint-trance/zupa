import { socketWithAuth } from '.'
import { domain } from '../../index'

export const guess = (socket: socketWithAuth, data: any) => {
    console.log('4', data);
    domain.charadesService.guess(socket.handshake.auth.token, data);
}

export const addPath = (socket: socketWithAuth, data: any) => {
    domain.charadesService.addPath(socket.handshake.auth.token, data);
}