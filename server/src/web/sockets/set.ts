import { socketWithAuth } from '.'
import { domain } from '../../index'

export const chooseSet = (socket: socketWithAuth, data: any) => {
    domain.setService.chooseSet(socket.handshake.auth.token, data);
}