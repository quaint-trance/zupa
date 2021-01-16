import { socketWithAuth } from '.'
import { domain } from '../../index'

export const chooseColumn = (socket: socketWithAuth, data: any) => {
    console.log('2', data);
    domain.connect4Service.chooseColumn(socket.handshake.auth.token, data);
}