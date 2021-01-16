import { socketWithAuth } from '.'
import { domain } from '../../index'

export const chooseColumn = (socket: socketWithAuth, data: any) => {
    domain.connect4Service.chooseColumn(socket.handshake.auth.token, data);
}